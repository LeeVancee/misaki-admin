import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api'
})

// request拦截器
axiosInstance.interceptors.request.use(
  (requestInfo) => {
    if (requestInfo.headers) {
      requestInfo.headers['token'] = localStorage.getItem('token') || '0'
      requestInfo.headers['Content-Type'] = 'application/json;charset=UTF-8'
      return requestInfo
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response 拦截器
axiosInstance.interceptors.response.use((response) => {
  const res = response.data
  if (res.code === 200) {
    return res
  } else if (res.code === 10001) {
    alert('未登录或者登录过期,请登录')
  } else if (res.code === 10002) {
    alert('权限不足')
  } else {
    alert(res.message)
  }
})

export default axiosInstance
