<template>
  <q-page padding>
    <div data-testid="form" class="text-h4">Form</div>
    <div class="q-py-md" style="max-width: 400px">
      <q-form ref="inputForm" @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          data-testid="name-input"
          filled
          v-model="form.fullName"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          data-testid="number"
          filled
          type="number"
          v-model="form.age"
          label="Your age *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age',
            (val) => (val > 0 && val < 100 && Math.floor(val) == val) || 'Please type a real age'
          ]"
        />

        <q-input
          data-testid="about"
          filled
          v-model="form.about"
          label="About you"
          hint="Write something about you"
          type="textarea"
        />

        <q-toggle  data-testid="check" v-model="form.accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useForm } from '@/composables/form'
import type { QForm } from 'quasar'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'MainTestPage'
})
const $router = useRouter()

const inputForm = ref<InstanceType<typeof QForm>>()
const { form, reset: onReset } = useForm()

const onSubmit = async () => {
  const isValid = await inputForm.value?.validate()
  if (isValid) {
    $router.push({ name: 'test-summary' })
  }
}

onMounted(() => {
  onReset()
})
</script>

<style></style>
