<template>
  <div class="cart">
    <h1 class="title">Your Cart</h1>
    <p v-show="!products.length">
      <i>Your cart is empty!</i>
      <router-link to="/products">Go shopping</router-link>
    </p>
    <div class="card card-cascade narrower" v-show="products.length">
      <div
        class="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center"
      >
        <a href class="white-text mx-3">Cart Items</a>
      </div>
      <div class="px-4">
        <div class="table-wrapper">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th class="th-lg">
                  <a>Image</a>
                </th>
                <th class="th-lg">
                  <a>Name</a>
                </th>
                <th class="th-lg">
                  <a href>Price</a>
                </th>
                <th class="th-lg">
                  <a href>Quantity</a>
                </th>
                <th class="th-lg">
                  <a href>Actions</a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>
                  <img
                    :src="product.image"
                    class="img-thumbnail"
                    alt="Product Image"
                    height="100"
                    width="100"
                  />
                </td>
                <td>{{ product.name }}</td>
                <td>$ {{ product.price }}</td>
                <td>{{ product.quantity }}</td>
                <td>
                  <button @click="increaseItem(product)" class="btn btn-sm btn-success">+1</button>
                  <button @click="reduceItem(product)" class="btn btn-sm btn-warning">-1</button>
                  <button @click="removeFromCart(product)" class="btn btn-sm btn-danger">Remove</button>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Total:</b>
                </td>
                <td></td>
                <td>
                  <b>$ {{ total }}</b>
                </td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <p>
      <button v-show="products.length" class="btn btn-info btn-md" @click="checkout">Pay Now</button>
    </p>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters({
      products: "cartProducts"
    }),
    total() {
      return this.products.reduce((total, p) => {
        return total + p.price * p.quantity;
      }, 0);
    }
  },
  methods: {
    ...mapActions({
      increaseItem: "increaseItem",
      reduceItem: "reduceItem",
      removeFromCart: "removeFromCart"
    }),

    checkout() {
      alert("Pay us $" + this.total);
      // Integrate with the Payment Portals
    }
  }
};
</script>