import { createNamespacedHelpers, DefineModule } from "vuex";
import * as shop from "@/api/shop";
import { RootMutations } from "../mutations";

/** State */
export interface Product {
  id: number;
  title: string;
  price: number;
  inventory: number;
}

export interface ProductsState {
  all: Product[];
}

/** Getters */
export interface ProductsGetters {
  allProducts: Product[];
}

/** Actions */
export interface ProductsActions {
  getAllProducts: undefined;
}

/** Mutations */
export interface ProductsMutations {
  setProducts: {
    products: Product[],
  };
  decrementProductInventory: {
    id: number,
  };
}

/** Products helpers: matState, mapGetters, mapActions, mapMutations  */
export const productsHelpers =
  createNamespacedHelpers<ProductsState, ProductsGetters, ProductsMutations, ProductsActions>("products");

/** Products module definition */
export const products: DefineModule<ProductsState, ProductsGetters, ProductsMutations, ProductsActions,
{}, {}, {}, { loading: boolean; }, {}, RootMutations> = {
  namespaced: true,
  // State
  state: {
    all: [],
  },
  // Getters
  getters: {
    allProducts: (state) => state.all,
  },
  // Actions
  actions: {
    getAllProducts({ commit }) {
      commit("setLoading", { show: true }, { root: true});
      shop.getProducts()
        .then((products) => {
          commit("setProducts", { products });
        })
        .finally(() => {
          commit("setLoading", { show: false }, { root: true});
        });
    },
  },
  // Mutations
  mutations: {
    setProducts(state, { products }) {
      state.all = products;
    },

    decrementProductInventory(state, { id }) {
      state.all.find((p) => p.id === id)!.inventory--;
    },
  },
};
