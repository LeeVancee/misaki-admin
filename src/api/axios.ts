import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/api'
})

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
