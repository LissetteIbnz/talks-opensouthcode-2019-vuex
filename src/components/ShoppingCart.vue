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
import Vue, { PropType } from "vue";

import store from "@/store";
import { cartHelpers } from '../store/modules/cart';

export default Vue.extend({
  name: "ShoppingCart",
  computed: {
    /**
     * Eliminamos la computed property ya que las recibirá directamente del store
     * Podemos pasar el getter de varias formas:
     * 1) a través de this.$store.getters
     *       total(): Number {
     *         return this.$storeTS.getters.cartTotalPrice;
     *       },
     *
     * 2) con el helper mapGetter
     *      ...mapGetters({ total: "cartTotalPrice" }), // Donde total es el enlace con nombre diferente
     */
    // ...cartHelpers.mapGetters(["cartProducts","checkoutStatus"]),
    ...cartHelpers.mapGetters(["checkoutStatus"]),
    ...cartHelpers.mapGetters({ products: "cartProducts", total: "cartTotalPrice" }), // Creando un alias para el nombre
    // total(): Number {
    //   return store.getters.cartTotalPrice;
    // },
    // products(): ItemCart[] {
    //   return store.getters.cartProducts;
    // },
    // checkoutStatus(): CheckoutStatus {
    //   return store.state.checkoutStatus;
    // },
    // ...mapGetters({ total: "cartTotalPrice" }),
  },
  methods: {
    ...cartHelpers.mapActions(["checkout"]),
    // checkout(products: ItemCart[]) {
    //   // this.$emit("checkout", products);
    //   store.dispatch("checkout", products);
    // },
  },
});
</script>
