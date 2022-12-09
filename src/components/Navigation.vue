<template>
    
    <header >

        <nav class="container">
            <Loading v-if="loading" />
            <div  class="branding">

                <router-link class="header" :to="{ name: 'Home' }"><img src="../assets/logo.jpeg"
                        style="width:120px;" alt="">
                </router-link>

            </div>
            <div class="nav-links">
                <ul v-show="!mobile">
                    <router-link class="link" :to="{ name: 'Blogs' }">Anuncios</router-link>

                    <router-link  v-if="user" class="link" :to="{ name: 'CreatePost' }">Crear anuncio</router-link>



                    <router-link class="linkk"  style="background-color:#8b3dff; color:#fff; border-radius:5px; padding:10px 20px; text-decoration:none;" v-if="!user" :to="{ name: 'Login' }">CUENTA    
                    </router-link>

                </ul>
                <div v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
                    <span>{{ this.$store.state.profileInitials }}</span>
                    <div v-show="profileMenu" class="profile-menu">
                        <div class="info">
                            <p class="initials">{{ this.$store.state.profileInitials }}</p>
                            <div class="right">
                                <p>{{ this.$store.state.profileFirstName }} {{ this.$store.state.profileLastName }}</p>
                                <p>{{ this.$store.state.profileUsername }}</p>
                                <p>{{ this.$store.state.profileEmail }}</p>
                            </div>
                        </div>
                        <div class="options">
                            <div class="option">
                                <router-link class="option" :to="{ name: 'Profile' }">
                                    <userIcon class="icon" />
                                    <p class="lincs">Perfil</p>
                                </router-link>
                            </div>

                            <div v-if="admin" class="option">
                                <router-link class="option" :to="{ name: 'Admin' }">
                                    <adminIcon class="icon" />
                                    <p class="lincs">Admin</p>
                                </router-link>
                            </div>

                            <div @click="signOut" class="option">
                                <router-link class="option" :to="{ name: 'Home' }">
                                    <signOutIcon class="icon" />
                                    <p class="lincs">Cerrar sesión</p>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" />
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav">
                <router-link v-if="!user" class="link" :to="{ name: 'Home' }">Inicio</router-link>
                <router-link class="link" :to="{ name: 'Blogs' }">Anuncios</router-link>
                <router-link v-if="user" class="link" :to="{ name: 'CreatePost' }">Crear anuncio</router-link>
                <router-link v-if="!user" class="link" :to="{ name: 'Login' }">Cuenta</router-link>

            </ul>
        </transition>
    </header>

</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg";
//import cuentaIcon from "../assets/Icons/perfil.png";
import userIcon from "../assets/Icons/user-alt-light.svg";
import adminIcon from "../assets/Icons/user-crown-light.svg";
import signOutIcon from "../assets/Icons/sign-out-alt-regular.svg";
import firebase from "firebase/app"
import Loading from "../components/Loading";
import "firebase/auth";
export default {
    name: "navigation",
    components: {
        menuIcon, userIcon, adminIcon, signOutIcon, Loading
    },
    data() {
        return {
            profileMenu: null,
            mobile: null,
            mobileNav: null,
            windownWidth: null,
            loading: null,
        };
    },

    created() {
        window.addEventListener("resize", this.checkScreen);
        this.checkScreen();
    },

    methods: {
        checkScreen() {
            this.windownWidth = window.innerWidth;
            if (this.windownWidth <= 750) {
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },
        toggleMobileNav() {
            this.mobileNav = !this.mobileNav;
        },
        toggleProfileMenu(e) {
            if (e.target === this.$refs.profile) {
                this.profileMenu = !this.profileMenu;
            }

        },
        signOut() {
            firebase.auth().signOut();
        }
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
        admin() {
            return this.$store.state.profileAdmin;
        },
    },

}
</script>

<style lang="scss" scoped>
header {
    z-index: 99;
    background-color: #e9e8e6;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);


    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: 0.3s color ease;
        text-decoration: none !important;
        &:hover {
            color: rgba(255, 255, 255, 0.4);
        }
    }

    nav {
        display: flex;
        padding: 15px 0;



        .branding {
            display: flex;

            align-items: center !important;

            .header {

                font-weight: 800;
                font-size: 10px;
                color: #000;
                text-decoration: none
            }
        }

        .nav-links {

            display: flex;
            flex: 1;
            justify-content: flex-end !important;


            ul {

                margin-right: 32px;
                position: relative !important;
                top: 9px;


                
                .link {
                    margin-right: 39px;
                    color: #000;
                    text-decoration: none;
                    padding: 3px 10px;
                    position: relative;


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

                                .linkk {
                                    transition: .2s;
                
                                    &:hover {
                                        transition: .2s;
                                    }
                                }

                .link:last-child {
                    margin-right: 0;
                }

            }

            .profile {
                position: relative;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: #fff;
                background-color: #303030;

                span {
                    pointer-events: none;
                }

                @media(max-width: 700px) {
                    transform: translate(-60px, 0);
                }

                .profile-menu {
                    position: absolute;
                    top: 60px;
                    right: 0;
                    border-radius: 10px;
                    width: 250px;
                    background-color: #303030;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

                    .info {
                        display: flex;
                        align-items: center;
                        padding: 15px;
                        border-bottom: 1px solid #fff;

                        .initials {
                            position: initial;
                            width: 40px;
                            height: 40px;
                            background-color: #fff;
                            color: #303030;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                        }

                        .right {
                            flex: 1;
                            margin-left: 24px;



                            p:nth-child(1) {
                                font-size: 14px;
                            }

                            p:nth-child(2),
                            p:nth-child(3) {
                                font-size: 12px;
                            }

                        }
                    }

                    .options {
                        padding: 15px;


                        .option {
                            text-decoration: none;
                            color: rgba(255, 255, 255, 0.6);
                            display: flex !important;
                            align-items: center !important;

                            &:hover {
                                color: #fff !important;
                            }



                            .icon {
                                width: 18px;
                                height: auto;
                            }

                            .lincs {
                                margin-top: 10px;
                            }

                            p {
                                font-size: 14px;
                                margin-left: 12px;
                                margin-bottom: 10px !important;
                                display: table-row-group !important;

                            }


                        }
                    }
                }

            }

        }
    }

    .menu-icon {
        cursor: pointer;
        position: absolute;
        top: 32px;
        right: 25px;
        height: 25px;
        width: auto;
    }

    .mobile-nav {
        padding: 20px;
        width: 70%;
        max-width: 250px;
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 100%;
        background-color: #303030;
        top: 0;
        left: 0;

        .link {
            padding: 15px 0;
            color: rgba(247, 236, 236, 0.6) !important;


        }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active {
        transition: all 1s ease;
    }

    .mobile-nav-enter {
        transform: translateX(-250px);
    }

    .mobile-nav-enter-to {
        transform: translateX(0);
    }

    .mobile-nav-leave-to {
        transform: translateX(-250px);
    }



}
</style>