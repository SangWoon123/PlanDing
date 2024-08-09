import { authInstance } from './authAxios'

export const updateGroupAlarmSetting = async (groupCode, alarm) => {
  try {
    const response = await authInstance('/api/v1/user-setting').put(
      `/${groupCode}/alarm`,
      {},
      {
        params: { alarmEnabled: alarm }
      }
    )
    console.log(response.data)
    return response
  } catch (error) {
    console.error(error)
  }
}
