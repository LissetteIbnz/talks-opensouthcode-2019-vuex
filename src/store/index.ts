import Vue from "vue";
import Vuex, { ModuleTree, DefineMutations, StoreTS } from "vuex";
import { cart, CartState } from "./modules/cart";
import { products, ProductsState } from "./modules/products";

Vue.use(Vuex);

export interface RootState {
  cart: CartState;
  products: ProductsState;
  loading: boolean;
}

export interface RootMutations {
  setLoading: {
    show: boolean;
  };
}

const rootMutations: DefineMutations<RootMutations, RootState> = {
  setLoading(state, { show }) {
    state.loading = show;
  },
};

export const store = new Vuex.Store<RootState>({
  modules: {
    cart,
    products,
  } as ModuleTree<RootState>,
  state: {
    loading: false,
  } as RootState,
  mutations: rootMutations,
});

export default store as StoreTS<RootState, {}, {}, RootMutations>;
