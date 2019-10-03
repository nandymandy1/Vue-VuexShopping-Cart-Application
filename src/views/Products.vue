<template>
  <div>
    <!-- <p class="ml-auto">{{length}} products</p> -->
    <section class="text-center my-5">
      <h2 class="h1-responsive font-weight-bold text-center my-5">Our bestsellers</h2>
      <p class="grey-text text-center w-responsive mx-auto mb-5">
        Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Fugit, error amet numquam iure provident voluptate esse quasi, veritatis totam voluptas
        nostrum quisquam eum porro a pariatur veniam.
      </p>
      <div class="row">
        <div
          class="col-lg-3 col-md-6 mb-lg-0 mb-4"
          v-for="product in products"
          track-by="id"
          :key="product.id"
        >
          <div class="card align-items-center">
            <div class="view overlay">
              <img :src="product.image" class="card-img-top" alt height="200" width="200" />
              <a>
                <div class="mask rgba-white-slight"></div>
              </a>
            </div>
            <div class="card-body text-center">
              <a href class="grey-text">
                <h5>{{ product.category }}</h5>
              </a>
              <h5>
                <strong>
                  <a href class="dark-grey-text">
                    {{product.name}}
                    <span class="badge badge-pill danger-color">NEW</span>
                  </a>
                </strong>
              </h5>
              <h4 class="font-weight-bold blue-text">
                <strong>${{ product.price }}</strong>
              </h4>
            </div>
            <td>
              <button
                v-if="!productInCart(product.id)"
                @click="addToCart(product)"
                class="btn btn-info btn-sm"
              >Add to cart</button>
              <div v-else>
                <button @click="increaseItem(product)" class="btn btn-success btn-sm">+1</button>
                <button @click="reduceItem(product)" class="btn btn-danger btn-sm">-1</button>
              </div>
            </td>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "app",
  computed: mapGetters({
    products: "allProducts",
    length: "getNumberOfProducts",
    productInCart: "productInCart"
  }),
  methods: mapActions(["addToCart", "increaseItem", "reduceItem"])
};
</script>