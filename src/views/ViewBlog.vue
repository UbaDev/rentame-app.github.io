<template>
    <div class="post-view" v-if="currentBlog">
        <div class="container quillWrapper">
            <h2>{{ this.currentBlog[0].blogTitle }}</h2>
            <h4>Publicado el: {{ new Date(this.currentBlog[0].blogDate).toLocaleString(undefined, {
                dateStyle:"long"})}}</h4>
            <img :src="this.currentBlog[0].blogCoverPhoto" alt="" />
            <span>Precio: $<span class="post-content" v-html="this.currentBlog[0].blogPrice"></span></span> <br>
            <span>Descripción: <span class="post-content" v-html="this.currentBlog[0].blogHTML"></span></span> 
            <span>Teléfono: <span class="post-content" v-html="this.currentBlog[0].blogPhone"></span></span> 
            <span>Correo electrónico: <span class="post-content" v-html="this.currentBlog[0].blogEmail"></span></span> 
            <span>Dirección: <span class="post-content" v-html="this.currentBlog[0].address"></span></span> 

        </div>
    </div>
</template>

<script>
export default {
    name: "ViewBlog",
    data() {
        return {
            currentBlog: null,
        };

    },

    async mounted() {
        this.currentBlog = await this.$store.state.blogPosts.filter((post) => {
            return post.blogID === this.$route.params.blogid;
        });
    },
}
</script>

<style lang="scss">
.container{
    
    .post-content{
        display:flex;
     flex-direction:row;

    }
}
.post-view {
    h4{

        font-weight:400;
        font-size:14px;
        margin-bottom:24px;
    }
}
</style>