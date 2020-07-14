import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'https://158f2e03bb5d.ngrok.io'
const apiBaseURL = `${baseURL}/api`

export const apiHelper = axios.create({
  baseURL: apiBaseURL
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
