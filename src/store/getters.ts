import { CheckoutStatus, CartItem } from "./models";
import { RootState } from ".";
import { DefineGetters, OmitOwn } from "./typings";

export type CartItemOmitId = OmitOwn<CartItem, "id">;
// Getters type
// key: getter name
// value: return type of getter
export interface RootGetters {
  checkoutStatus: CheckoutStatus;
  cartProducts: CartItemOmitId[];
  cartTotalPrice: number;
}

// Implementación de los getters
export const getters: DefineGetters<RootGetters, RootState> = {
  checkoutStatus: state => state.cart.checkoutStatus,

  cartProducts: state => {
    return state.cart.added.map(({ id, quantity }) => {
      const product = state.products.all.find(p => p.id === id)!;
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
};