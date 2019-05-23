import * as shop from "@/api/shop";
import { RootState } from ".";
import { RootGetters } from "./getters";
import { Product } from "./models";
import { RootMutations } from "./mutations";
import { DefineActions } from "./typings";

export interface RootActions {
  getAllProducts: undefined;
  checkout: Product[];
  addToCart: Product;
}

export const actions: DefineActions<RootActions, RootState, RootGetters, RootMutations> = {
  getAllProducts({ commit }) {
    commit("setLoading", { show: true });
    shop.getProducts()
      .then((products) => {
        commit("setProducts", { products });
      })
      .finally(() => {
        commit("setLoading", { show: false });
      });
  },

  checkout({ commit, state }, products) {
    const savedCartItems = [...state.cart.added];
    commit("checkoutRequest", undefined);
    shop.buyProducts(products)
    .then(() => commit("checkoutSuccess", undefined))
    .catch(() => {
      // rollback to the cart saved before sending the request
      commit("checkoutFailure", { savedCartItems });
    });
  },

  addToCart({ commit }, product) {
    if (product.inventory > 0) {
      commit("addToCart", {
        id: product.id,
      });
      commit("decrementProductInventory", { id: product.id});
    }
  },
};
