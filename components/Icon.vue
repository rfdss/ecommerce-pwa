<template>
  <span
  class="iconify"
  :data-icon="icon"
  :data-line="line"
  :data-width="width"
  :data-height="height"
  :data-color="color"
  ></span>
</template>

<script>
export default {
  props: {
    color: String,
    icon: String,
    line: Boolean,
    width: Number,
    height: Number
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style>
</style>