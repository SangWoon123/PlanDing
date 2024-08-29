<template>
  <BaseCard class="chat-page">
    <!-- <div class="content"></div> -->
    <div class="list">
      <div v-for="(i, index) in 7" :key="index" class="test">
        <ChatListItem />
      </div>
      <div class="bottom-left"></div>
    </div>
    <div class="chat">
      <div class="bottom-right">
        <textarea placeholder="채팅을 입력하세요" />
        <button type="button">
          <img width="24px" height="24px" src="../../../assets/send-line.png" alt="" />
        </button>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/ui/BaseCard.vue'
import ChatListItem from './ChatListItem.vue'
</script>

<style lang="scss" scoped>
.chat-page {
  width: 546px;
  height: 503px;
  border: none;
  display: flex;
  background-color: #f6f6f8;
  border-radius: 8px;
  z-index: 10;
  .list {
    width: 160px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    overflow-y: auto;
    max-height: calc(100% - 114px);
    .test {
      display: flex;
      flex-direction: column;
      align-self: flex-start;
      margin-bottom: 4px;
      :nth-child(1) {
        border-radius: 8px 0 0 0;
      }
    }
  }
  .chat {
    width: 386px;
    display: flex;
    flex-direction: column;
    justify-content: end;
  }
  .bottom-right {
    height: 114px;
    background-color: #ffffff;
    border-radius: 0 0 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    textarea {
      background-color: #f6f6f8;
      font-size: 14px;
      width: 310px;
      height: 82px;
      padding: 10px;
      resize: none;
      border-radius: 4px;
    }
    button {
      width: 36px;
      height: 36px;
      background-color: #656ae6;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: end;
      margin: 0 0 20px 5px;
    }
    button:hover {
      border-color: orange;
      color: white;
      box-shadow: 0 0.5em 0.5em -0.4em yellow;
    }
  }
  .bottom-left {
    height: 114px;
    background-color: red;

    border-radius: 0 0 0 8px;
  }
}
</style>
