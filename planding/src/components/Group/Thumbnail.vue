<template>
  <div class="thumbnail">
    <SubTitle text="썸네일 선택" style="padding: 0px; font-size: 18px" />
    <div class="body">
      <label for="upload-image">
        <div class="image">
          <input type="file" id="upload-image" hidden @change="handleFileChange" />
          <figure>
            <img
              :src="imageSrc || baseImage"
              :class="{ 'uploaded-image': imageSrc }"
              alt="썸네일 이미지"
            />
          </figure>
        </div>
      </label>
      <div style="font-size: 12px; align-self: end">썸네일로 지정할 이미지를 선택해주세요</div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import SubTitle from '../MainContent/atom/SubTitle.vue';
import baseImage from '../../assets/load.png'

const imageSrc = ref(null)
const emit = defineEmits(['update-thumbnail'])

const base64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      resolve(e.target.result)
      imageSrc.value = e.target.result
      console.log(imageSrc)
    }
    reader.readAsDataURL(file)
  })
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    base64(file)
    emit('update-thumbnail', file)
  }
}
</script>

<style lang="scss" scoped>
.thumbnail {
  .body {
    display: flex;
    color: #6065d3;
    overflow: hidden;
    .image {
      cursor: pointer;

      figure {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        width: 194px;
        height: 124px;
        background-color: #e7e7fe;
        transition:
          transform 0.3s ease,
          box-shadow 0.3s ease;
        .uploaded-image {
          width: 100%;
          height: 100%;
          border: 2px solid #6065d3;
          border-radius: 4px;
          object-fit: cover;
        }
        img {
          width: 24px;
          height: 24px;
        }
        &:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
}
</style>
