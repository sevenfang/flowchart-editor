<!--
 * @description     工具栏对象
 *
 * @author          重阳
 * @create          2019-10-16 11:00
-->

<template>
  <div :class="{ 'tool-item': true, 'active': active, 'disabled': disabled }">
    <slot name="label" class="label">{{ label }}</slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
  export default {
    name: 'ToolItem',
    props: {
      label: String,
      active: Boolean,
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>


<style scoped lang="scss">
  .tool-item {
    display: inline-block;
    position: relative;
  }
</style>
