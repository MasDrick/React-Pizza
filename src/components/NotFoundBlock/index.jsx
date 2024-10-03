import React from 'react';
import s from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
    <div className={s.root}>
      <h1 className={s.title}>
        <span>🙁</span> <br />
        Ничего не найдено
      </h1>
      <p>К сожалению данная страницы отсутствует в нашем Интернет-магазине</p>
    </div>
  );
};

export default NotFoundBlock;
