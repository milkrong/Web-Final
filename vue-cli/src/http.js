import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { router } from './router'
import store from './store'

let loading
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0,0,0,0.7)'
  })
};

function endLoading () {
  loading.close()
}
// request check
axios.interceptors.request.use(config => {
  startLoading()

  if (localStorage.postifyToken) {
    // setting request header
    config.headers.Authorization = localStorage.postifyToken
  }
  return config
}, error => {
  return Promise.reject(error)
})

// response check
axios.interceptors.response.use(response => {
  endLoading()
  return response
}, error => {
  endLoading()
  Message.error(error.response.data)

  const { status } = error.response
  if (status == 401) {
    Message.error('Long time no see, please login again')
    // 清除token
    localStorage.removeItem('postifyToken')
    store.dispatch('clearCurrentState')
    // 页面跳转
    router.push('/login')
  }
  return Promise.reject(error)
})

export default axios
