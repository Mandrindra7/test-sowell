<template>
  <q-page padding>
    <div class="text-h4">Summary</div>
    <q-list class="q-mt-md">
      <q-item>
        <q-item-section>
          <q-item-label>Your name</q-item-label>
          <q-item-label caption lines="2"
            >You gave the name
            <span data-testid="section-name" class="name text-bold text-body1">{{
              name
            }}</span></q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-icon data-testid="icon" name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <template v-if="surname">
        <q-item>
          <q-item-section >
            <q-item-label>Your surname</q-item-label>
            <q-item-label caption lines="2"
              >You gave the name
              <span  data-testid="section-surname" class="text-bold text-body1">{{ surname }}</span></q-item-label
            >
          </q-item-section>

          <q-item-section side top>
            <q-icon data-testid="icon" name="star" color="yellow" />
          </q-item-section>
        </q-item>

        <q-separator spaced inset />
      </template>

      <q-item>
        <q-item-section>
          <q-item-label>About </q-item-label>
          <q-item-label caption lines="2"
            >You are aged <span data-testid="section-age" class="text-bold text-body1">{{ form.age }}</span></q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-icon data-testid="icon" :name="isMajor ? 'star' : 'star_outline'" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item>
        <q-item-section>
          <q-item-label>Licence and terms</q-item-label>
          <q-item-label caption lines="2" data-testid="section-term">
            You <span v-if="!form.accept">did not accept</span><span v-else>accepted</span>
            the licence and terms conditions
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-icon data-testid="icon" :name="form.accept ? 'star' : 'star_outline'" color="yellow" />
        </q-item-section>
      </q-item>

      <q-separator spaced inset />

      <q-item>
        <q-item-section>
          <q-item-label>About you</q-item-label>
          <template v-if="form.about">
            <q-item-label caption lines="2">You wrote about you:</q-item-label>
            <q-item-label class="quote text-body2">
              <blockquote>
                <p data-testid="about">"{{ form.about }}"</p>
                <cite>{{ form.fullName }}</cite>
              </blockquote>
            </q-item-label>
          </template>
          <q-item-label v-else caption lines="2">You did not write about you</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-icon data-testid="icon" :name="!!form.about ? 'star' : 'star_outline'" color="yellow" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { useForm } from '@/composables/form'
import { computed } from 'vue'

defineOptions({
  name: 'SecondTestPage'
})

const { form } = useForm()

const name = computed(() => {
  return form.fullName.split(' ')[0]
})

const surname = computed(() => {
  return form.fullName.split(' ').slice(1).join(' ')
})

const isMajor = computed(() => {
  return form.age >= 18
})
</script>

<style lang="scss" scoped>
.quote {
  display: inline-block;
  margin: 1em;
  overflow: hidden;
  blockquote {
    border: solid 2px #757575;
    display: inline-block;
    margin: 0;
    padding: 1em;
    position: relative;
    &:before {
      bottom: -10%;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      top: -10%;
      transform: rotate(-15deg) skew(5deg);
    }
    cite {
      display: block;
      font-style: italic;
      text-align: right;
      &:before {
        content: '- ';
      }
    }
    > * {
      position: relative;
      z-index: 1;
    }
  }
}
</style>
