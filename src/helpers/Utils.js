import Pusher from 'pusher-js'
import { NotificationManager } from 'src/components/common/react-notifications'
import { PUSHER_APP_CLUSTER, PUSHER_APP_KEY } from 'src/constants'
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

export const getDayByName = (day) => {
  const DAY_IN_WEEK = {
    Monday: 'Th??? 2',
    Tuesday: 'Th??? 3',
    Wednesday: 'Th??? 4',
    Thursday: 'Th??? 5',
    Friday: 'Th??? 6',
    Saturday: 'Th??? 7',
    Sunday: 'Ch??? nh???t',
  }
  return DAY_IN_WEEK[day]
}

export const padNumber = (number, offset = 2, char = '0') => {
  return String(number).padStart(offset, char)
}

export const listenNotification = () => {
  // const restaurantId = '6587f789-8c76-4a2e-9924-c14fc30629ef'
  const restaurantId = '01bd1b6e-2dd2-4c7a-a79b-7ae05d029495'

  const pusher = new Pusher(PUSHER_APP_KEY, {
    cluster: PUSHER_APP_CLUSTER,
  })

  // const order_id = `1e6f9eca-0899-4d49-9837-49f2397ff808`
  const channel = pusher.subscribe(`orders_${restaurantId}`)
  console.log(channel)

  channel.bind('order-status', (data) => {
    console.log(data)

    handleNotification(data)
  })
}

const handleNotification = (data) => {
  const NOTIFY_TIME = 15000

  try {
    const {
      status,
      delivery: { customerId, customerName },
    } = data

    const notiMessage = `Kh??ch h??ng ${customerId} :${status}`
    NotificationManager.success(notiMessage, '????n h??ng m???i', NOTIFY_TIME)
    return
  } catch (error) {
    console.log(error)
    // New order
    try {
      const {
        order: {
          delivery: { customerId },
          status,
        },
      } = data

      const notiMessage = `Kh??ch h??ng ${customerId} :${status}`
      NotificationManager.success(notiMessage, '????n h??ng m???i', NOTIFY_TIME)
      return
    } catch (error) {
      console.log(error)
    }
  }
}

export const PASSWORD_REGEX = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'

// export const   createFile = async (url) => {
//   let response = await fetch(url);
//   let data = await response.blob();
//   let metadata = {
//     type: 'image/jpeg'
//   };
//   let file = new File([data], "test.jpg", metadata);
//   // ... do something with the file or return it
//   return file
// }
// createFile();

export const createFile = (url) => {
  fetch('https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg')
    .then((res) => res.blob()) // Gets the response and returns it as a blob
    .then((blob) => {
      // Here's where you get access to the blob
      // And you can use it for whatever you want
      // Like calling ref().put(blob)

      // Here, I use it to make an image appear on the page
      let objectURL = URL.createObjectURL(blob)
      let myImage = new Image()
      console.log(myImage)
      return myImage
      // myImage.src = objectURL;
      // document.getElementById('myImg').appendChild(myImage)
    })
}
