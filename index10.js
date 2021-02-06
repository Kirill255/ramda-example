const R = require('ramda');

// Пишем условия с when и unless в Ramda
// Давайте напишем метод truncate, который будет обрезать строку, если в ней больше 10ти символов и добавлять три точки. Если же меньше, то просто возвращать строку
// =====================================

// на js

// const truncate = str => {
//   let truncatedStr
//   if (str.length > 10) {
//     truncatedStr = str.substring(0, 10)
//     truncatedStr = `${truncatedStr}...`
//   } else {
//     truncatedStr = str
//   }
//   return truncatedStr
// }
// console.log(truncate('12345'))
// console.log(truncate('123456789010'))

// то же самое
// const truncate = str => {
//   return str.length > 10 ? str.substr(0, 10) + '...' : str
// }

// console.log(truncate('12345'))
// console.log(truncate('123456789010'))


// на Ramda
// const truncate = R.when(
//   str => str.length > 10,
//   R.compose(
//     R.join(''),
//     R.append('...'),
//     R.take(10)
//   )
// )

// или так
// const truncate = R.when(
//   R.propSatisfies(x=> x > 10, 'length'),
//   R.compose(
//     R.join(''),
//     R.append('...'),
//     R.take(10)
//   )
// )

// или так
const truncate = R.when(
  R.propSatisfies(R.gt(R.__, 10), 'length'),
  R.compose(
    R.join(''),
    R.append('...'),
    R.take(10)
  )
)

// unless обратный метод, методу when, то есть !when
// const truncate = R.unless(
//   R.propSatisfies(R.gt(R.__, 10), 'length'),
//   R.compose(
//     R.join(''),
//     R.append('...'),
//     R.take(10)
//   )
// )

console.log(truncate('12345'))
console.log(truncate('123456789010'))