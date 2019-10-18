<!--
 * @description     节点元素
 *
 * @author          重阳
 * @create          2019-10-16 11:00
-->
<template>
  <div
    class="node-element"
    :style="elementStyle"
    @mousedown="handleMouseDown"
  >
    <div class="content" :title="title">
      <svg class="icon" v-html="info.icon" v-if="info.icon">
      </svg>
      <img class="icon" src="../../../assets/flow/exclusive-gateway.svg" v-if="info.svg">
      <span class="txt">{{info.label}}</span>
    </div>
  </div>
</template>

<script>
  import utils from '../global/utils'
  export default {
    name: 'NodeElement',
    props: {
      title: {
        type: String,
        required: true
      },
      info: {
        type: Object,
        required: true,
        default () {
          return {
            shape: 'circle',
            label: 'circle',
            enable: true,
            width: 40,
            height: 40,
            anchorPoints: [ [0, 0], [0, 1], [1, 0], [1, 1] ],
            svg: ``
          }
        }
      },
      width: {
        type: Number,
        default: 60
      },
      height: {
        type: Number,
        default: 60
      }
    },
    computed: {
      elementStyle () {
        let _t = this
        let style = {}
        if (_t.width) {
          style.width = _t.width + 'px'
        }
        if (_t.height) {
          style.height = _t.height + 'px'
        }
        return style
      }
    },
    methods: {
      handleMouseDown (event) {
        // let _t = this
        utils.bus.$emit('editor/add/node', _t.info)
      }
    }
  }
</script>

<style scoped lang="scss">
  .node-element {
    display: inline-block;
    margin: 2px;
    border: 1px solid transparent;
    vertical-align: top;

    &:hover {
      border-color: rgba(0, 0, 0, .1);
      cursor: move;
    }
    .content {
      display: inline-block;
      width: 100%;
      height: 100%;

      .icon {
        left: 1px;
        top: 1px;
        width: 32px;
        height: 30px;
        display: block;
        position: relative;
        overflow: hidden;
        margin: 0 auto;
        pointer-events: none;
      }
      .txt{
        display: block;
        text-align: center;
      }
    }
  }
</style>
