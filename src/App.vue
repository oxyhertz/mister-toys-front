<template>
  <section class="app-container">
    <app-header />
    <router-view />
    <app-footer />
    <!-- <userMsg v-if="msg"></userMsg> -->
  </section>
</template>

<script>
import appHeader from './components/app-header.vue'
import appFooter from './components/app-footer.vue'
export default {
  name: 'app',
  created() {
    this.$store.dispatch({ type: 'loadToys' })
  },
  methods: {
    clicked() {
      alert('I got clicked!')
    },
  },
  computed:{
    // msg(){
    //  return this.$store.getters.userMsg
    // }
  },
  components: {
    appHeader,
    appFooter
  },
}
</script>
