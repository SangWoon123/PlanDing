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

export const getInvitation = async () => {
  try {
    const response = await authInstance('/api/v1/invitation').get('')
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export const accpetInvitation=async(groupCode,inviteCode)=>{
  try{
    const response=await authInstance('/api/v1/invitation').get(`/accept/${groupCode}/${inviteCode}`)
    return response.data.data
  }catch(error){
    console.error(error)
  }
}

export const declineInvitation=async(inviteCode)=>{
  try{
    const response=await authInstance('/api/v1/invitation').delete(`/decline/${inviteCode}`)
    return response.data.data
  }catch(error){
    console.error(error)
  }
}

export const getScheduleAlarm = async () => {
  try {
    const response = await authInstance('/api/v1/notification').get('/schedules')
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export const deleteAlarm = async (scheduleId) => {
  try {
    await authInstance('/api/v1/notification').delete(`/${scheduleId}`)
  } catch (error) {
    console.error(error)
  }
}
