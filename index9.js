const R = require('ramda');

// Условия if else в Ramda
// =======================


const video = {
  '720p': 'funny-video-hd.mp4',
  '480p': 'funny-video-480p.mp4',
  isHD: true
}


// на js
// const getVideoFilepath = video => video.isHD ? video['720p'] : video['480p']

// const getVideoFilepath = video => {
//   const file = video.isHD ? video['720p'] : video['480p']
//   return `/api/videos/${file}`
// }


// на Ramda
// const getVideoFilepath = R.ifElse(
//   R.propEq('isHD', true),
//   R.prop('720p'),
//   R.prop('480p')
// )

const getVideoFilepath = R.compose(
  R.concat('/api/videos/'),
  R.ifElse(
    R.propEq('isHD', true),
    R.prop('720p'),
    R.prop('480p')
  )
)

console.log(getVideoFilepath(video))


/* 
как проверить сразу три значения:
const num1 = 1;
const num2 = 1;
const num3 = 2;
if(num1 && num2 && num3) 'true';

Вот так
R.all(R.equals(1), [1, 1, 2])
Еще может пригодится allPass для функций и any и anyPass с такой же логикой.
*/


/* 
Так как каждым аргументом ifElse принимает функцию, то нам нужно обернуть наши переменные в R.always, которые каждую из них превращают в функцию, которая возвращает эту переменную.
Поэтому ifElse лучше всего подходит для манипуляций с обьектом, на который он вызывается, а не для замены тернарных операторов.


const getMessage = isWorkingTime => {
  const onlineMessage = 'We are online'
  const offlineMessage = 'We are offline'

  return R.ifElse(
    R.always(isWorkingTime),
    R.always(onlineMessage),
    R.always(offlineMessage)
  )()
}
*/