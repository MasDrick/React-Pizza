import React from 'react';

const PersonGreeting = () => {
  const person = {
    name: 'Максим',
    birthDate: new Date('2006-10-15'),
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const age = calculateAge(person.birthDate);

  return (
    <div>
      <h1>{age === 18 ? `Поздравляем с 18-летием, ${person.name}!` : ''}</h1>
      {age === 18 ? (
        <p>Вы стали совершеннолетним! Желаем здоровья, счастья и успехов во всех начинаниях!</p>
      ) : (
        <p>Тебе еще расти и расти</p>
      )}
    </div>
  );
};

export default PersonGreeting;
