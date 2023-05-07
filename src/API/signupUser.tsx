import axios, { AxiosResponse } from 'axios'
import { ISignup } from '../interfaces/interfaces'

const signupUser = async (userData: ISignup): Promise<void> => {
  //  try {

  const res = await fetch('http://localhost:3000', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers':
        'Accept, Content-Type, Authorization, X-Requested-With',
    },
  })
  const data = await res.json()
  console.log(data)
}
// console.log(response.status)
// if (response.status !== 200) {
//   console.log(response)
//   console.log('Error')

// const data = await response.json()
// console.log(data)
// if (response.status === 201) {
//   console.log(response.status)
//   window.location.href = '/'
// }

// } catch (error) {
//   throw error
// }
// }

export default signupUser

// const res = await fetch('http://localhost:3000/data', {
//   method: 'GET',
//   mode: 'no-cors',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })
// const data = await res.json()
// console.log(data)

// const response = await axios.post('http://localhost:3000/api/user/signup', userData, {
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// const response = await fetch('http://localhost:3000/api/user/signup', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(userData),
// })
// const response = await axios.post('http://localhost:3000/api/user/signup', userData, {
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })
