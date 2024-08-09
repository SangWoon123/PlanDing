import { authInstance } from './authAxios'

export const postInvitation = async (groupCode, userCode) => {
  const data = {
    groupCode: groupCode,
    userCode: userCode
  }
  try {
    const response = await authInstance('/api/v1/invitation').post('', data)
    return response.data
  } catch (error) {
    console.log('postInvitation 오류', error)
  }
}

export const getInvitation=async()=>{
  try{
    const response=await authInstance('/api/v1/invitation').get('')
    return response.data.data
  }catch(error){
    console.error(error)
  }
}
