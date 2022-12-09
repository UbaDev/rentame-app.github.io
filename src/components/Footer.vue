<template>
    <!-- ======= Footer ======= -->
    <footer id="footer">
        <div class="container">
            <div class="copyright">
                &copy; Copyright <strong><span></span></strong>. Todos los derechos reservados
            </div>
            <div class="credits">
                <!-- All the links in the footer should remain intact. -->
                <!-- You can delete the links only if you purchased the pro version. -->
                <!-- Licensing information: https://bootstrapmade.com/license/ -->
                <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/kelly-free-bootstrap-cv-resume-html-template/ -->
                Desarrollado por <a style="color: #8b3dff"> Yadira & Ubaldo</a>
            </div>
        </div>
    </footer><!-- End  Footer -->
</template>

<script>


export default {
    name: "foote-vue",
    components: {

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

<style lang="css">
#footer {
    background: #e9e8e6;
    padding: 30px 0;
    color: #222222;
    font-size: 14px;
    text-align: center;
}

#footer .credits {
    padding-top: 5px;
    font-size: 13px;
}

#footer .credits a {
    color: #34b7a7;
}
</style>