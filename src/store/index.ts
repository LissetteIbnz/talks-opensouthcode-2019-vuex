import Vue from "vue";
import Vuex, { StoreTS } from "vuex";
import { CartState, ProductsState } from "./models";
import { getters, RootGetters } from "./getters";
import { mutations, RootMutations } from "./mutations";
import { actions, RootActions } from "./actions";

Vue.use(Vuex);

export interface RootState {
  cart: CartState;
  products: ProductsState;
  loading: boolean;
}

export const store = new Vuex.Store<RootState>({
  strict: true,
  state: {
    cart: {
      added: [],
      checkoutStatus: null,
    },
    products: {
      all: [],
    },
    loading: false,
  },
  getters,
  mutations,
  actions,
});


//createNamespacedHelpers<RootState, RootGetters, RootMutations, RootActions>();

export default store as StoreTS<RootState, RootGetters, RootActions, RootMutations>;
