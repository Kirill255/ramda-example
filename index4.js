const R = require('ramda');

// базовые функции из Ramda
// все функции в Ramda иммутабельные, значит не мутируют переданные аргументы
// а также все методы в Ramda каррированы
// ==========================================================================

/* 
const arr = [1, 2, 3]

// добавим новый элемент в массив
const newArr = R.append(4, arr)

console.log(arr) // [1, 2, 3] - arr остался без изменений
console.log(newArr) // [1, 2, 3, 4]
*/


/* 
const users = [
  {
    id: 1,
    name: 'John'
  },
  {
    id: 2,
    name: 'Alex'
  },
  {
    id: 3,
    name: 'Bill'
  }
]

// на js
// const alex = users.find(user => user.id === 2)
// console.log(alex)


// в Ramda есть функция propEq
// Смотрит поле id, ожидаем, что оно будет равно 2, в объекте { id: 2 }
// const test = R.propEq('id', 2, { id: 2 })
// console.log(test) // true

// на Ramda будет так
// const alex = users.find(user => R.propEq('id', 2, user)) 
// console.log(alex)

// или так, так как все функции каррированные
// const alex = users.find(R.propEq('id', 2)) 
// console.log(alex)

// или так
// const alex = R.find(R.propEq('id', 2), users) 
// console.log(alex)

// или так
// const isAlex = R.propEq('id', 2) // эту функцию теперь можем использовать где-то ещё, елси нужно
// const alex = R.find(isAlex, users) // не только здесь
// console.log(alex) 
*/


/* 
// на js
// const wasBornInCountry = person => person.birthCountry === 'UK'
// const wasNaturalized = person => Boolean(person.naturalizationDate)
// const isOver18 = person => person.age >= 18

// const isCitizen = person => wasBornInCountry(person) || wasNaturalized(person) // R.either
// const isEligibleToVote = person => isOver18(person) && isCitizen(person) // R.both

// const testUser = {
//   age: 20,
//   birthCountry: 'UK'
// }
// const testUser2 = {
//   age: 15,
//   birthCountry: 'UK'
// }
// console.log(isEligibleToVote(testUser)) // true
// console.log(isEligibleToVote(testUser2)) // false


// В Ramda есть функция R.both, которая принимает две функции и возвращает функцию, которая возвращает true, если обе переданные функции возвращают true
// передали две функции, первая принимает значение и возвращает true, если значение меньше 2, вторая возвращает true, если значение больше 1
// const test = R.both(value => value < 2, value => value > 0)
// вызвали функцию test с одним аргуметом, который передаётся и в первую и во вторую функцию R.both(1 => 1 < 2, 1 => 1 > 0)
// console.log(test(1)) // true


// на Ramda
const wasBornInCountry = R.propEq('birthCountry', 'UK')
const wasNaturalized = person => Boolean(person.naturalizationDate); // походу на Ramda нет методов для этих кейсов
const isOver18 = person => person.age >= 18; // походу на Ramda нет методов для этих кейсов

const isCitizen = R.either(wasBornInCountry, wasNaturalized) // R.either возвращает true, если 'ИЛИ' ||, то есть одна из функций вернёт true
const isEligibleToVote = R.both(isOver18, isCitizen) // R.both возвращает true, если 'И' &&, то есть обе функции должны вернуть true

const testUser = {
  age: 20,
  birthCountry: 'UK'
}
const testUser2 = {
  age: 15,
  birthCountry: 'UK'
}
console.log(isEligibleToVote(testUser)) // true
console.log(isEligibleToVote(testUser2)) // false 
*/


// мы не завязаны на кокретных данных, и можем использовать функцию в разных местах
const idEquals = R.propEq('id')
const isAlex = idEquals(2, { id: 2, name: 'Alex' }) // получить пользователя с id: 2
const isFirstPost = idEquals(1, { id: 1, title: 'My first Post' }) // получить пост с id: 1

console.log(isAlex)
console.log(isFirstPost)