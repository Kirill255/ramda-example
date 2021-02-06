const R = require('ramda');

// Получаем глубоко вложенные поля с Ramda path
// ============================================

const bill = {
  nickname: 'Bill',
  country: 'UK',
  personal: {
    profile: {
      name: 'Bill',
      surname: 'Williams',
      age: 20
    }
  }
}

const mike = {
  nickname: 'Mike',
  country: 'US',
  personal: {}
}

// const getSurname = user => user.personal.profile.surname

// console.log(getSurname(bill)) // Williams
// console.log(getSurname(mike)) // ошибка TypeError: Cannot read property 'surname' of undefined


// поэтому нужно подстраховаться и проверять наличие полей, из-за этого код получается длиннее
// const getSurname = user => user && user.personal && user.personal.profile && user.personal.profile.surname
// console.log(getSurname(bill)) // Williams
// console.log(getSurname(mike)) // undefined


// с Ramda
// const getSurname = user => R.path(['personal', 'profile', 'surname'], user)
// console.log(getSurname(bill)) // Williams
// console.log(getSurname(mike)) // undefined

// или так, так как все методы каррированы, в том числе и R.path
// const getSurname = R.path(['personal', 'profile', 'surname'])
// console.log(getSurname(bill)) // Williams
// console.log(getSurname(mike)) // undefined


// или так, метод R.pathOr позволяет задать значение по-умолчанию, если значение нет, то есть undefined
const getSurname = R.pathOr('not set', ['personal', 'profile', 'surname'])
console.log(getSurname(bill)) // Williams
console.log(getSurname(mike)) // not set


/* 
Небольшой вопрос. Согласно доктрине фунциональности, да и для пользы дела, в строке 
const getSurname = R.pathOr('not set', ['personal', 'profile', 'surname'])
было бы лучше для возврата задавать не строку 'not set', а нами придуманную функцию на подобный поворот событий. 
Я сомневаюсь, что об этом ни кто до меня не подумал, - такой вариант существует?


Звучит логично, но pathOr так не работает.Прийдется делать композицию, если хочется вызвать функцию

R.compose(
  R.when(R.isNull, doSomething)
  R.pathOr(null, ['personal'])
)
*/