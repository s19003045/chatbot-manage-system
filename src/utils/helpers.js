import axios from 'axios'
import Swal from 'sweetalert2'


const apiBaseURL = process.env.NODE_ENV === 'production' ? `https://medical-chatbotserver.herokuapp.com/api` : 'http://localhost:3000/api'


export const apiHelper = axios.create({
  baseURL: apiBaseURL
})

// 基本設定：可用於 API 之 response 
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

//刪除提示
export const ToastDelete = Swal.mixin({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  toast: false,
  icon: "warning",
  position: "center",
  showCancelButton: true,
  showConfirmButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!",
  focusConfirm: false,
  focusCancel: true,
  timer: 5000,
  timerProgressBar: true
})
