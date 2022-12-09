<template>
    <div class="create-post">
        <div>
            <b-modal id="modal-prevent-closing" ref="modal" title="Pagar anuncio" @show="resetModal"
                @hidden="resetModal" @ok="handleOk">
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-img  src="https://d31dn7nfpuwjnm.cloudfront.net/images/valoraciones/0034/7801/diferencia-tarjeta-credito-debito.png?1565359275" fluid    
                        alt="Responsive image"></b-img>

                    <b-form-group label="Numero de tarjeta" label-for="name-input"
                        invalid-feedback="Numero de tarjeta es requerido" :state="nameState">
                        <b-form-input  placeholder="0000 - 0000 - 0000 - 0000" id="name-input" v-model="name"
                            :state="nameState"  onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" required></b-form-input>


                    </b-form-group>

                    <b-form-group label="Fecha de vencimiento" label-for="name-inpfut"
                        invalid-feedback="La fecha de vencimiento es requerida" :state="nameStaste">
                        <b-form-input placeholder="00 / 00" id="name-input" v-model="naame" :state="nameState"  onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" required>
                        </b-form-input>

                    </b-form-group>

                    <b-form-group label="Codigo de seguridad dinamico" label-for="name-iffnput"
                        invalid-feedback="El CVV es requerido" :state="nameStatsse">
                        <b-form-input placeholder="CVV" id="name-input" v-model="naaame" :state="nameState"  onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" required>
                        </b-form-input>


                    </b-form-group>

                    <b-img class="mr-3"
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" fluid
                        alt="Responsive image" width="80"></b-img>
                    <b-img class="mr-3"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/1280px-Former_Visa_%28company%29_logo.svg.png"
                        fluid alt="Responsive image" width="80"></b-img>

                    <b-img class="mr-3"
                        src="https://graffica.info/wp-content/uploads/2018/04/american-express-graphic-design-3.jpg"
                        fluid alt="Responsive image" width="80"></b-img>

                    <strong>A pagar: $200</strong>
                </form>
            </b-modal>
        </div>

        <BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
        <Loading v-show="loading" />
        <div class="container">
            <div :class="{ invisible: !error }" class="err-message">
                <p><span>Error: </span>{{ this.errorMsg }}</p>
            </div>


            <div class="blog-info">
                
                <div class="upload-file">
                    <label for="blog-photo">Subir foto de portada</label>
                    <input type="file" ref="blogPhoto" id="blog-photo" @change="fileChange"
                        accept=".png, .jpg, .jpeg" />
                    <button @click="openPreview" class="preview"
                        :class="{ 'button-inactive': !this.$store.state.blogPhotoFileURL }">
                        Vista previa
                    </button>
                    <span>Archivo elegido: {{ this.$store.state.blogPhotoName }}</span>
                </div>
                
                <div class="form-group d-flex">
                    <span class="d-flex align-self-center" style="font-size:.75em; margin-right:10px;">Seleccionar categoría: </span>
                    <select v-model="blogCategory"  class="form-control" id="exampleFormControlSelect1">
                        <option value="casa" >Casa</option>
                        <option value="departamento">Departamento</option>
                        <option value="oficina">Oficina</option>
                        <option value="cuarto">Cuarto</option>
                    </select> 
                </div>

            </div>



            <div class="contenido">
                <div class="inputs">
                    <input type="text"  placeholder="Escribe el titulo del anuncio" v-model="blogTitle" required pattern="[A-Za-z0-9]+"/>

                    <input type="text" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" maxlength="10" placeholder="Escribe tu numero de teléfono" v-model="blogPhone" required />

                    <input type="email" placeholder="Escribe tú correo electrónico" v-model="blogEmail" required />

                    <input type="text" placeholder="Precio del inmueble" v-model="blogPrice" onKeypress="if (event.keyCode < 45 || event.keyCode > 57) event.returnValue = false;" required />

                </div>

                <div class="editor">
                    <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler
                        @image-added="imageHandler" />
                </div>

            </div>




            <div class="ap">

                <div class="mapas">
                    <form class="fo" @submit.prevent="handleFormSubmit">
                        <h2 class="mb-5">Formulario de dirección</h2>

                        <input placeholder="Calle" v-model="street" />

                        <input placeholder="Ciudad" v-model="city" />


                        <input placeholder="Estado" v-model="state" />

                        <input placeholder="Codigo Postal" v-model="zip" />


                    </form>

                    <GmapMap :center="{ lat: 20.6122835, lng: -100.4802581 }" :zoom="12" map-type-id="terrain"
                        style="width:400rem; height:500px; margin-top:60px; margin-left:10px;">

                        <div v-if="savedLocations.length > 0">

                            <GmapMarker :key="index" v-for="(m, index) in savedLocations"
                                :position="{ lat: m.geoPoint.latitude, lng: m.geoPoint.longitude }"
                                :icon="markerOptions" />

                        </div>

                    </GmapMap>

                </div>

            </div>


            <div class="blog-actions">
                <button v-b-modal.modal-prevent-closing>Pagar y publicar anuncio</button>
            </div>
        </div>
        <div :class="{ invisible: !error }" class="err-message">
            <p><span>Error: </span>{{ this.errorMsg }}</p>
        </div>
    </div>
</template>

<script>
import BlogCoverPreview from "../components/BlogCoverPreview";
import firebase from "firebase/app";
import Loading from "../components/Loading";
import "firebase/storage";
import db from "../firebase/firebaseInit"
import Quill from "quill";
import axios from "axios";
const mapMarker = require('../assets/qw.png');
window.Quill = Quill;
const ImageResize = require('quill-image-resize-module').default;
Quill.register('modules/imageResize', ImageResize);
export default {
    name: "CreatePost",
    components: {
        BlogCoverPreview, Loading

    },
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
            blogCategory:"",
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

    }, async beforeMount() {
        const snap = await db.collection("locations").get();

        snap.docs.forEach(doc => {
            this.savedLocations.push(doc.data())
        })
    },
    watch: {
        blogCategory: function () {
            console.log('selected is ' + this.blogCategory + " do you logic here");
        }
    },
    computed: {
        profileId() {
            return this.$store.state.profileId;
        },
        blogCoverPhotoName() {
            return this.$store.state.blogPhotoName;
        },
        blogTitle: {
            get() {
                return this.$store.state.blogTitle;
            },
            set(payload) {
                this.$store.commit('updateBlogTitle', payload);
            },
        },
        blogHTML: {
            get() {
                return this.$store.state.blogHTML;
            },
            set(payload) {
                this.$store.commit('newBlogPost', payload);
            },
        },
        blogPhone: {
            get() {
                return this.$store.state.blogPhone;
            },
            set(payload) {
                this.$store.commit('newBlogPost4', payload);
            },
        },

        blogEmail: {
            get() {
                return this.$store.state.blogEmail;
            },
            set(payload) {
                this.$store.commit('newBlogPost2', payload);
            },
        },

        blogAddress: {
            get() {
                return this.$store.state.blogAddress;
            },
            set(payload) {
                this.$store.commit('newBlogPost3', payload);
            },
        },

        blogPrice: {
            get() {
                return this.$store.state.blogPrice;
            },
            set(payload) {
                this.$store.commit('updateBlogTitle5', payload);
            },
        },

    },
    methods: {

        checkFormValidity() {
            const valid = this.$refs.form.checkValidity()
            this.nameStaste = valid;
            this.nameStatsse = valid;
            this.nameState = valid;
            return valid
        },
        resetModal() {
            this.name = ''
            this.nameState = null
        },
        handleOk(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmit()

            
            if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
                if (this.file) {
                    this.loading = true;

                    const storageRef = firebase.storage().ref();
                    const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoFileURL}`);
                    docRef.put(this.file).on(
                        "state_changed",
                        (snapshot) => {
                            console.log(snapshot);
                        },
                        (err) => {
                            console.log(err);
                            this.loading = false;
                        }, async () => {
                            const address = `${this.street}, ${this.city},${this.state}, ${this.zip} `
                            let { data } = await axios.post("https://us-central1-rent-me-db-9a1d2.cloudfunctions.net/geocodeAddressAndSave", {
                                address: address,
                            });




                            const downloadURL = await docRef.getDownloadURL();
                            const timestamp = await Date.now();
                            const dataBase = await db.collection("blogPosts").doc();
                            const dataBasee = await db.collection("locations").doc();




                            await dataBase.set({
                                blogPhotoFileURL: this.$store.state.blogPhotoFileURL,
                                blogID: dataBase.id,
                                blogHTML: this.blogHTML,
                                blogPhone: this.blogPhone,
                                blogPrice: this.blogPrice,
                                blogEmail: this.blogEmail,
                                blogCoverPhoto: downloadURL,
                                blogCoverPhotoName: this.blogCoverPhotoName,
                                blogTitle: this.blogTitle,
                                profileId: this.profileId,
                                date: timestamp,
                                blogCategory: this.blogCategory,
                                address: data.address,
                                location:{
                                    latitude: data.geoPoint._latitude,
                                    longitude: data.geoPoint._longitude,
                                    latitudeDelta: 0.0013132167,
                                    longitudeDelta: 0.00100000000

                                }
                                
                                

                            });

                            await dataBasee.set({
                                blogID: dataBase.id,
                                address: data.address,
                                geoPoint: {
                                    latitude: data.geoPoint._latitude,
                                    longitude: data.geoPoint._longitude
                                }


                            });


                            this.savedLocations.push(dataBasee);

                            this.street = "";
                            this.city = "";
                            this.state = "";
                            this.zip = "";
                            await this.$store.dispatch("getPost");

                            this.loading = false;
                            this.$router.push({ name: "ViewBlog", params: { blogid: dataBase.id } });
                        }
                    );
                    return;
                }
                this.error = true;
                this.errorMsg = "Por favor, asegurese que seleccionó uno foto de portada";
                setTimeout(() => {
                    this.error = false;
                }, 5000);
                return;
            }


            this.error = true;
            this.errorMsg = "Por favor, asegurese que los campos fueron llenados correctamente";
            setTimeout(() => {
                this.error = false;
            }, 5000);
            return;
        },
        handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
                this.error = true;
                this.errorMsg = "Por favor, asegurese que los campos fueron llenados correctamente";
                setTimeout(() => {
                    this.error = false;
                }, 5000);
                return; 
            }
            // Push the name to submitted names
            this.submittedNames.push(this.name)
            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('modal-prevent-closing')
            })
        },

        fileChange() {
            this.file = this.$refs.blogPhoto.files[0];
            const fileName = this.file.name;
            this.$store.commit("fileNameChange", fileName);
            this.$store.commit("createFileURL", URL.createObjectURL(this.file));
        },
        openPreview() {
            this.$store.commit("openPhotoPreview");
        },
        imageHandler(file, Editor, cursorLocation, resetUploader) {
            const storageRef = firebase.storage().ref();
            const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
            docRef.put(file).on(
                "state_changed",
                (snapshot) => {
                    console.log(snapshot);
                },
                (err) => {
                    console.log(err);
                },
                async () => {
                    const downloadURL = await docRef.getDownloadURL();
                    Editor.insertEmbed(cursorLocation, "image", downloadURL);
                    resetUploader();
                }
            );
        },










    },
}
</script>

<style lang="scss">
.create-post {
    position: relative;
    height: 100%;


    button {
        margin-top: 0px;
    }

    .router-buttonn {
        text-decoration: none;
        color: #fff;
    }

    label,
    button,
    .router-buttonn {

        transition: .5s ease-in-out all;
        align-self: center;
        font-size: 14px;
        cursor: pointer;
        border-radius: 20px !important;
        padding: 12px 24px;
        color: #fff;
        background-color: #303030;
        text-decoration: none;

        &:hover {
            background-color: rgba(48, 48, 48, 0.7);
        }
    }

    .container {
        position: relative;
        height: 100%;
        padding: 10px 25px 60px;

        .ap {
            margin-bottom: 100px;

            margin-top: 50px;
            text-align: center;

            .mapas {
                display: flex;
                align-items: center;

                .fo {



                    input {
                        transition: .5s ease-in-out all;
                        padding: 20px 10px;
                        border: none;
                        border: 1px solid #828282;
                        border-radius: 10px;
                        width: 450px;
                        margin: 20px;

                        &:focus {
                            outline: none;
                            box-shadow: 0 1px 0 0 #303030;
                        }
                    }
                }
            }
        }

        .contenido {
            display: flex;
            align-items: center;

            .inputs {
                display: flex;
                flex-direction: column;
            }

            input {
                transition: .5s ease-in-out all;
                padding: 20px 10px;
                border: none;
                border: 1px solid #828282;
                border-radius: 10px;
                width: 450px;
                margin-right: 30px;
                margin: 20px;

                &:focus {
                    outline: none;
                    box-shadow: 0 1px 0 0 #303030;
                }
            }
        }

    }

    .invisible {
        opacity: 0 !important;

    }

    .err-message {
        width: 100%;
        padding: 12px;
        border-radius: 8px;
        color: #fff;
        margin-bottom: 10px;
        background-color: #303030;
        opacity: 1;
        transition: .5s ease all;

        p {
            font-size: 14px;

        }

        span {
            font-weight: 600;
        }

    }

    .blog-info {
        display: flex;
        margin-bottom: 32px;


        .upload-file {
            flex: 1;
            margin-left: 16px;
            position: relative;
            display: flex;

            input {
                display: none;
            }

            .preview {
                margin-left: 16px;
                text-transform: initial;
            }

            span {
                font-size: 12px;
                margin-left: 16px;
                align-self: center;
            }
        }
    }

    .editor {
        height: 900px;
        display: flex;

        flex-direction: column;
        width: 600px;

        .quillWrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .ql-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            overflow: scroll;
        }

        .ql-editor {
            padding: 20px 16px 30px;
        }
    }

    .blog-actions {
        display: flex;
        justify-content: space-evenly;

        button {
            margin-right: 16px;
        }
    }

}
</style>