// замыкание
// =========


/* 
// добавить 'К', а не добвать TWO(2)
const addTo = (n) => {
  return n + 2
}
console.log(addTo(3))
*/


/* 
// то же самое в примере ниже
const addTo = (n) => {
  return function() {
    return n + 2
  }
}
console.log(addTo(3)())
*/


/* 
// то же самое в примере выше
const addTo = (n) => {
  return function() {
    return n + 2
  }
}

const addNumber = addTo(3)
console.log(addNumber())
*/


/* 
// теперь то же самое, что и в примерах выше, только второе число(2), которое у нас было явно прописано в внтури функции, мы теперь тоже будем передавать
const addTo = (passed) => {
  return function(inner) {
    return passed + inner
  }
}

// добавать к тройке(3)
const addThree = addTo(3)
// добавать число 2, к ранее переданной 3
console.log(addThree(2))


// добавать к пятёрке(5)
const addFive = addTo(5)
// добавать число 3, к ранее переданной 5
console.log(addFive(3))
*/





