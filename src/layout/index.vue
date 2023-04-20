<template>
  <div class="layout">

  </div>
</template>

<script setup lang="ts">

import { registerMicroApps, start } from 'qiankun'
const registerList: any = []
registerMicroApps(registerList)

start()
</script>

<style lang="scss" scoped></style>