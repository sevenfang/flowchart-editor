<template>
  <div id="app">
    <FlowchartEditor :flowChart="flowChart"></FlowchartEditor>
  </div>
</template>

<script>
import FlowchartEditor from '@/components/FlowchartEditor/Index'

export default {
  name: 'app',
  components: {
    FlowchartEditor
  },
  data(){
  	return {
  		flowChart: {}
  	}
  }
}
</script>

<style>

</style>
