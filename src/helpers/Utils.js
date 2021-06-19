import { defaultDirection } from '../constants/defaultValues'
import { storage } from './Firebase'

export const mapOrder = (array, order, key) => {
  array.sort(function (a, b) {
    var A = a[key],
      B = b[key]
    if (order.indexOf(A + '') > order.indexOf(B + '')) {
      return 1
    } else {
      return -1
    }
  })
  return array
}

export const getDateWithFormat = () => {
  const today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1 //January is 0!

  var yyyy = today.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  return dd + '.' + mm + '.' + yyyy
}

export const getCurrentTime = () => {
  const now = new Date()
  return now.getHours() + ':' + now.getMinutes()
}

export const getDirection = () => {
  let direction = defaultDirection
  if (localStorage.getItem('direction')) {
    const localValue = localStorage.getItem('direction')
    if (localValue === 'rtl' || localValue === 'ltr') {
      direction = localValue
    }
  }
  return {
    direction,
    isRtl: direction === 'rtl',
  }
}

export const setDirection = (localValue) => {
  let direction = 'ltr'
  if (localValue === 'rtl' || localValue === 'ltr') {
    direction = localValue
  }
  localStorage.setItem('direction', direction)
}

export const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    const uploadTask = storage.ref(`images/${file.name}`).put(file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        console.log(error)
        reject(error)
      },
      () => {
        storage
          .ref('images')
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url)
            resolve(url)
          })
      }
    )
  })
}

export const sortByDay = (data) => {
  const order = {
    Monday: 2,
    Tuesday: 3,
    Wednesday: 4,
    Thursday: 5,
    Friday: 6,
    Saturday: 7,
    Sunday: 8,
  }

  const sortedData = [...data].sort(function (a, b) {
    return order[a.value] - order[b.value]
  })
  return sortedData
}
