const R = require('ramda');

// R.converge
// задача - написать функцию, которая будет проверять, является ли первый элемент массива наибольшим
// =================================================================================================


/* 
// на js
const isValidAr = [6, 3, 4, 5, 2]
const isInvalidAr = [3, 4, 6, 1]

const isFirstElementBiggest = elements => {
  // return elements[0] == Math.max.apply(null, elements);
  return elements[0] == elements.sort((a, b) => b - a)[0];
}

console.log(isFirstElementBiggest(isValidAr))
console.log(isFirstElementBiggest(isInvalidAr)) 
*/


// на Ramda
const isValidAr = [6, 3, 4, 5, 2]
const isInvalidAr = [3, 4, 6, 1]

// так
// const isFirstElementBiggest = R.converge(R.equals, [
//   elements => elements[0],
//   elements => elements.sort((a, b) => b - a)[0]
// ])

// или так
// const isFirstElementBiggest = R.converge(R.equals, [
//   R.head,
//   elements => R.head(elements.sort((a, b) => b - a))
// ])

// или так 
// Мы вызываем sort
// Указываем descend для сортировки по убыванию
// Передаем в descend identity, для того, чтобы указать по какому признаку мы хотим сортировать. identity - просто оборачивает переменную в функцию, которая возвращает эту переменную
// const isFirstElementBiggest = R.converge(R.equals, [
//   R.head, // то же самое, что и R.prop(0)
//   elements => R.head(R.sort(R.descend(R.identity))(elements))
// ])

// или так 
// const isFirstElementBiggest = R.converge(R.equals, [
//   R.head,
//   R.compose(R.head, R.sort(R.descend(R.identity)))
// ])

// чтобы было более понятно, что делается в R.compose
const sortByBiggestFirst = R.sort(R.descend(R.identity))
const isFirstElementBiggest = R.converge(R.equals, [
  R.head,
  R.compose(R.head, sortByBiggestFirst)
])

console.log(isFirstElementBiggest(isValidAr))
console.log(isFirstElementBiggest(isInvalidAr))



/* 
Привет. Не совсем понял, зачем нужно использовать R.identity и почему без нее не работает? Спасибо за хороший материал.
R.identity просто оборачивает переменную в функцию. Это нужно тогда, когда метод принимает функцию, а не переменную.
*/

/* 
Самое простое, это удалить все нулевые поля из обьекта false/null. Обычно в библиотеках, это метод compact. В Ramda из коробки его нет, но можно легко написать.
const compact = R.filter(R.identity)
compact({id: 1, name: null, isAdmin: false})
*/