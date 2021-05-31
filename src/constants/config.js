// const PORT = 8000
// const HOST = 'http://localhost'
// const HOST = 'https://api-gateway-pos.herokuapp.com'
const HOST = 'https://apigway.herokuapp.com'
// export const BASE_URL = `${HOST}:${PORT}`
export const BASE_URL = `${HOST}`
export const USER_URL = `${BASE_URL}/user/merchant`

const merchantId = 'a8148703-2a9b-44bc-9ba0-85d497712ac5'
// const restaurantId = '987c9b15-c6cc-4ecb-83a1-249586692800'
const restaurantId = '814136ac-367f-402f-b4b3-ee22c536af14'
export const ACCESS_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjaGFudElkIjoiYTgxNDg3MDMtMmE5Yi00NGJjLTliYTAtODVkNDk3NzEyYWM1IiwibWVyY2hhbnRVc2VybmFtZSI6Im1lcmNoYW50MTIzIiwiaWF0IjoxNjE5OTQwNjkwLCJleHAiOjE2MjExNTAyOTB9.20F8prxMJIrHWnZyE20U737J-e2XlQ0JwpOCgkPsRwc`
export const STAFF_URL = `${BASE_URL}/user/merchant/${merchantId}/restaurant/${restaurantId}/staff`
