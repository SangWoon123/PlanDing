import { authInstance } from './authAxios'

export const getPlannersByGroup = async (groupCode, scheduleId) => {
  try {
    const response = await authInstance('/api/v1/group-rooms').get(
      `/${groupCode}/planner/${scheduleId}`
    )
    return response.data.data
  } catch (error) {
    console.log('getPlannersByGroup 오류', error)
  }
}

export const getWeekPlannerByGroup = async (groupCode, startDate, endDate) => {
  try {
    const response = await authInstance('/api/v1/group-rooms/planner/week').get(
      `/${groupCode}/${startDate}/${endDate}`
    )
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}

export const getPlannerById = async (groupCode, plannerId) => {
  try {
    const response = await authInstance('/api/v1/group-rooms/planner').get(
      `/${groupCode}/${plannerId}`
    )
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}