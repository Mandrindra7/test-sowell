<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn data-testid="drawer" dense flat round icon="menu" @click="drawer = true" />

        <q-toolbar-title>
          <q-avatar>
            <img src="src/assets/sowell.svg" />
          </q-avatar>
          Aptitude Test
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-white-3"
    >
      <q-scroll-area class="fit">
        <div class="text-h6 q-ml-md q-mt-md">Menu</div>
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              data-testid="list-item"
              clickable
              :active="menuItem.name === $route.name"
              v-ripple
              :to="{ name: menuItem.name }"
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const $route = useRoute()

const drawer = ref(false)
const menuList = [
  {
    icon: 'home',
    label: 'Home',
    name: 'home'
  },
  {
    icon: 'edit_note',
    label: 'Tests',
    name: 'test'
  }
]
</script>

<style scoped></style>
