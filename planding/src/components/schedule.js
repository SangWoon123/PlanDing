import { authInstance } from '@/service/authAxios'

async function showTodaySchedule() {
  const response = await authInstance('/api/v1/common/schedule/today').get()
  console.log(response.data.data)
  return response.data.data
}

export default { showTodaySchedule }
