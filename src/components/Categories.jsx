import React, { useState } from 'react';

const Categories = () => {
  const [active, setActive] = useState(0);

  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((obj, i) => (
          <li key={i} onClick={() => setActive(i)} className={active === i ? 'active' : ''}>
            {obj}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
