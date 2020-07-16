import axios from 'axios'
import Swal from 'sweetalert2'


const apiBaseURL = process.env.NODE_ENV === 'production' ? `https://medical-chatbotserver.herokuapp.com/api` : 'http://localhost:3000/api'


export const apiHelper = axios.create({
  baseURL: apiBaseURL
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
