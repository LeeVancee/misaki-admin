<!--  -->
<template>
  <div>
     <div ref="main" style="width: 100%; height: 400px; margin: 15px 0; border:1px solid #333; box-shadow: 5px 5px 5px #888888;"></div>
  </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts'
import { onMounted, reactive, ref, } from 'vue';
import axios from 'axios'

const main = ref()
const state =reactive({
    xdata:[],
    small:[],
    medium:[],
    large:[]
})
onMounted(()=>{
  init()
})
const init= async ()=>{
    await axios.get('https://c4156a34-94b2-4302-969f-e96f6277625a.bspapp.com/bar').then(res =>{
         state.xdata = res.data.xdata
         state.small = res.data.small
         state.medium = res.data.medium
         state.large = res.data.large
    })
  // 1通过dom初始化echarts 2ref虚拟化dom
  let mychart =echarts.init(main.value)
  // 数据源
  var option = {
      title:{
          text:'SKU销售周报',
          x:'center'
      },
      tooltip:{
          trigger:'item'
      },
      legend:{
          show:true,
          top:'10%'
      },
      xAxis:{
          type:'category',
          data:state.xdata
      },
      yAxis:{

      },
      series:[
          {
              name:'小份',
              type:'bar',
              stack:'销量',
              barWidth:'60%',
              data:state.small

          },{
              name:'中份',
              type:'bar',
              stack:'销量',
              barWidth:'60%',
              data:state.medium

          },{
              name:'大份',
              type:'bar',
              stack:'销量',
              barWidth:'60%',
              data:state.large

          }
      ]

  };

  // 数据源给予
  mychart.setOption(option)
}

</script>
<style lang='scss' scoped>
</style>