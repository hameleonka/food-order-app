import { useContext, useState } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout/Checkout';

import classes from './Cart.module.css';

function Cart(props) {
  const cartCxt = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `$${cartCxt.totalAmount.toFixed(2)}`;
  const hasItems = cartCxt.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCxt.removeItem(id);
  };
  const cartItemAddHandler = item => {
    cartCxt.addItem({ ...item, amount: 1 });
  };

  const orderCheckoutHandler = () => {
    setIsCheckout(true);
  }

  const submitOrderhandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch('https://food-order-app-439a7-default-rtdb.firebaseio.com/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCxt.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCxt.resetCart();
  };

  const cartItems = cartCxt.items.map(item =>
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />);

  const modalActions = (<div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItems && <button className={classes.button} onClick={orderCheckoutHandler}>Order</button>}
  </div>
  )

  const cartModalContent = (
    <>
      <ul className={classes['cart-items']}> {cartItems} </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderhandler} onCancel={props.onClose} />}
      {!isCheckout && modalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>
  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>Close</button>
      </div>
    </>
  )

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal >
  )
};

export default Cart;