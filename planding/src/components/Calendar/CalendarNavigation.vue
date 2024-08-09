<template>
  <v-toolbar class="header" flat>
    <div>
      <v-btn color="#7F83EA" @click="prev">
        <figure>
          <img src="../../assets/left.png" alt="Previous arrow" />
        </figure>
      </v-btn>
      <v-btn class="today" flat :text="title" icon @click="toToday" />
      <v-btn color="#7F83EA" icon @click="next">
        <figure>
          <img src="../../assets/right.png" alt="Previous arrow" />
        </figure>
      </v-btn>
    </div>
    <v-spacer></v-spacer>

    <!-- 보기 모드 토글 버튼 -->
    <v-btn-toggle :model-value="view_mode" @update:modelValue="updateViewMode" mandatory>
      <v-btn color="#8487e2" value="month">월간 보기</v-btn>
      <v-btn color="#8487e2" value="week">주간 보기</v-btn>
    </v-btn-toggle>
  </v-toolbar>
</template>

<script setup>

defineProps({
  title: String,
  view_mode: String
})
const emit = defineEmits(['prev', 'next', 'toToday', 'updateViewMode'])

function prev() {
  emit('prev')
}

function next() {
  emit('next')
}

function toToday() {
  emit('toToday')
}

function updateViewMode(value) {
  emit('updateViewMode', value)
}

</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 2px;
  .today {
    margin: 0 10px;
  }
}
</style>
