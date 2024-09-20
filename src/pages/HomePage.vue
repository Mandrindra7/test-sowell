<template>
  <q-page padding>
    <div data-testid="home.title" class="text-h4">File upload page</div>
    <!-- TODO: add useful classes and CSS to match the desired look -->
    <sw-file-uploader
      label="Ajouter un fichier"
      v-model="file"
      @update:model-value="uploadedFile"
    ></sw-file-uploader>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import SwFileUploader from '@/components/FileUploader.vue'

defineOptions({
  name: 'HomePage'
})

const file = ref<any>(null)

const uploadedFile = (event: any) => {
  file.value = event
  console.log(file.value)
}
</script>
