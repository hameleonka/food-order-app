import { useState, useRef } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

function Checkout(props) {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    zip: true,
    city: true
  })

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const zipInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredZip = zipInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredZipIsValid = isFiveChars(enteredZip);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      zip: enteredZipIsValid,
      city: enteredCityIsValid
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredZipIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      zip: enteredZip,
      city: enteredCity
    })
  }

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid} `}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.address ? '' : classes.invalid} `}>
        <label htmlFor='address'>Address</label>
        <input type='text' id='address' ref={addressInputRef} />
        {!formInputsValidity.address && <p>Please enter a valid address!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.zip ? '' : classes.invalid} `}>
        <label htmlFor='zip'>Zip code</label>
        <input type='text' id='zip' ref={zipInputRef} />
        {!formInputsValidity.zip && <p>Please enter a valid zip code!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid} `}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form >
  )
};

export default Checkout;
