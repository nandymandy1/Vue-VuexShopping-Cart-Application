import Vue from "vue";
import Vuex from "vuex";
import * as types from "./store/mutation-types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    added: [],
    all: [
      {
        id: "cc919e21-ae5b-5e1f-d023-c40ee669520c",
        name: "Zebronics Headphones",
        category: "Music",
        image:
          "https://pcbonlineshop.com/var/photo/product/2000x4000/4/176/4.jpg",
        description: "Learn COBOL with this vintage programming book",
        price: 399
      },
      {
        id: "bcd755a6-9a19-94e1-0a5d-426c0303454f",
        name: "Zebronics Smart Watch",
        category: "Watch",
        image:
          "https://support.apple.com/library/content/dam/edam/applecare/images/en_US/homepod/watch-product-lockup-callout.png",
        description:
          "Watch TV like never before with the brand new curved screen technology",
        price: 1995
      },
      {
        id: "727026b7-7f2f-c5a0-ace9-cc227e686b8e",
        name: "Canon Smart Pic",
        image:
          "https://in.canon/media/image/2018/05/03/642e7bbeae5741e3b872e082626c0151_eos6d-mkii-ef-24-70m-l.png",
        description:
          "Excellent for gaming and typing, this Remmington X keyboard " +
          "features tactile, clicky switches for speed and accuracy",
        price: 3000
      },
      {
        id: "727026b7-7f2f-c5a0-ace9-cc227e686cde",
        name: "Mac Book",
        image:
          "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp13touch-space-select-201807?wid=892&hei=820&&qlt=80&.v=1529520060550",
        description:
          "Excellent for gaming and typing, this Remmington X keyboard " +
          "features tactile, clicky switches for speed and accuracy",
        price: 2995
      }
    ]
  },

  getters: {
    allProducts: state => state.all,

    getNumberOfProducts: state => (state.all ? state.all.length : 0),

    productInCart: state => id =>
      state.added.some(p => {
        if (p.quantity > 0) {
          return p.id === id;
        } else {
          return false;
        }
      }),

    cartProducts: state => {
      return state.added.map(({ id, quantity }) => {
        const product = state.all.find(p => p.id === id);
        return {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity
        };
      });
    }
  },

  actions: {
    addToCart({ commit }, product) {
      commit(types.ADD_ITEM, {
        id: product.id
      });
    },

    increaseItem({ commit }, product) {
      commit(types.INCREASE_ITEM, {
        id: product.id
      });
    },

    removeFromCart({ commit }, product) {
      commit(types.REMOVE_ITEM, {
        id: product.id
      });
    },

    reduceItem({ commit }, product) {
      commit(types.REDUCE_ITEM, {
        id: product.id
      });
    }
  },

  mutations: {
    [types.ADD_ITEM](state, { id }) {
      state.added.push({
        id,
        quantity: 1
      });
      toastr.success("Product added successfully.");
    },

    [types.INCREASE_ITEM](state, { id }) {
      const record = state.added.find(p => p.id === id);
      record.quantity++;
      toastr.success("Product quantity increased successfully.");
    },

    [types.REMOVE_ITEM](state, { id }) {
      state.added = state.added.filter(p => p.id !== id);
      toastr.success("Product removed successfully.");
    },

    [types.REDUCE_ITEM](state, { id }) {
      const record = state.added.find(p => p.id === id);
      record.quantity--;
      if (record.quantity == 0) {
        state.added = state.added.filter(p => p.id !== id);
      }
      toastr.success("Product quantity reduced successfully.");
    }
  }
});
