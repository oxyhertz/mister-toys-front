<template>
  <section class="about-container"> 
    <GMapMap
      :center="center"
      :zoom="10"
      map-type-id="terrain"
      style="width: 500px; height: 300px"
   >
      <GMapCluster>
         <GMapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center = m.position"
         />
      </GMapCluster>
   </GMapMap>
   <div class="btns-container">
       <el-button @click="setCenter({lat:32.919945,lng:35.290146})">Karmiel</el-button>
       <el-button @click="setCenter({lat:31.771959,lng:35.217018})">Jerusalem</el-button>
       <el-button @click="setCenter({lat:32.109333,lng:34.855499})">Tel-Aviv</el-button>
   </div>
  </section>
</template>

<script>
   export default {
      name: 'about-app',
      data() {
         return {
            center: { lat: 32.088179, lng: 34.790144 },
            markers: [
               {
                  position: {
                     lat: 32.919945,
                     lng: 35.290146,
                  },
               },
               {
                  position: {
                     lat: 31.771959,
                     lng: 35.217018,
                  },
               },
               {
                  position: {
                     lat: 32.109333,
                     lng: 34.855499,
                  },
               },
            ],
         }
      },
      methods:{
          setCenter(coords){
              this.center = coords
          }
      },
   }
</script>

<style>
   .vue-map-container {
      height: 500px;
      width: 100vw;
   }
</style>
vue