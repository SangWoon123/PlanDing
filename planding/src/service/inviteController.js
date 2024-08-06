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
