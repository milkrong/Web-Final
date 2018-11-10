import axios from 'axios'
import { Message, Loading } from 'element-ui'
import { endianness } from 'os'

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
  return Promise.reject(error)
})

export default axios
