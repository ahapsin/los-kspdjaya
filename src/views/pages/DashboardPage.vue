<template>
  <n-card title="Order">
    <template #header-extra>
      <n-button quaternary round @click="resOrder">
        <n-icon size="24">
          <refresh-icon/>
        </n-icon>
      </n-button>
    </template>
    <FpkPage/>
  </n-card>
</template>

<script setup>
import {
  RefreshRound as RefreshIcon,
} from "@vicons/material";

const message = useMessage();

const resOrder = () => {
  message.loading('memuat order ..');
}
</script>