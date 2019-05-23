import { RootState } from ".";
import { Product, AddedItem } from "./models";
import { DefineMutations } from "./typings";

// Mutations type
// key: mutation name
// value: payload type of mutation
export interface RootMutations {
  setLoading: { show: boolean };
  setProducts: { products: Product[] };
  decrementProductInventory: { id: number };
  addToCart: { id: number };
  checkoutRequest: undefined;
  checkoutSuccess: undefined;
  checkoutFailure: { savedCartItems: AddedItem[] };
}

// Implementación de los mutations
export const mutations: DefineMutations<RootMutations, RootState> = {
  setLoading(state, { show }) {
    state.loading = show;
  },

  setProducts(state, { products }) {
    state.products.all = products;
  },

  decrementProductInventory(state, { id }) {
    state.products.all.find((p) => p.id === id)!.inventory--;
  },

  addToCart(state, { id }) {
    state.cart.checkoutStatus = null;
    const record = state.cart.added.find(p => p.id === id);
    if (!record) {
      state.cart.added.push({
        id,
        quantity: 1,
      });
    } else {
      record.quantity++;
    }
  },

  checkoutRequest(state) {
    state.cart.added = [];
    state.cart.checkoutStatus = null;
  },

  checkoutSuccess(state) {
    state.cart.checkoutStatus = "successful";
  },

  checkoutFailure(state, { savedCartItems }) {
    state.cart.added = savedCartItems;
    state.cart.checkoutStatus = "failed";
  },
};
