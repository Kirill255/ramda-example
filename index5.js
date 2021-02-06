const R = require('ramda');

// Композиция в Javascript и Ramda
// ===============================



// на js
// const toSlug = input => {
//   const words = input.split(' ')
//   const lowercasedWords = words.map(word => word.toLowerCase())
//   const slug = lowercasedWords.join('-')
//   const encodedSlug = encodeURIComponent(slug)

//   return encodedSlug
// }

// const slug = toSlug('This is composition')
// console.log(slug) // this-is-composition


// то же самое, без дополнительных переменных
// const toSlug = input => {
//   return encodeURIComponent(
//     input.split(' ')
//       .map(str => str.toLowerCase())
//       .join('-')
//   )
// }


// const slug = toSlug('This is composition')
// console.log(slug) // this-is-composition


// на Ramda
// нужно читать изнутри, результат выполенения каждой внутренней функции передаётся наружу из функции в функции
// взяли R.split и разбили по пробелу наш переданный input  -> [ 'This', 'is', 'composition' ]
// результат передали в R.map, и для каждого элемента вызываем R.toLower -> [ 'this', 'is', 'composition' ]
// дальше результат передаём в R.join и джоиним по '-'

// const toSlug = input => {
//   return encodeURIComponent(R.join('-')(R.map(R.toLower)(R.split(' ')(input))))
// }


// с форматированием, можем так понятнее будет
// const toSlug = input => {
//   return encodeURIComponent(
//     R.join('-')(
//       R.map(R.toLower)(
//         R.split(' ')(input)
//       )
//     )
//   )
// }

// const slug = toSlug('This is composition')
// console.log(slug) // this-is-composition


// то же самое с R.compose
// это функция, которая позволяет делать композиции в более читабельном варианте, в неё можно передать цепочку функций, которые по очереди применятся на аргумент и будут передавать результат каждой функции дальше

// const toSlug = input => R.compose(
//   encodeURIComponent,
//   R.join('-'),
//   R.map(R.toLower),
//   R.split(' ')
// )(input)

// const slug = toSlug('This is composition')
// console.log(slug) // this-is-composition


// Как это работает? Мы применяем R.compose на input. Он идет последним аргументом и дальше вызываются все функции по очереди с права на лево. Так как все функции каррируются, то результат в следующую функцию передается автоматически.
// Мы избавились от вложенности и обязательного прокидывания аргументов. Также наша функция toSlug, теперь избавилась от 4х ненужных переменных.
// Единственное, что нужно помнить, это то, что R.compose тоже каррируется, поэтому этот код можно еще упростить, убрав аргумент.


// const toSlug = R.compose(
//   encodeURIComponent,
//   R.join('-'),
//   R.map(R.toLower),
//   R.split(' ')
// )

// const slug = toSlug('This is composition')
// console.log(toSlug) // this-is-composition


const slug = R.compose(
  encodeURIComponent,
  R.join('-'),
  R.map(R.toLower),
  R.split(' ')
)('This is composition')
console.log(slug)


/* 
Нужно просто читать справа - налево. То есть у нас есть данные, мы применяем трансформации и в конце присваиваем значение в переменную
const result = R.compose(трансформации)(начальные данные).
Если вам не нравится, что все справа налево и вы хотите наоборот вы можете использовать pipe. Это тоже самое но в обратном порядке
const result = R.pipe(трансформации_слева_направо)(начальные данные)
*/


const obj = {
  uuid: '7592eaf4-a630-4d7e-aa63-f85a090dbf70',
  device: '81283324'
};

const constructUrlParams = R.compose(
  // encodeURIComponent, // раскомментировать
  R.join('&'),
  R.map(R.join('=')),
  R.toPairs
)(obj)
console.log(constructUrlParams) // uuid=7592eaf4-a630-4d7e-aa63-f85a090dbf70&device=81283324, если с encodeURIComponent uuid%3D7592eaf4-a630-4d7e-aa63-f85a090dbf70%26device%3D81283324

/* 

R.keys тут не очень подходит, так как в цепочке мы не можем простым способом создать дополнительную переменную, где мы что-то сохраним. Поэтому
1. Обьект превращаем в пары ключ значение
2. Проходимся map и джоиним каждую пару
3. Джойним все елементы массива.
*/