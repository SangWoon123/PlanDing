import { authInstance } from './authAxios'

export const participationGroupSchedule = async (scheduleId, status) => {
  try {
    const data = {
      scheduleId: scheduleId,
      status: status
    }
    const response = await authInstance('/api/v1/attendance').post('', data)
    console.log(response.data.data)
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}
