<template>
    <div class="create-post">
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
            </div>

            <div class="contenido">
                <div class="inputs">
                    <input type="text" placeholder="Escribe el titulo del anuncio" v-model="blogTitle" />

                    <input type="text" placeholder="Escribe tu numero de teléfono" v-model="blogPhone" />

                    <input type="text" disabled placeholder="Escribe la dirección de la propiedad" v-model="blogAddress" />

                    <input type="email" placeholder="Escribe tú correo electrónico" v-model="blogEmail" />

                    <input type="number" placeholder="Precio del inmueble" v-model="blogPrice" />

                </div>

                <div class="editor">
                    <vue-editor :editorOptions="editorSettings" v-model="blogHTML"
                        useCustomImageHandler @image-added="imageHandler" />
                </div>

            </div>

            <div class="blog-actions">
            <button @click="updateBlog">Guardar cambios</button>
                <router-link class="router-button" :to="{name: 'BlogPreview'}">Vista previa de cambios</router-link>
            </div>
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
window.Quill = Quill;
const ImageResize = require('quill-image-resize-module').default;
Quill.register('modules/imageResize', ImageResize);
export default {
    name: "EditPost",
    components : {
        BlogCoverPreview, Loading

    },
    data() {
        return {
            file:null,
            error: null,
            errorMsg: null,
            loading:null,
            routeID:null,
            currentBlog:null,
            editorSettings: {
                modules: {
                    imageResize:{},
                },
            },
        };
    },

    async mounted(){
        this.routeID = this.$route.params.blogid;
        this.currentBlog = await this.$store.state.blogPosts.filter((post)=> {
            return post.blogID === this.routeID;
        });
        this.$store.commit("setBlogState", this.currentBlog[0]);
    },

    computed: {
        profileId(){
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
        fileChange(){
            this.file = this.$refs.blogPhoto.files[0];
            const fileName = this.file.name;
            this.$store.commit("fileNameChange", fileName);
            this.$store.commit("createFileURL" ,URL.createObjectURL(this.file));
        },
        openPreview(){
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
                    Editor.insertEmbed(cursorLocation,"image",downloadURL);
                    resetUploader();
                }
            );
        },

       async updateBlog(){
            const dataBase = db.collection("blogPosts").doc(this.routeID);
            if(this.blogTitle.length !== 0 && this.blogHTML.length !==0) {
                if(this.file) {
                    this.loading = true;
                    const storageRef = firebase.storage().ref();
                    const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.$store.state.blogPhotoFileURL}`);
                    docRef.put(this.file).on(
                        "state_changed",
                        (snapshot) => {
                            console.log(snapshot);
                        },
                        (err)=> {
                            console.log(err);
                            this.loading = false;
                        }, async () => {
                            const downloadURL = await docRef.getDownloadURL();

                            await dataBase.update({
                                blogPhotoFileURL: this.$store.state.blogPhotoFileURL,
                                blogHTML: this.blogHTML,
                                blogCoverPhoto: downloadURL,
                                blogCoverPhotoName: this.blogCoverPhotoName,
                                blogTitle:this.blogTitle,
                                blogPhone: this.blogPhone,
                                blogPrice: this.blogPrice,
                                blogEmail: this.blogEmail,
                                blogAddress: this.blogAddress,

                            });
                            await this.$store.dispatch("updatePost", this.routeID);
                            this.loading = false;
                            this.$router.push({name: "ViewBlog", params: {blogid: dataBase.id}});

                            window.location.reload();
                        }
                        
                    );
                    return;
                }

                this.loading = true;
                await dataBase.update({
                    blogHTML: this.blogHTML,
                    blogTitle: this.blogTitle,
                });
                await this.$store.dispatch("updatePost", this.routeID);
                this.loading = false;
                this.$router.push({name: "ViewBlog", params: {blogid:dataBase.id}});
                return;
            }
           this.error = true;
           this.errorMsg = "Por favor, asegurese que todos los campos se encuentren llenos";
           setTimeout(() => {
               this.error = false;
           }, 5000);
           return;
            
        },



    },
}
</script>

<style lang="scss">

.create-post {
    position:relative;
    height:100%;

    button {
        margin-top:0px;
    }
    .router-button {
        text-decoration:none;
        color:#fff;
    }
    label,
    button,
    .router-button {
        transition:.5s ease-in-out all;
        align-self:center;
        font-size:14px;
        cursor:pointer;
        border-radius:20px;
        padding:12px 24px;
        color:#fff;
        background-color:#303030;
        text-decoration:none;

        &:hover {
          background-color:rgba(48,48,48, 0.7);
        }
    }

    .container {
        position:relative;
        height:100%;
        padding:10px 25px 60px;

    }

    .invisible {
        opacity:0 !important;

    }

    .err-message {
        width:100%;
        padding:12px;
        border-radius:8px;
        color:#fff;
        margin-bottom:10px;
        background-color:#303030;
        opacity:1;
        transition:.5s ease all;

        p {
            font-size:14px;

        }
        span {
            font-weight:600;
        }

    }

    .blog-info {
        display:flex;
        margin-bottom:32px;

        input:nth-child(1) {
            min-width:300px;
        }
        input{
            transition: .5s ease-in-out all;
            padding:10px 4px;
            border:none;
            border-bottom:1px solid #303030;
            &:focus {
                outline:none;
                box-shadow:0 1px 0 0 #303030;
            }
        }
        .upload-file {
            flex:1;
            margin-left:16px;
            position:relative;
            display:flex;

            input {
                display:none;
            }

            .preview {
                margin-left:16px;
                text-transform:initial;
            }
            span {
                font-size:12px;
                margin-left:16px;
                align-self:center;
            }
        }
    }

    .editor {
        height:60vh;
        display:flex;
        flex-direction:column;

        .quillWrapper {
            position:relative;
            display:flex;
            flex-direction:column;
            height:100%;
        }

        .ql-container {
            display:flex;
            flex-direction:column;
            height:100%;
            overflow:scroll;
        }

        .ql-editor {
            padding:20px 16px 30px;
        }
    }

    .blog-actions {
        margin-top:32px;
        button {
            margin-right:16px;
        }
    }

}
</style>