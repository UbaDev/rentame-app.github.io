<template>
 
  <!-- ======= Hero Section ======= -->
  <section id="hero" class="d-flex align-items-center">

    <video autoplay muted style="height:121vh; width:100%; position:absolute;"  loop id="myVideo">
      <source src="../assets/onda.mp4" type="video/mp4">
    </video>
    <div class="container d-flex flex-column align-items-center" data-aos="zoom-in" data-aos-delay="100">
      <h1 class="text-white">Rentame</h1>
      <h2 class="text-white opacity-50">Descubre las mejores propiedades en renta de la ciudad</h2>
      <a href="https://expo.dev/artifacts/72f2ad6c-c523-4ebf-86aa-db5a46238484" style="background-color:#8b3dff; text-decoration:none; padding:15px 25px; border-radius:10px; cursor:pointer" class="btn-about">Descargar APK
      </a>
    </div>
  </section><!-- End Hero -->
 

</template>
<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      

    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
img {
    filter: brightness(0.5);
  }
</style>
