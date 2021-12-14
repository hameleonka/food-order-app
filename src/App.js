import { useState } from "react";

import Header from "./components/Layout/Header/Header";
import Meals from './components/Meals/Meals/Meals';
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orderIsSubmitted, setOrderIsSubmitted] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  }

  const hideCartHandler = () => {
    if (orderIsSubmitted) {
      setOrderIsSubmitted(false);
    }
    setCartIsShown(false);
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} orderIsSubmitted={orderIsSubmitted} setOrderIsSubmitted={setOrderIsSubmitted} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
