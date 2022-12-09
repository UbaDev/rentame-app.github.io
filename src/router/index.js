import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Blogs from "../views/Blogs.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Admin from "../views/Admin.vue";
import Profile from "../views/Profile.vue";
import CreatePost from "../views/CreatePost.vue";
import BlogPreview from "../views/BlogPreview.vue";
import ViewBlog from "../views/ViewBlog.vue";
import EditBlog from "../views/EditBlog.vue";
import MyBlogs from "../views/MyBlogs.vue";
import PayPal from "../views/PayPal.vue";
import BlogsCasas from "../views/BlogsCasas";
import BlogsDepas from "../views/BlogsDepas";
import BlogsOficinas from "../views/BlogsOficinas.vue";
import BlogsCuartos from "../views/BlogsCuartos.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,

    meta: {
      title: "Inicio",
    },
  },
  {
    path: "/blogs",
    name: "Blogs",
    component: Blogs,
    meta: {
      title: "Anuncios",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Incio de sesión",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Registro de usuario",
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "¿Olvidaste tu contraseña?",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Perfil",
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Administrador",
    },
  },
  {
    path: "/create-post",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "Crear anuncio",
    },
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    component: BlogPreview,
    meta: {
      title: "Vista previa",
    },
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    component: ViewBlog,
    meta: {
      title: "Vista anuncio",
    },
  },
  {
    path: "/edit-blog/:blogid",
    name: "EditBlog",
    component: EditBlog,
    meta: {
      title: "Editar anuncio",
    },
  },
  {
    path: "/my-blog",
    name: "MyBlogs",
    component: MyBlogs,
    meta: {
      title: "Mis anuncios",
    },
  },
  {
    path: "/paypal",
    name: "PayPal",
    component: PayPal,
    meta: {
      title: "PayPal",
    },
  },
  {
    path: "/blogs",
    name: "BlogsCasas",
    component: BlogsCasas,
    meta: {
      title: "BlogsCasas",
    },
  },
  {
    path: "/blogs",
    name: "BlogsDepas",
    component: BlogsDepas,
    meta: {
      title: "BlogsDepas",
    },
  },
  {
    path: "/blogs",
    name: "BlogsOficinas",
    component: BlogsOficinas,
    meta: {
      title: "BlogsOficinas",
    },
  },
  {
    path: "/blogs",
    name: "BlogsCuartos",
    component: BlogsCuartos,
    meta: {
      title: "BlogsCuartos",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Rentame`;
  next();
});

export default router;
