import { createSlice } from '@reduxjs/toolkit';

// Определение списка сортировок
const list = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

const initialState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
  sortMethod: false,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setSortMethod(state, action) {
      state.sortMethod = action.payload;
    },
    setFilters(state, action) {
      const { sortType, categoryId, sortMethod, searchValue } = action.payload;
      const sortName = list.find((item) => item.sortProperty === sortType)?.name || 'популярности';

      state.sort = { name: sortName, sortProperty: sortType };
      state.categoryId = Number(categoryId);
      state.sortMethod = sortMethod !== undefined ? sortMethod : false;
      state.searchValue = searchValue || '';
    },
  },
});

export const { setCategoryId, setSort, setSearchValue, setFilters, setSortMethod } =
  filterSlice.actions;

export default filterSlice.reducer;
