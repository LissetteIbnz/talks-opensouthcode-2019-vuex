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

import store, { rootHelpers } from "@/store";
import { cartHelpers } from '../store/modules/cart';
import { OmitOwn, mapGetters } from '@/store/typings';
import { CartItem, CheckoutStatus, Product } from '@/store/models';
import { CartItemOmitId } from '../store/getters';

export default Vue.extend({
  name: "ShoppingCart",
  computed: {
    /** Enlazando a través del store */
    total(): Number {
      return store.getters.cartTotalPrice;
    },
    /** Usando la exportación directate de los helpers */
    ...rootHelpers.mapGetters(["checkoutStatus"]),
    /** Usando la exportación nombrada de loshelpers */
    ...rootHelpers.mapGetters({
      products: "cartProducts",
    }),
  },
  methods: {
    ...cartHelpers.mapActions(["checkout"]),
    checkout(products: Product[]) {
      this.checkout(products);
      // store.dispatch("checkout", products);
    },
  },
});
</script>
