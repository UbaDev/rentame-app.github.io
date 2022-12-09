<template>
    <div class="post-view">
        <div class="container quillWrapper">
            <h2>{{this.blogTitle}}</h2>
            <img :src="blogCoverPhoto" alt="" />
            <div class="post-content" v-html="blogHTML"></div>
            <div class="post-content" v-html="blogPrice"></div>
            <div class="post-content" v-html="blogPhone"></div>
            <div class="post-content" v-html="blogEmail"></div>
            <div class="post-content" v-html="blogAddress"></div>
        </div>
    </div>
</template>

<script>
export default {
    name:"PostBlog",
    computed :{
        blogTitle() {
            return this.$store.state.blogTitle;
        },
        blogHTML() {
            return this.$store.state.blogHTML;
        },
        blogCoverPhoto() {
            return this.$store.state.blogPhotoFileURL;
        },
        blogEmail() {
            return this.$store.state.blogEmail;
        },
        blogPhone() {
            return this.$store.state.blogPhone;
        },
        blogAddress() {
            return this.$store.state.blogAddress;
        }, 
        blogPrice() {
            return this.$store.state.blogPrice;
        },
    },
    
};
</script>

<style lang="scss" >


.post-view {
    min-height:100%;

    .container {
        max-width:1000px;
        padding:60px 25px;

        .post-content {
            margin:10px;
        }

    }
    .ql-editor {
        padding:0;

    }

    h2 {
        margin-bottom:16px;
        font-weight:300;
        font-size:32px;
    }
    img {
        width:100%;
        margin-bottom:32px;
    }
}

</style>
