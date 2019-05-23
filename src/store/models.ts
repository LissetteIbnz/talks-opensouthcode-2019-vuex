/** Cart Model */
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

/** Products Model */
export interface Product {
  id: number;
  title: string;
  price: number;
  inventory: number;
}

export interface ProductsState {
  all: Product[];
}
