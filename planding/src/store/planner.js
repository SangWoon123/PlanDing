import { defineStore } from 'pinia'

export const usePlannerStore = defineStore('planner', {
  state: () => ({
    formData: {
      scheduleId: '', // 스케줄 선택에 대한 ID
      title: '', // 일정 이름
      status: '', // 일정 상태
      scheduleDate: null, // 마감 날짜
      deadlineTime: null, // 마감 시간
      content: '', // 일정 상세 설명
      managerCode: '', // 관리자 코드
      userCodes: [] // 선택된 사용자 코드 배열
    }
  }),
  actions: {
    updateFormData(newData) {
      this.formData = { ...this.formData, ...newData }
    },
    getLocalDateTime() {
      const formattedDate = this.formData.scheduleDate.toISOString().split('T')[0]
      const dateTimeString = `${formattedDate}T${this.formData.deadlineTime}:00`
      return dateTimeString
    },
    submitForm() {
      return {
        ...this.formData,
        deadline: this.getLocalDateTime()
      }
    }
  }
})
