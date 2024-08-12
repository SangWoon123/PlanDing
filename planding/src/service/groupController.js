import { authInstance } from './authAxios'

export const deleteGroup = async (groupCode) => {
  try {
    const response = await authInstance('/api/v1/group').delete(`/${groupCode}`)
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}

export const leaveGroup=async(groupCode)=>{
  try {
    const response = await authInstance('/api/v1/group').delete(`/leave/${groupCode}`)
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}
