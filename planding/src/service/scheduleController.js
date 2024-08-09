import { authInstance } from './authAxios'

export const getGroupScheduleInfo = async (groupCode, scheduleId) => {
  try {
    const response = await authInstance('/api/v1/group-rooms').get(`/${groupCode}/${scheduleId}`)
    console.log(response.data.data)
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export const getAllGroupSchedule = async (groupCode) => {
  try {
    const response = await authInstance('/api/v1/group-rooms').get(`/${groupCode}`)
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}
