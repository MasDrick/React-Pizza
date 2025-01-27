import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import axios from 'axios';

import { setCategoryId, setFilters, setSortMethod } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sceleton from '../components/PizzaBlock/Sceleton';
import Sort from '../components/Sort';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const sortMethod = useSelector((state) => state.filter.sortMethod);

  const searchValue = useSelector((state) => state.filter.searchValue);

  const [items, setItems] = useState([]);

  const [isLoading, setisLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const search = searchValue ? `title=*${searchValue}` : '';

  const fetchPizzas = () => {
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
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      params.sortMethod = params.sortMethod === 'true';
      dispatch(setFilters(params));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, sortMethod, searchValue]);

  useEffect(() => {
    const queryString = qs.stringify({
      sortType,
      categoryId,
      sortMethod: sortMethod.toString(),
      searchValue,
    });

    navigate(`?${queryString}`);
  }, [categoryId, sortType, sortMethod]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort sortMethod={sortMethod} />
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
