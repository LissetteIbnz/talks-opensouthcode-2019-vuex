<template>
  <v-container grid-list-xl>
    <h2 class="title">Products</h2>
    <v-layout row wrap>
      <v-flex xs4 v-for="product in products" :key="product.id">
        <v-card>
          <v-card-title>
            <span class="title font-weight-light">{{ product.title }}</span>
          </v-card-title>
          <v-card-text>{{ product.price | currency }}</v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="success"
              :disabled="!product.inventory"
              @click="addToCart(product)"
            >Add to cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import store from "@/store";
import { Product, productsHelpers } from '@/store/modules/products';
import { cartHelpers } from '@/store/modules/cart';

export default Vue.extend({
  name: "ProductList",
  computed: {
    products(): Product[] {
      return store.state.products.all;
    },
  },
  created() {
    // La acción espera un parámetro de entrada
    this.getAllProducts(undefined);
  },
  methods: {
    ...productsHelpers.mapActions(["getAllProducts"]),
    ...cartHelpers.mapActions(["addToCart"])
  },
});
</script>
