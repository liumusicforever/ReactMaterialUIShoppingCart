import { Button } from "@material-ui/core";
import { CartProductType } from "../Cart/Product";
import CartProduct from "./CartProduct";

import { Wrapper } from "./Cart.styles";

type Props = {
  cartProducts: CartProductType[];
  addToCart: (clickedItem: CartProductType) => void;
  removeFromCart: (id: number) => void;
};

const Cart = ({ cartProducts, addToCart, removeFromCart }: Props) => {
  const calculateTotal = (products: CartProductType[]) =>
    products.reduce((acc, product) => acc + product.amount * product.price, 0);

  return (
    <Wrapper>
      <h2>Your Cart</h2>
      {cartProducts.length === 0 ? <p>No products in cart.</p> : null}
      {cartProducts.map((product) => (
        <CartProduct
          key={product.id}
          product={product}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartProducts).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
