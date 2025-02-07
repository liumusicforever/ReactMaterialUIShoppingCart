import { Button } from "@material-ui/core";
import { Wrapper } from "./Product.styles";

export type CartProductType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

type Props = {
  product: CartProductType;
  handleAddToCart: (clickedItem: CartProductType) => void;
};

const Product = ({ product, handleAddToCart }: Props) => {
  return (
    <Wrapper>
      <img src={product.image} alt={product.title} />
      <div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
      </div>
      <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
    </Wrapper>
  );
};

export default Product;
