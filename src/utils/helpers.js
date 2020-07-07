import axios from 'axios'
import Swal from 'sweetalert2'

const apiBaseURL = 'https://d89ffcebf90b.ngrok.io/api'

export const apiHelper = axios.create({
  baseURL: apiBaseURL
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})
