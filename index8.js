const R = require('ramda');

// Фильтрация массива с помощью Ramda where
// Мы хотим получить массив имен товаров, которые находятся в категории clothes и у которых количество оставшегося товара меньше 50, а также, цена меньше 100.

const products = [
  {name: 'Jacket', price: 50, category: 'clothes', count: 20},
  {name: 'Boots', price: 120, category: 'clothes', count: 30},
  {name: 'Iphone', price: 600, category: 'electronics', count: 5},
  {name: 'Ipad', price: 300, category: 'electronics', count: 10}
]


// на js
// const getProductNames = items => {
//   const filteredItems = items.filter(item => item.category == 'clothes' && item.count < 50 && item.price < 100)
//   return filteredItems.map(item => item.name)
// }

// console.log(getProductNames(products))


// на Ramda
// так
// const getProductNames = 
// R.compose(
//   R.map(R.prop('name')),
//   R.filter(item => item.category == 'clothes' && item.count < 50 && item.price < 100)
// );

// или так
// const getProductNames = 
// R.compose(
//   R.pluck('name'), // то же самое, что и R.map(R.prop('name'))
//   R.filter(item => item.category == 'clothes' && item.count < 50 && item.price < 100)
// );

// или так
const getProductNames = 
R.compose(
  R.pluck('name'),
  R.filter(R.where({
    category: R.equals('clothes'),
    count: R.lt(R.__, 50),
    price: R.lt(R.__, 100)
  }))
);

console.log(getProductNames(products))