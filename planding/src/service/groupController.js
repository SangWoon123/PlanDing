import { authInstance } from './authAxios'

export const deleteGroup = async (groupCode) => {
  try {
    const response = await authInstance('/api/v1/group').delete(`/${groupCode}`)
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}
