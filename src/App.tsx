import { Badge, Drawer, Button, Grid, LinearProgress } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { AddShoppingCart } from "@material-ui/icons";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./Redux/store";
import {
  addToCart,
  removeFromCart,
  openCart,
  closeCart,
} from "./Redux/cartSlice";

import { useState } from "react";
import { useQuery } from "react-query";
import { Wrapper, StyledButton } from "./App.styles";

import { CartProductType } from "./Cart/Product";
import Product from "./Cart/Product";
import Cart from "./Cart/Cart";
import CmoMenu from "./CmoMenu";
import "./styles.css";

const getProducts = async (): Promise<CartProductType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const HomePage = ({
  handleAddToCart,
}: {
  handleAddToCart: (item: CartProductType) => void;
}) => {
  const { data, isLoading, error } = useQuery<CartProductType[]>(
    "products",
    getProducts
  );

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>;

  return (
    <Grid container spacing={3}>
      {data?.map((item) => (
        <Grid item key={item.id} xs={12} sm={4}>
          <Product product={item} handleAddToCart={handleAddToCart} />
        </Grid>
      ))}
    </Grid>
  );
};

const AppointmentPage = () => {
  return (
    <div>
      <h1>Appointment Page</h1>
      <p>Schedule your in-store appointment here.</p>
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const cartOpen = useSelector((state: RootState) => state.cart.cartOpen);

  const cartProducts = useSelector(
    (state: RootState) => state.cart.cartProducts
  );

  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const getTotalItems = (items: CartProductType[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  const handleAddToCart = (item: CartProductType) => {
    dispatch(addToCart(item));
  };

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };
  // const handleAddToCart = (clickedItem: CartProductType) => {
  //   setCartItems((prev) => {
  //     const isItemInCart = prev.find((item) => item.id === clickedItem.id);
  //     if (isItemInCart) {
  //       return prev.map((item) =>
  //         item.id === clickedItem.id
  //           ? { ...item, amount: item.amount + 1 }
  //           : item
  //       );
  //     }
  //     return [...prev, { ...clickedItem, amount: 1 }];
  //   });
  // };

  // const handleRemoveFromCart = (id: number) => {
  //   setCartItems((prev) =>
  //     prev.reduce((acc, item) => {
  //       if (item.id === id) {
  //         if (item.amount === 1) return acc;
  //         return [...acc, { ...item, amount: item.amount - 1 }];
  //       } else {
  //         return [...acc, item];
  //       }
  //     }, [] as CartProductType[])
  //   );
  // };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Router>
      <Wrapper>
        <nav>
          <Button component={Link} to="/">
            Home
          </Button>
          <Button component={Link} to="/appointment">
            Appointment
          </Button>
          <Button onClick={handleMenuOpen}>CMO Menu</Button>
        </nav>

        <StyledButton onClick={() => dispatch(openCart())}>
          <Badge badgeContent={getTotalItems(cartProducts)} color="error">
            <AddShoppingCart />
          </Badge>
        </StyledButton>

        <Drawer
          anchor="right"
          open={cartOpen}
          onClose={() => dispatch(closeCart())}
        >
          <Cart
            cartProducts={cartProducts}
            addToCart={(item) => dispatch(addToCart(item))}
            removeFromCart={(id) => dispatch(removeFromCart(id))}
          />
        </Drawer>

        <CmoMenu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
          cartProducts={cartProducts}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <HomePage {...props} handleAddToCart={handleAddToCart} />
            )}
          />
          <Route path="/appointment" component={AppointmentPage} />
        </Switch>
      </Wrapper>
    </Router>
  );
}
