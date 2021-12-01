import mealsImage from '../../../assets/meals.jpg';

import HeaderCartButton from '../HeaderCartButton/HeaderCartButton';

import classes from './Header.module.css';

function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of food" />
      </div>
    </>
  );
};

export default Header;
