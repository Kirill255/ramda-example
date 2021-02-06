// Пишем свою функцию curry на js, а не берём из ramda -> R.curry
// ==============================================================


/* 
// в такую функцию можно передавать параметры только последовательно, как в вызове ниже
const curry = function (fn) {
  return function(a) {
    return function(b) {
      return function(c) {
        return a + b + c;
      }
    }
  }
}

// простая функция
const add = function(a, b, c) {
  return a + b + c;
}

// каррированная функция
const curryAdd = curry(add)

console.log(curryAdd(1)(2)(3))
*/


/* 
// настоящая функция каррирования
const curry = function (fn) {
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/length
  const arity = fn.length // берём арность функции, то есть колическтво аргументов, которые ожидает функция для вызова, const add = function(a, b, c) {} -> три аргумента: a, b, c
  console.log('arity', arity)
  // задаём имя f1 для функции, нужно будет для рекурсии ниже
  return function f1(...args) {
    console.log('args', args)
    console.log('args length', args.length) // фактическое количество переданных параметров, 
    // т.е. функция const add = function(a, b, c) {} -> ожидает три аргумента, но при её вызове могли передать только два или один add(1), add(1, 2)
    if (args.length >= arity) { // больше или равно, в случае если переданных аргументов больше, мы всё равно возьмём столько сколько ожидает функция для вызова(arity)
      console.log('enough arguments')
      // вызываем нашу функцию, в данном случае add и обратно распаковываем туда все аргументы, то есть выше мы их собрали в массив [1, 2, 3], теперь нужно распаковать массив обратно в (1, 2, 3)
      return fn(...args) 
    } else {
      console.log('need more arguments')
      return function f2(...moreArgs) {
        console.log('moreArgs', moreArgs)
        console.log('moreArgs length', moreArgs.length) // сколько параметров передал на этот раз
        // если мы попали в это условие, значит в первоначальном вызове было передано недостаточно параметров, но мы их запомнили, сейчас в функцию было передано ещё какое-то кол-во параметров
        // поэтому собираем все параметры в один массив, например сначала было передан один curryAdd(1), а потом два curryAdd(1)(2, 3)
        // const newArgs = args.concat(newArgs)
        const newArgs = [...args, ...moreArgs]
        console.log('newArgs', newArgs)
        // и теперь вызываем снова нашу функцию f1(вот где рекурсия), но уже с новым кол-вом аргументов
        return f1(...newArgs)
      }
    }
    
  }
}

// простая функция
const add = function(a, b, c) {
  return a + b + c;
}

// каррированная функция
const curryAdd = curry(add)

// console.log(curryAdd(1, 2, 3))
// console.log(curryAdd(1, 2)(3))
// console.log(curryAdd(1)(2, 3))
console.log(curryAdd(1)(2)(3))
*/


// То же самое только без комментариев, как выше
const curry = function (fn) {
  const arity = fn.length;
  return function f1(...args) {
    if (args.length >= arity) {
      return fn(...args) 
    } else {
      return function f2(...moreArgs) {
        const newArgs = [...args, ...moreArgs]
        return f1(...newArgs)
      }
    }
    
  }
}

// простая функция
const add = function(a, b, c) {
  return a + b + c;
}

// каррированная функция
const curryAdd = curry(add)

console.log(curryAdd(1, 2, 3))
console.log(curryAdd(1, 2)(3))
console.log(curryAdd(1)(2, 3))
console.log(curryAdd(1)(2)(3))