import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Sort from '../components/Sort';
import { AppContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const { searchValue } = useContext(AppContext);

  const [items, setItems] = useState([]);

  const [isLoading, setisLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const [sortMethod, setSortMethod] = useState(false);

  const search = searchValue ? `title=*${searchValue}` : '';

  useEffect(() => {
    setisLoading(true);
    async function axiosItems() {
      try {
        const response = await axios.get(
          `https://b75e697887327f15.mokky.dev/items?${
            categoryId > 0 ? `category=${categoryId}` : ''
          }&sortBy=${sortMethod ? '' : '-'}${sortType}&${search}`,
        );
        setItems(response.data);
        setisLoading(false);
      } catch (error) {
        console.error('Error fetching:', error.message);
      }
    }
    axiosItems();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortMethod, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort rotate={sortMethod} clickRotate={setSortMethod} />
      </div>
      <h2 className="content__title">
        {searchValue === '' ? 'Все пиццы' : `Поиск по: ${searchValue}`}
      </h2>

      <div className="content__items">
        {isLoading
          ? [...new Array(9)].map((_, i) => <Sceleton key={i} />)
          : items.map((obj, index) => <PizzaBlock {...obj} key={index} />)}
      </div>
    </div>
  );
};

export default Home;
