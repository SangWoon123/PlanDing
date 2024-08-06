import { authInstance } from './authAxios'

export const getFavoriteList = async () => {
  try {
    const response = await authInstance('/api/v1/favorite').get('')
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export const postFavorite = async (groupCode) => {
  try {
    const response = await authInstance('/api/v1/favorite').post(`/${groupCode}`)
    return response.data.data
  } catch (error) {
    console.log(error)
  }
}

export const deleteFavorite = async (groupCode) => {
  try {
    const response = await authInstance('/api/v1/favorite').delete(`/${groupCode}`)
    return response.data.data
  } catch (error) {
    console.log(error)
  }
}
