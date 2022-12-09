<template>
    <div class="blog-card-wrap">

        <div class="d-flex justify-content-center ">
        
        
            <button id="show-btn" class="btnModal" v-b-modal.modal-xl>
                <div class="d-flex align-items-center">
                    <img class="m-1" src="../assets/Icons/mapa.png" style="width:20px; fill:#fff" alt="">
        
                    <span class="m-1"> Abrir ubicaciones</span>
        
                </div>
        
        
            </button>
        </div>
        
        
        
        
        <b-modal id="modal-xl" size="xl" hide-footer>
            <template #modal-title>
                Ubicaciones de las propiedades
            </template>
            <div class="d-block text-center">
                <GmapMap :center="{ lat: 20.6122835, lng: -100.4802581 }" :zoom="12" map-type-id="terrain"
                    style="width:100%; height:100vh;">
        
                    <div v-if="savedLocations.length > 0">
        
                        <GmapMarker :key="index" v-for="(m, index) in savedLocations"
                            :position="{ lat: m.geoPoint.latitude, lng: m.geoPoint.longitude }" :icon="markerOptions" />
        
                    </div>
        
                </GmapMap>
            </div>
        </b-modal>

        
        <div class="header">
            <div class="categorias">

                <div class="todo">
                
                    <router-link class="icon" :to="{ name: 'Blogs' }"><img src="../assets/Icons/grid.png" alt="casa" />
                        <div>Todo</div>
                    </router-link>
                
                </div>
                <div class="casa">
                    <router-link class="icon" :to="{ name: 'BlogsCasas' }"><img src="../assets/Icons/casa.png" alt="casa" />
                        <div>Casas</div>
                    </router-link>
                
                </div>
                
                <div class="departamento">
                    <router-link class="icon" :to="{ name: 'BlogsDepas' }"><img src="../assets/Icons/departamento.png" alt="casa" />
                        <div>Departamentos</div>
                    </router-link>
                
                </div>
                
                <div class="oficina">
                    <router-link class="icon" :to="{ name: 'BlogsOficinas' }"><img src="../assets/Icons/escritorio.png" alt="casa" />
                        <div>Oficinas</div>
                    </router-link>
                
                </div>
                
                <div class="cuarto">
                    <router-link class="icon" :to="{ name: 'BlogsCuartos' }"><img src="../assets/Icons/cuarto.png" alt="casa" />
                        <div>Cuartos</div>
                    </router-link>
                
                </div>
            </div>
        </div>

        <div class="blog-cards container">
            <div v-if="admin" class="toggle-edit">
                <span>Habilitar edición</span>
                <input type="checkbox" v-model="editPost">
            </div>
            <BlogCard :post="post" v-for="(post, index) in blogCasas" :key="index" />
        </div>
    </div>
</template>

<script>
import BlogCard from "../components/BlogCard";

import "firebase/storage";
import db from "../firebase/firebaseInit"
const mapMarker = require('../assets/qw.png');
export default {
    name: "blogs",
    components: { BlogCard },
    data() {
        return {
            name: 'a',
            naame: '',
            latitude: null,
            naaame: "",
            nameState: null,
            submittedNames: [],
            file: null,
            nameStatsse: null,
            nameStaste: null,
            error: null,
            errorMsg: null,
            loading: null,
            blogCategory: "",
            editorSettings: {
                placeholder: "Escribe las caracteristicas de la propiedad aquí...",
                modules: {
                    imageResize: {},
                },
            },
            markerOptions: {
                url: mapMarker,
                size: { width: 40, height: 40, f: 'px', b: 'px', },
                scaledSize: { width: 40, height: 40, f: 'px', b: 'px', },
            },
            savedLocations: [],

            street: '',
            city: '',
            state: '',
            zip: '',
        };

    },
    async beforeMount() {
        const snap = await db.collection("locations").get();

        snap.docs.forEach(doc => {
            this.savedLocations.push(doc.data())
        })
    },

    computed: {
        blogCasas() {
            return this.$store.state.blogCasas
        },

        editPost: {
            get() {
                return this.$store.editPost
            },
            set(payload) {
                this.$store.commit("toggleEditPost", payload)
            },
        },


        user() {
            return this.$store.state.user;
        },
        admin() {
            return this.$store.state.profileAdmin;
        },


    },
    beforeDestroy() {
        this.$store.commit("toggleEditPost", false)
    },


}
</script>

<style lang="scss" scoped>
.blog-card-wrap{

    .btnModal {
            padding: 7px;
            border-radius: 25px !important;
            font-size: .8rem !important;
            position: fixed;
            margin-top: 25rem;
            z-index: 99;
    
        }


                .header {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    margin-bottom: 40px;
        
                    .categorias {
                        width: 40%;
                        display: flex;
                        font-size: .8rem;
        
                        justify-content: space-between;
        
        
                        .casa {
                            text-align: center;
                            position: relative;
                            padding: 5px;
        
                            .icon {
                                color: #ccc;
                                text-decoration: none;
        
                                &:hover {
                                    color: #000;
                                }
        
                                &::before {
                                    content: '';
                                    width: 0;
                                    height: 3px;
                                    background-color: #000;
                                    position: absolute;
                                    left: 0;
                                    bottom: 0;
                                    transition: 0.3s;
                                    -webkit-transition: 0.3s;
                                    -moz-transition: 0.3s;
                                    -ms-transition: 0.3s;
                                    -o-transition: 0.3s;
                                }
        
                                &:hover:before {
                                    width: 100%;
                                }
        
                                &:hover:after {
                                    right: 0;
                                    bottom: 0;
                                }
                            }
        
                        }
        
                        .departamento {
                            text-align: center;
                            position: relative;
                            padding: 5px;
        
                            .icon {
                                color: #ccc;
                                text-decoration: none;
        
                                &:hover {
                                    color: #000;
                                }
        
                                &::before {
                                    content: '';
                                    width: 0;
                                    height: 3px;
                                    background-color: #000;
                                    position: absolute;
                                    left: 0;
                                    bottom: 0;
                                    transition: 0.3s;
                                    -webkit-transition: 0.3s;
                                    -moz-transition: 0.3s;
                                    -ms-transition: 0.3s;
                                    -o-transition: 0.3s;
                                }
        
                                &:hover:before {
                                    width: 100%;
                                }
        
                                &:hover:after {
                                    right: 0;
                                    bottom: 0;
                                }
                            }
                        }
        
                        .oficina {
                            text-align: center;
                            position: relative;
                            padding: 5px;
        
                            .icon {
                                color: #ccc;
                                text-decoration: none;
        
                                &:hover {
                                    color: #000;
                                }
        
                                &::before {
                                    content: '';
                                    width: 0;
                                    height: 3px;
                                    background-color: #000;
                                    position: absolute;
                                    left: 0;
                                    bottom: 0;
                                    transition: 0.3s;
                                    -webkit-transition: 0.3s;
                                    -moz-transition: 0.3s;
                                    -ms-transition: 0.3s;
                                    -o-transition: 0.3s;
                                }
        
                                &:hover:before {
                                    width: 100%;
                                }
        
                                &:hover:after {
                                    right: 0;
                                    bottom: 0;
                                }
                            }
                        }
        
                        .cuarto {
                            text-align: center;
                            position: relative;
                            padding: 5px;
        
                            .icon {
                                color: #ccc;
                                text-decoration: none;
        
                                &:hover {
                                    color: #000;
                                }
        
                                &::before {
                                    content: '';
                                    width: 0;
                                    height: 3px;
                                    background-color: #000;
                                    position: absolute;
                                    left: 0;
                                    bottom: 0;
                                    transition: 0.3s;
                                    -webkit-transition: 0.3s;
                                    -moz-transition: 0.3s;
                                    -ms-transition: 0.3s;
                                    -o-transition: 0.3s;
                                }
        
                                &:hover:before {
                                    width: 100%;
                                }
        
                                &:hover:after {
                                    right: 0;
                                    bottom: 0;
                                }
                            }
                        }
        
                        .todo {
                            text-align: center;
                            position: relative;
                            padding: 5px;
        
                            .icon {
                                color: #ccc;
                                text-decoration: none;
        
                                &:hover {
                                    color: #000;
                                }
        
                                &::before {
                                    content: '';
                                    width: 0;
                                    height: 3px;
                                    background-color: #000;
                                    position: absolute;
                                    left: 0;
                                    bottom: 0;
                                    transition: 0.3s;
                                    -webkit-transition: 0.3s;
                                    -moz-transition: 0.3s;
                                    -ms-transition: 0.3s;
                                    -o-transition: 0.3s;
                                }
        
                                &:hover:before {
                                    width: 100%;
                                }
        
                                &:hover:after {
                                    right: 0;
                                    bottom: 0;
                                }
                            }
                        }
        
                        img {
                            width: 30px;
                            color: #ccc;
                        }
        
        
                    }
                }
        
                .blog-cards {
                    position: relative;
        
                    .toggle-edit {
                        display: flex;
                        align-items: center;
                        position: absolute;
                        top: -70px;
                        right: 0;
        
                        span {
                            margin-right: 16px;
                        }
        
                        input[type="checkbox"] {
                            position: relative;
                            border: none;
                            -webkit-appearance: none;
                            background: white;
                            outline: none;
                            width: 70px;
                            height: 25px;
                            border-radius: 20px;
                            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        
                        }
        
                        input[type="checkbox"]:before {
                            content: "";
                            position: absolute;
                            width: 25px;
                            height: 25px;
                            border-radius: 20px;
                            top: 0;
                            left: 0;
                            background: #303030;
                            transform: scale(1.1);
                            transition: 750ms ease all;
                            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                        }
        
                        input:checked[type="checkbox"]:before {
                            background: #fff;
                            left: 52px;
                        }
        
        
                    }
                }

 }
</style>