<template>
  <v-container grid-list-12>
    <h2 class="title">Your cart</h2>
    <v-layout row wrap>
      <v-flex>
        <p v-show="!products.length">
          <i>Please add some products to cart.</i>
        </p>
        <ul>
          <li v-for="product in products" :key="product.id">
            {{ product.title }} - {{ product.price | currency }} x
            {{ product.quantity }}
          </li>
        </ul>
        <p>Total: {{ total | currency }}</p>
        <v-btn
          color="primary"
          :disabled="!products.length"
          @click="checkout(products)"
        >Checkout</v-btn>
        <p v-show="checkoutStatus">Checkout {{ checkoutStatus }}.</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

import store from "@/store";
import { Product, CheckoutStatus } from '@/store/models';
import { CartItemOmitId } from '@/store/getters';

export default Vue.extend({
  name: "ShoppingCart",
  computed: {
  //   /** Enlazando a través del store */
    total(): Number {
      return store.getters.cartTotalPrice;
    },
    products(): CartItemOmitId[] {
      return store.getters.cartProducts;
    },
    // checkoutStatus(): CheckoutStatus {
    //   return store.getters.checkoutStatus;
    // },

    // ...rootHelpers.mapGetters(["products","checkoutStatus"]),
  //   /** Usando la exportación directate de los helpers */
    ...mapGetters(["checkoutStatus"]),
  //   /** Usando la exportación nombrada de loshelpers */
    // ...rootHelpers.mapGetters({
    //   products: "products",
    // }),
  },
  methods: {
    checkout(products: Product[]) {
      store.dispatch("checkout", products);
    },
  },
});
</script>
