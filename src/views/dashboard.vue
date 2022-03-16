<template>
    <section class="dashboard-container">
        <h2>Dashboard</h2>
        <pricePerTypeChart :data="dataCollectionPrice"/>
        <toysInStockChart :data="dataCollectionStock" />
    </section>
</template>

<script>
import pricePerTypeChart from "../components/price-per-type-chart.vue";
import toysInStockChart from "../components/toys-in-stock-chart.vue"

export default{
    components:{
        pricePerTypeChart,
        toysInStockChart
    },
    created(){
    // this.$store.dispatch({ type: 'loadToys' })
    },
     data(){
        return{
             dataCollectionPrice: null,
             dataCollectionStock: null,

        }
    },
    mounted(){
        this.fillDataPriceChart()
        this.fillDataStockChart()
    },
    computed:{
          labels(){
              return this.$store.getters.labels
          },
          toys() {
            return this.$store.getters.toys
        },
        avgTypePrice(){
              let labels = this.labels
              return labels.map(label => {
                    let filteredToys = this.toys.filter(toys => toys.labels.includes(label))
                    return filteredToys.reduce((acc,toy) => {
                      return  acc = (acc + toy.price) / filteredToys.length
                    },0).toFixed(0)
             })
        },
        inStockTypes(){
            let labels = this.$store.getters.labels
           return labels.filter(label =>{
                return this.toys.some(toy => toy.labels.includes(label) && toy.inStock )
            })
        },
        inventory(){ 
           return  this.inStockTypes.map(label => {
              let typeInStockAmmount = this.toys.reduce((acc,toy) => {
                    if(toy.labels.includes(label)) acc++
                     return acc
                },0)
              return ((typeInStockAmmount*100) / this.toys.length).toFixed(2)
            })
        } 
        
      },
      methods:{
          fillDataPriceChart(){
              this.dataCollectionPrice = {
               labels: this.$store.getters.labels,
               datasets: [
                  {
                     data: this.avgTypePrice,
                     backgroundColor: [
                        '#77CEFF',
                        '#0079AF',
                        '#123E6B',
                        '#97B0C4',
                        '#A5C8ED',
                     ],
                  },
               ],
            }
          },
          fillDataStockChart(){
            this.dataCollectionStock = {
               labels: this.inStockTypes,
               datasets: [
                  {
                     data: this.inventory,
                     backgroundColor: [
                        '#77CEFF',
                        '#0079AF',
                        '#123E6B',
                        '#97B0C4',
                        '#A5C8ED',
                     ],
                  },
               ],
            }

          }
      }
    
}
</script>