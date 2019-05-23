<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-black pr-1">Vuex</span>
        <span class="font-weight-light">SHOPPING CART</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <product-list />
      <shopping-cart />
      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card dark>
          <v-card-text>
            Loading...
            <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { ProductList, ShoppingCart } from "@/components";
import store from "@/store";

export default Vue.extend({
  name: "App",
  components: { ProductList, ShoppingCart },
  computed: {
    loading(): boolean {
      return store.state.loading;
    },
  },
  created() {
    store.dispatch("getAllProducts", undefined);
  },
});
</script>
