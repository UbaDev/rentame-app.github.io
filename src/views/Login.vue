<template>
    <div class="form-wrap">

        
        <Loading v-if="loading" />



        <div class="back">
            <router-link class="back-home" style="display:flex; align-items:center;" :to="{ name: 'Home' }">
                <img src="../assets/img/hogar.png" width="12" alt="" />
                &nbsp;Inicio
        
            </router-link>
        
        </div>
        <form class="login">
            <p class="login-register">
                ¿Aún no tienes una cuenta?
                <router-link class="router-link" :to="{ name: 'Register' }">Registro</router-link>
            </p>

            <h2>Únete a nuestra comunidad</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Correo electronico" v-model="email">
                    <email class="icon" />
                </div>
                <div class="input">
                    <input type="password" placeholder="Contraseña" v-model="password">
                    <password class="icon" />
                </div>
                <div v-show="error" class="error">{{ this.errorMsg }}</div>
            </div>
            <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }">¿Olvidaste tu contraseña?
            </router-link>
                <button style="background-color:#8b3dff; " class="btnlogin" @click.prevent="signIn">Iniciar sesión</button>

            <div class="angle"></div>

        </form>
        <img src="../assets/fondoPurpura.png" alt="a" class="background">


    </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
//import left from "../assets/Icons/left-arrow.png";
import password from "../assets/Icons/lock-alt-solid.svg";
import firebase from "firebase/app"
import "firebase/auth";
import Loading from "../components/Loading";

export default {
    name: "Login",

    components: { password, email, Loading },
    data() {
        return {
            email: "",
            password: "",
            error: null,
            errorMsg: "",
            loading: null,
        };
    },

    methods: {
        signIn() {
            this.loading = true;
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    this.$router.push({ name: "Blogs" });
                    this.error = false;
                    this.loading = false;
                    this.erroMsg = "";

                })
                .catch(() => {
                    this.error = true;
                    this.loading = false;
                    this.errorMsg = "El correo o la contraseña son incorrectos";
                });
        },
    },
};
</script>

<style lang="scss">
.form-wrap {
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;

    @media(min-width:900px) {
        width: 100%
    }

    .back {
        margin: 20px;

        .back-home {
                text-decoration: none;
                color: #000;
                cursor: pointer;
            }

    }
   

    .login-register {
        margin-bottom: 32px;

        .router-link {
            color: #000;
        }
    }

    form {
        padding: 0 10px;
        position: relative;
        display: flex;
        width:50%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;

        @media(min-width:900px) {
            padding: 0 50px;
        }

        .btnlogin {
            
            &:hover {
                opacity: .5;
            }
        }

        h2 {
            text-align: center;
            font-size: 32px;
            color: #303030;
            margin-bottom: 40px;

            @media(min-width:900px) {
                font-size: 40px;
            }
        }

        .inputs {
            width: 100%;
            max-width: 350px;

            .input {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;

                input {
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    padding: 4px 4px 4px 30px;
                    height: 50px;

                    &:focus {
                        outline: none;
                    }
                }

                

                .icon {
                    width: 12px;
                    position: absolute;
                    left: 6px;
                }
            }
        }

        .forgot-password {
            text-decoration: none;
            color: #000;
            cursor: pointer;
            font-size: 14px;
            margin: 16px 0 12px;
            border-bottom: 1px solid transparent;
            transition: 0.5s ease all;

            &:hover {
                border-color: #303030;
            }
        }

        .angle {
            display: none;
            position: absolute;
            background-color: #fff;
            transform: rotateZ(3deg);
            width: 60px;
            right: -30px;
            height: 101%;

            @media(min-width:900px) {
                display: initial;
            }
        }
    }

    .background {
        display: none;
        flex: 2;
        background-size: cover;
        width: 60%;
        height: 100%;

        @media (min-width: 900px) {
            display: initial;
        }
    }


}
</style>