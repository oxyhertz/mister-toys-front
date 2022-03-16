<template>
    <section class="toy-app">
    <toy-filter @setFilter="setFilter" />
    <toy-list @removeToy="removeToy" v-if="toys" :toys="toys"></toy-list>
    </section>
</template>

<script>
import  { toyService } from '../services/toy-service'
import toyList from '../components/toy-list.vue'
import toyFilter from '../components/toy-filter.vue'

export default{
name: 'toy-app',
  data() {
    return {
      
    }
  },
  computed: {
    toys() {
      return this.$store.getters.toys
    },
  },
  created() {},
  methods: {
    setFilter(filterBy) {
       this.$store.dispatch({type: 'filter', filterBy});
    },
    goToEdit() {
      this.$router.push(`/toy/edit`)
    },
    removeToy(toyId) {
      this.$store.dispatch({ type: 'removeToy', id: toyId })
    },
  },
  components: {
      toyList,
      toyFilter
  },
}
</script>
