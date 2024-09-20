<template>
  File Uploader
  <!-- TODO: implement the component-->
  <h1 class="text-h6 text-blue-10">{{ props.label }}</h1>
  <div class="file-upload-container">
    <label
      @dragover.prevent="handleDragOver"
      @dragleave="handleDragLeave"
      @drop.prevent="handleDrop"
      class="file-drop-area"
    >
      <input ref="fileInput" type="file" class="hidden" multiple @change="handleFileSelect" />
      <div class="file-upload-content">
        <q-icon :name="getIcon" size="42px" color="blue-5" />
        <p class="q-mt-sm text-blue-5" v-if="files.length === 0">Importer un fichier</p>
      </div>
    </label>

    <!-- File List Display -->
    <q-list v-if="files.length" class="file-list">
      <q-item v-for="(file, index) in files" :key="index" class="file-list-item">
        <q-item-label class="file-name text-blue-5">{{ file.name }}</q-item-label>
        <q-icon name="close" @click="removeFile(index)" class="remove-icon" />
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { QIcon } from 'quasar'

const props = defineProps({
  label: String,
  modelValue: String
})

const files = ref<File[]>([])
const fileInput = ref<HTMLInputElement | null>(null)
const $emit = defineEmits(['update:modelValue'])

const getIcon = computed(() => {
  return files.value.length > 0 ? 'file_download_done' : 'file_upload'
})

const handleFileSelect = (event: Event) => {
  event.preventDefault()
  const target = event.target as HTMLInputElement
  if (target.files) {
    for (let i = 0; i < target.files.length; i++) {
      files.value.push(target.files[i])
    }
    onFileAdded(files.value)
  }
}

const onFileAdded = (files: File[]) => {
  const arr: String[] = []
  files.forEach((file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const base64String = e?.target?.result

      arr.push(base64String as string)
    }
    reader.readAsDataURL(file)
  })
  $emit('update:modelValue', arr)
}

// Handle drag over event
const handleDragOver = (event: any) => {
  event.preventDefault()
  // Add some visual fluff to show the user can drop its files
  if (!event?.currentTarget?.classList?.contains('bg-green-3')) {
    event?.currentTarget?.classList?.remove('bg-gray-1')
    event?.currentTarget?.classList?.add('bg-green-3')
  }
}

const handleDragLeave = (event: any) => {
  event?.currentTarget?.classList.add('bg-gray-1')
  event?.currentTarget?.classList.remove('bg-green-3')
}

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files) {
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      files.value.push(event.dataTransfer.files[i])
    }
  }
}

const removeFile = (index: number) => {
  files.value.splice(index, 1)
}
</script>

<style scoped>
.file-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 324px;
}

.file-drop-area {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.file-drop-area:hover {
  border-color: #007bff;
}

.file-upload-content {
  text-align: center;
}

.file-list {
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
}

.file-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: 324px;
}

.file-name {
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.remove-icon {
  cursor: pointer;
  color: red;
  font-weight: 900;
}
</style>
