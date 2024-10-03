import { useState, useEffect } from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Sort from '../components/Sort';

const Home = () => {
  const [items, setItems] = useState([]);

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    async function axiosItems() {
      try {
        const response = await axios.get('https://b75e697887327f15.mokky.dev/items');
        setItems(response.data);
        setisLoading(false);
      } catch (error) {
        console.error('Error fetching:', error.message);
      }
    }
    axiosItems();
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, i) => <Sceleton key={i} />)
          : items.map((obj, index) => <PizzaBlock {...obj} key={index} />)}
      </div>
    </>
  );
};

export default Home;
