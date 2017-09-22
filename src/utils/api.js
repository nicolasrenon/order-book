import { API_PROTOCOL, API_URL } from '../config'

function apiConstructor() {
  return `${API_PROTOCOL}://${API_URL}/`
}

export const getProducts = ({ id, view, params }) => {
  const api = apiConstructor()
  const endpoint = id ? `${api}/products/${id}/${view}` : `${api}/products`

  if (params) {
    return Object.entries(params).reduce((acc, [key, value], index) =>
      `${acc}${index ? '&' : '?'}${key}=${value}`,
    endpoint)
  }

  return endpoint
}
