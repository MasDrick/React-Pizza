import { useState, useEffect } from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Sort from '../components/Sort';

const Home = () => {
  const [items, setItems] = useState([]);

  const [isLoading, setisLoading] = useState(true);

  const [categoryId, setCategoryId] = useState(0); // Categories
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  }); // Sort

  const [sortMethod, setSortMethod] = useState(false);

  useEffect(() => {
    setisLoading(true);
    console.log(categoryId, sortType);
    async function axiosItems() {
      try {
        const response = await axios.get(
          `https://b75e697887327f15.mokky.dev/items?${
            categoryId > 0 ? `category=${categoryId}` : ''
          }&sortBy=${sortMethod ? '' : '-'}${sortType.sortProperty}`,
        );
        setItems(response.data);
        setisLoading(false);
      } catch (error) {
        console.error('Error fetching:', error.message);
      }
    }
    axiosItems();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortMethod]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={setCategoryId} />
        <Sort
          rotate={sortMethod}
          clickRotate={setSortMethod}
          sortTitle={sortType}
          changeSort={setSortType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, i) => <Sceleton key={i} />)
          : items.map((obj, index) => <PizzaBlock {...obj} key={index} />)}
      </div>
    </div>
  );
};

export default Home;
