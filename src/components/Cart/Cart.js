import { useContext } from 'react';

import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal/Modal';
import CartItem from './CartItem/CartItem';

import classes from './Cart.module.css';

function Cart(props) {
  const cartCxt = useContext(CartContext);

  const totalAmount = `$${cartCxt.totalAmount.toFixed(2)}`;
  const hasItems = cartCxt.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCxt.removeItem(id);
  };
  const cartItemAddHandler = item => {
    cartCxt.addItem({ ...item, amount: 1 });
  };

  const orderSubmitHandler = () => {
    props.setOrderIsSubmitted(true);
    cartCxt.resetCart();
  }

  const cartItems = cartCxt.items.map(item =>
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />);

  return (
    <Modal onClose={props.onClose}>
      {!props.orderIsSubmitted && <div>
        <ul className={classes['cart-items']}> {cartItems} </ul>
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
          {hasItems && <button className={classes.button} onClick={orderSubmitHandler}>Order</button>}
        </div>
      </div>}
      {props.orderIsSubmitted && <div className={classes.submit}>Your order has been submitted!</div>}
    </Modal >
  )
};

export default Cart;