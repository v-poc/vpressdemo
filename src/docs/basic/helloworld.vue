<script setup>
import { ref } from "vue";

const msg = ref("hello world!");
</script>

<template>
  <h4>{{ msg }}</h4>
  <input v-model="msg" class="input-example" />
</template>

<style scoped>
.input-example {
  padding-left: 5px;
  border: 1px solid #aaa;
}
</style>
