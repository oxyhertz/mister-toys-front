<template>
   <DoughnutChart v-if="data" :chartData="data" />
</template>

<script>
   import { DoughnutChart } from 'vue-chart-3'
   import { Chart, registerables } from 'chart.js'

   Chart.register(...registerables)

   export default {
      props: ['data'],
      components: { DoughnutChart },
       data(){
        return{ }
    },
   }
</script>
