import { Button } from "@material-ui/core";
import { CartProductType } from "../Cart/Product";

import { Wrapper } from "./CartProduct.styles";

type Props = {
  product: CartProductType;
  addToCart: (clickedItem: CartProductType) => void;
  removeFromCart: (id: number) => void;
};

const CartProduct = ({ product, addToCart, removeFromCart }: Props) => {
  return (
    <Wrapper>
      <div>
        <h3>{product.title}</h3>
        <div className="information">
          <p>Price: ${product.price}</p>
          <p>Total: ${(product.amount * product.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(product.id)}
          >
            -
          </Button>
          <p>{product.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(product)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={product.image} alt={product.title} />
    </Wrapper>
  );
};

export default CartProduct;
