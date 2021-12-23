import { useEffect, useState } from 'react';

import Card from '../../UI/Card/Card';
import MealItem from '../MealItem/MealItem';

import classes from './AvailableMeals.module.css';

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch('https://food-order-app-439a7-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      console.log(responseData);
      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    })

  }, []);

  if (isLoading) {
    return (
      <p className={classes.loading}> Loading ...</p >
    )
  }

  if (httpError) {
    return (
      <p className={classes.error}>{httpError}</p >
    )
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {meals.map(meal =>
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />)}
        </ul>
      </Card>
    </section>

  )
};

export default AvailableMeals;