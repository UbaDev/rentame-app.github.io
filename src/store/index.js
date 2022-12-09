import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app"
import "firebase/auth";
import db from "../firebase/firebaseInit"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blogPosts: [],
    blogCasas: [],
    blogDepartamentos: [],
    blogOficinas: [],
    blogCuartos: [],
    blogMapa: [],
    blogPostsId: [],
    postLoaded: null,
    blogHTML: "",
    blogCategory: "",
    blogTitle: "",
    address: "",
    geoPoint: "",
    latitude: "",
    longitude: "",
    blogEmail: "",
    blogPhone: "",
    blogPrice: "",
    blogAddress: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    profileAdmin: null,
    profileName: null,
    profileFirstName: null,
    profileLastName: null,
    profileUsername: null,
    profileId: null,
    profileInitials: null,
  },

  getters: {
    blogPostsFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostsCards(state) {
      return state.blogPosts.slice(2, 6);
    },
  },

  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    newBlogPost2(state, payload) {
      state.blogEmail = payload;
    },
    newBlogPost3(state, payload) {
      state.blogAddress = payload;
    },
    newBlogPost4(state, payload) {
      state.blogPhone = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    updateBlogTitle5(state, payload) {
      state.blogPrice = payload;
    },
    updateBlogTitle6(state, payload) {
      state.blogCategory = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileURL(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle;
      state.blogHTML = payload.blogHTML;
      state.blogPhone = payload.blogPhone;
      state.blogAddress = payload.blogAddress;
      state.blogEmail = payload.blogEmail;
      state.blogPrice = payload.blogPrice;
      state.blogCategory = payload.blogCategory;
      state.address = payload.address;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter(
        (post) => post.blogID !== payload
      );
    },

    updateUser(state, payload) {
      state.user = payload;
    },
    setProfileAdmin(state, payload) {
      state.profileAdmin = payload;
      console.log(state.profileAdmin);
    },
    setProfileInfo(state, doc) {
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profileFirstName = doc.data().firstName;
      state.profileLastName = doc.data().lastName;
      state.profileUsername = doc.data().username;
    },
    setProfileInitial(state) {
      state.profileInitials =
        state.profileFirstName.match(/(\b\S)?/g).join("") +
        state.profileLastName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profileFirstName = payload;
    },
    changeLastName(state, payload) {
      state.profileLastName = payload;
    },
    changeUsername(state, payload) {
      state.profileUsername = payload;
    },
  },
  actions: {
    async getCurrentUser({ commit }, user) {
      const dataBase = await db
        .collection("users")
        .doc(firebase.auth().currentUser.uid);
      const dbResults = await dataBase.get();
      commit("setProfileInfo", dbResults);
      commit("setProfileInitial");
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit("setProfileAdmin", admin);
    },

    async getPost({ state }) {
      const dataBase = await db.collection("blogPosts").orderBy("date", "desc");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogPhotoFileURL: doc.data().blogPhotoFileURL,
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
            profileId: doc.data().profileId,
            blogPhone: doc.data().blogPhone,
            blogEmail: doc.data().blogEmail,
            blogPrice: doc.data().blogPrice,
            blogAddress: doc.data().blogAddress,
            blogCategory: doc.data().blogCategory,
            address: doc.data().address,
          };
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },

    async getPost2({ state }) {
      const dataBase = await db
        .collection("blogPosts")
        .where("blogCategory", "==", "casa");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        const data = {
          blogPhotoFileURL: doc.data().blogPhotoFileURL,
          blogID: doc.data().blogID,
          blogHTML: doc.data().blogHTML,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogTitle: doc.data().blogTitle,
          blogDate: doc.data().date,
          blogCoverPhotoName: doc.data().blogCoverPhotoName,
          profileId: doc.data().profileId,
          blogPhone: doc.data().blogPhone,
          blogEmail: doc.data().blogEmail,
          blogPrice: doc.data().blogPrice,
          blogAddress: doc.data().blogAddress,
          blogCategory: doc.data().blogCategory,

          address: doc.data().address,
        };
        state.blogCasas.push(data);
      });
      state.postLoaded = true;
    },

    async getPost3({ state }) {
      const dataBase = await db
        .collection("blogPosts")
        .where("blogCategory", "==", "oficina");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        const data = {
          blogPhotoFileURL: doc.data().blogPhotoFileURL,
          blogID: doc.data().blogID,
          blogHTML: doc.data().blogHTML,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogTitle: doc.data().blogTitle,
          blogDate: doc.data().date,
          blogCoverPhotoName: doc.data().blogCoverPhotoName,
          profileId: doc.data().profileId,
          blogPhone: doc.data().blogPhone,
          blogEmail: doc.data().blogEmail,
          blogPrice: doc.data().blogPrice,
          blogAddress: doc.data().blogAddress,
          blogCategory: doc.data().blogCategory,

          address: doc.data().address,
        };
        state.blogOficinas.push(data);
      });
      state.postLoaded = true;
    },

    async getPost4({ state }) {
      const dataBase = await db
        .collection("blogPosts")
        .where("blogCategory", "==", "cuarto");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        const data = {
          blogPhotoFileURL: doc.data().blogPhotoFileURL,
          blogID: doc.data().blogID,
          blogHTML: doc.data().blogHTML,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogTitle: doc.data().blogTitle,
          blogDate: doc.data().date,
          blogCoverPhotoName: doc.data().blogCoverPhotoName,
          profileId: doc.data().profileId,
          blogPhone: doc.data().blogPhone,
          blogEmail: doc.data().blogEmail,
          blogPrice: doc.data().blogPrice,
          blogAddress: doc.data().blogAddress,
          blogCategory: doc.data().blogCategory,

          address: doc.data().address,
        };
        state.blogCuartos.push(data);
      });
      state.postLoaded = true;
    },

    async getPost5({ state }) {
      const dataBase = await db
        .collection("blogPosts")
        .where("blogCategory", "==", "departamento");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        const data = {
          blogPhotoFileURL: doc.data().blogPhotoFileURL,
          blogID: doc.data().blogID,
          blogHTML: doc.data().blogHTML,
          blogCoverPhoto: doc.data().blogCoverPhoto,
          blogTitle: doc.data().blogTitle,
          blogDate: doc.data().date,
          blogCoverPhotoName: doc.data().blogCoverPhotoName,
          profileId: doc.data().profileId,
          blogPhone: doc.data().blogPhone,
          blogEmail: doc.data().blogEmail,
          blogPrice: doc.data().blogPrice,
          blogAddress: doc.data().blogAddress,
          blogCategory: doc.data().blogCategory,

          address: doc.data().address,
        };
        state.blogDepartamentos.push(data);
      });
      state.postLoaded = true;
    },

    async getPost6({ state }) {
      const dataBase = await db.collection("blogPosts");
      const dbResults = await dataBase.get();
      dbResults.forEach((doc) => {
        const data = {
          address: doc.data().address,
          latitude: doc.data().latitude,
          longitude: doc.data().longitude,
        };
        state.blogMapa.push(data);
      });
      state.postLoaded = true;
    },

    /*  async getPost({ state }) {
      
      const user = firebase.auth().currentUser.uid;
        const dataBase = await db.collection("blogPosts").orderBy("date", "desc").where("profileId", "==", user);
        const dbResults = await dataBase.get();
        dbResults.forEach((doc) => {


          const data = {
            blogID: doc.data().blogID,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogTitle: doc.data().blogTitle,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,
            profileId: doc.data().profileId,
          };
          state.blogPosts.push(data);





        });
        state.postLoaded = true;
      }, */

    async updatePost({ commit, dispatch }, payload) {
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    },

    async deletePost({ commit }, payload) {
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();
      commit("filterBlogPost", payload);
    },

    async updateUserSettings({ commit, state }) {
      const dataBase = await db.collection("users").doc(state.profileId);
      await dataBase.update({
        firstName: state.profileFirstName,
        lastName: state.profileLastName,
        username: state.profileUsername,
      });
      commit("setProfileInitial");
    },
  },
  modules: {},
});
