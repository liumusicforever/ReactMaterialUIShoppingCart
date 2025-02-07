// redux/cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { CartProductType } from "../Cart/Product";

interface CartState {
  cartOpen: boolean;
  cartProducts: CartProductType[];
}

const initialState: CartState = {
  cartOpen: false,
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCart: (state) => {
      state.cartOpen = true;
    },
    closeCart: (state) => {
      state.cartOpen = false;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    addToCart: (state, action) => {
      const item = state.cartProducts.find((i) => i.id === action.payload.id);
      if (item) {
        item.amount += 1;
      } else {
        state.cartProducts.push({ ...action.payload, amount: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts
        .map((item) =>
          item.id === action.payload
            ? { ...item, amount: item.amount - 1 }
            : item
        )
        .filter((item) => item.amount > 0);
    },
  },
});

export const { openCart, closeCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;
