const R = require('ramda');

// Изменение полей объекта с Ramda lenses
// ======================================


/*
const user = {
  name: 'John',
  surname: 'Flint'
}

// создаём линзу на объект
// R.lens принимает getter и setter, то есть мы создали линзу и передали геттер и сеттер на поле name 
const nameLens = R.lens(R.prop('name'), R.assoc('name'))

// Для работы с линзами есть специальные методы
// Для того, чтобы вызвать геттер, мы можем использовать R.view
// вызываем геттер нашей линзы на объекте user, геттер нашей линзы вызывает поле name, что равно 'John'
// const result = R.view(nameLens, user)
// console.log(result) // John

// Точно также мы можем вызывать сеттер, чтобы обновить имя
// const result = R.set(nameLens, 'Alex', user)
// console.log(result) // { name: 'Alex', surname: 'Flint' }
// console.log(user) // { name: 'John', surname: 'Flint' } -> данные не мутируются



// То есть мы читаем линзу, вызываем toUpper на результат и обновляем линзу.
// const name = R.view(nameLens, user)
// const upperName = R.toUpper(name)
// const result = R.set(nameLens, upperName, user)
// console.log(result) // { name: 'JOHN', surname: 'Flint' }


// Вместо этих трех строчек мы можем вызвать метод R.over, который принимает линзу, функцию изменения и объект
const result = R.over(nameLens, R.toUpper, user)
console.log(result) // { name: 'JOHN', surname: 'Flint' }

*/


// И, напоследок, давайте напишем наше объявление линзы более сокращенно. Так как R.prop и R.assoc - это самая часто используемая линза, то для нее есть синтаксический сахар

const user = {
  name: 'John',
  surname: 'Flint'
}

const nameLens = R.lensProp('name')
const result = R.over(nameLens, R.toUpper, user)
console.log(result) // { name: 'JOHN', surname: 'Flint' }