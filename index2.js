const R = require('ramda');

// каррирование
// ============


/* 
const add = function (a, b) {
  return a + b
}

console.log(add(1, 2)) 
*/


/* 
const add = function (a, b) {
  return a + b
}

const curryAdd = R.curry(add)
console.log(curryAdd())
console.log(curryAdd(1))
console.log(curryAdd(1, 2))
console.log(curryAdd(1)(2))
*/


/* 
const objects = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  }
]

// использую простую функци чтобы было понятнее откуда, что взялось, и куда что передаётся, а не стрелочную const getIds = objects.map(o => o.id)
const getIds = objects.map(function (object) {
  return object.id
})

console.log(getIds)
*/


/* 
const objects = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  }
]

const get = R.curry(function (property, object) {
  return object[property]
})

// const getIds = objects.map(function (object) {
//   return object.id
// })

// в первый аргумент пришло 'property', а во второй пришёл элемент object из map, то есть примерно так -> get('id')(object)
const getIds = objects.map(get('id'))

console.log(getIds)
*/


/* 
const objects = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  }
]

const get = R.curry(function (property, object) {
  return object[property]
})

// const getIds = objects.map(function (object) {
//   return object.id
// })

// в первый аргумент пришло 'property', а во второй пришёл элемент object из map, то есть примерно так -> get('id')(object)
// const getIds = objects.map(get('id'))

// console.log(getIds)

// теперь завернём это всё ещё в одну функцию, которая будет принимать наш изначальный массив objects
const getIds = function (objects) {
  return objects.map(get('id'))
}

console.log(getIds(objects)) 
*/


/* 
const objects = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  }
]

const get = R.curry(function (property, object) {
  return object[property]
})

// const getIds = objects.map(function (object) {
//   return object.id
// })

// в первый аргумент пришло 'property', а во второй пришёл элемент object из map, то есть примерно так -> get('id')(object)
// const getIds = objects.map(get('id'))

// console.log(getIds)

// теперь завернём это всё ещё в одну функцию, которая будет принимать наш изначальный массив objects
// const getIds = function (objects) {
//   return objects.map(get('id'))
// }

// console.log(getIds(objects)) 

// теперь идём ещё дальше, каррируем сам map, то есть наш каррированный map принимает первым аргументом какую-нибудь функцию(что именно мы будем делать с массивом значений), а вторым аругментом сами значения, то есть мы идём по массиву значений и для каждого из них вызываем какую-то функцию
const curryMap = R.curry(function(fn, values) {
  return values.map(fn)
})

const getIds = curryMap(get('id'))

console.log(getIds(objects))
*/

// --------------------------------------------------------

const fetchFromServer = function () {
  return new Promise(function (resolve) {
    resolve({
      user: 'jack',
      posts: [
        {
          title: 'why curry?'
        },
        {
          title: 'functional programming'
        }
      ]
    })
  })
}

// делаем запрос, получаем поле posts, проходим мэпом по всем постам и берём свойство title, выводим в консоль
// fetchFromServer()
//   .then(function (data) {
//     return data.posts
//   })
//   .then(function (posts) {
//     return posts.map(function (post) {
//       return post.title
//     })
//   })
//   .then(function (titles) {
//     console.log('titles:', titles)
//   })

const get = R.curry(function (property, object) {
  return object[property]
})

const curryMap = R.curry(function(fn, values) {
  return values.map(fn)
})

// то же самое но с помощью наших вспомогательных функций: делаем запрос, получаем поле posts, проходим мэпом по всем постам и берём свойство title, выводим в консоль
fetchFromServer()
  .then(get('posts'))
  .then(curryMap(get('title')))
  .then(function (titles) {
    console.log('titles:', titles)
  })