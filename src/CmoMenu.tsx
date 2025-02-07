import React from "react";
import { Menu} from "@material-ui/core";
import { Wrapper } from "./CmoMenu.styles";

interface CmoMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  onClose: () => void;
  cartProducts: any[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: number) => void;
}

const CmoMenu: React.FC<CmoMenuProps> = ({
  anchorEl,
  open,
  onClose,
  addToCart,
  removeFromCart,
}) => {
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
      <Wrapper>
        <h2>Your Cart</h2>
      </Wrapper>
    </Menu>
  );
};

export default CmoMenu;
