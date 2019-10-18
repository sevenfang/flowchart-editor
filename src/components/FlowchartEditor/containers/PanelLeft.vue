<!--
 * @description     左侧面板
 *
 * @author          重阳
 * @create          2019-10-16 11:00
-->

<template>
  <CardBox class="panel-left" placement="left" position="right" :width="250" @expand="toggleHandler">
    <CardItem :title="$t('flowchart.L10100')" :enableFold="true" :bold="true">
      <NodeElement
        v-for="(item, index) in materials.filter(target => target.enable)"
        :key="index"
        :title="item.label"
        :info="item"
      >
      </NodeElement>
    </CardItem>
    <CardItem :title="$t('flowchart.L10102')" :enableFold="true" :bold="true" style="position: absolute;bottom:0;left:0;width:100%;">
      <Navigator></Navigator>
    </CardItem>
  </CardBox>
</template>

<script>
  import config from '../config/index'

  import CardBox from '../components/CardBox'
  import CardItem from '../components/CardItem'
  import NodeElement from '../components/NodeElement'
  import Navigator from '../components/Navigator'
import utils from '../global/utils'
  export default {
    name: 'PanelLeft',
    components: {
      CardBox,
      CardItem,
      Navigator,
      NodeElement
    },
    data () {
      return {
        materials: config.materials || []
      }
    },
    methods: {
      toggleHandler (data) {
        // let _t = this
        utils.bus.$emit('editor/panel/toggle', data)
      }
    }
  }
</script>
<style scoped lang="scss">
  .panel-left {
    .card-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
    }
  }
</style>