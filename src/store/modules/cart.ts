import { createNamespacedHelpers, DefineModule } from "vuex";
import * as shop from "../../api/shop";
import { Product, ProductsMutations } from "./products";
import { RootState } from "../";
import { OmitOwn } from "../typings/helpers";

/** State */
export interface AddedItem {
  id: number;
  quantity: number;
}

export interface CartItem extends AddedItem {
  title: string;
  price: number;
}

export type CheckoutStatus = "successful" | "failed" | null;

export interface CartState {
  added: AddedItem[];
  checkoutStatus: CheckoutStatus;
}

/** Getters */
export interface CartGetters {
  checkoutStatus: CheckoutStatus;
  cartProducts: Array<OmitOwn<CartItem, "id">>;
  cartTotalPrice: number;
}

/** Actions */
export interface CartActions {
  checkout: Product[];
  addToCart: Product;
}

/** Mutations */
export interface CartMutations {
  addToCart: { id: number };
  checkoutRequest: undefined;
  checkoutSuccess: undefined;
  checkoutFailure: { savedCartItems: AddedItem[] };
}

/** Cart helpers: matState, mapGetters, mapActions, mapMutations  */
export const cartHelpers = createNamespacedHelpers<CartState, CartGetters, CartMutations, CartActions>("cart");

/** Cart module definition */
export const cart: DefineModule<
  CartState, CartGetters, CartMutations, CartActions,
  // ExtraGetters, ExtraMutations, ExtraActions
  {}, ProductsMutations, {},
  // RootState, RootGetters, RootMutations, RootActions
  RootState> = {
  namespaced: true,
  // State
  state: {
    added: [],
    checkoutStatus: null,
  },
  // Getters
  getters: {
    checkoutStatus: state => state.checkoutStatus,
    // Podemos acceder al estado raíz donde estarán el resto de módulos
    cartProducts(state, getters, rootState, rootGetters) {
      return state.added.map(({ id, quantity }) => {
        const product = rootState.products.all.find(p => p.id === id)!;
        return {
          title: product.title,
          price: product.price,
          quantity,
        };
      });
    },

    cartTotalPrice: (state, getters) =>
      getters.cartProducts.reduce((total, product) =>
        total + product.price! * product.quantity, 0),
  },
  // Actions
  actions: {
    checkout({ commit, state }, products) {
      const savedCartItems = [...state.added];
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
        // commit("setLoading", { show: true }, { root: true})
        // ARRRRGGG
        commit<any>("products/decrementProductInventory", { id: product.id }, { root : true } as any);
      }
    },
  },
  // Mutations
  mutations: {
    addToCart(state, { id }) {
      state.checkoutStatus = null;
      const record = state.added.find(p => p.id === id);
      if (!record) {
        state.added.push({
          id,
          quantity: 1,
        });
      } else {
        record.quantity++;
      }
    },

    checkoutRequest(state) {
      state.added = [];
      state.checkoutStatus = null;
    },

    checkoutSuccess(state) {
      state.checkoutStatus = "successful";
    },

    checkoutFailure(state, { savedCartItems }) {
      state.added = savedCartItems;
      state.checkoutStatus = "failed";
    },
  },
};
