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
import Vue from "vue";
import { mapActions } from "vuex";

import store from "@/store";
import { Product } from '@/store/models';

export default Vue.extend({
  name: "ProductList",
  computed: {
    products(): Product[] {
      return store.state.products.all;
    },
  },
  created() {
    store.dispatch("getAllProducts", undefined);
  },
  methods: {
    ...mapActions(["addToCart"]),
  },
});
</script>
