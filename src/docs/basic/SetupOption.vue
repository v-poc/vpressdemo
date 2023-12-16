<template>
  <h4>{{ msg }}</h4>
  <input v-model="msg" class="input-example" />
</template>

<script>
import { ref } from "vue";

export default {
  name: "setup-option",

  setup() {
    const msg = ref("hello world! SetupOption");

    return {
      msg,
    };
  },
};
</script>

<style scoped>
.input-example {
  padding-left: 5px;
  width: 100%;
  border: 1px solid #aaa;
}
</style>
