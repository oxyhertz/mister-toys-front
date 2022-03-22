<template>
  <li class="toy-preview" :key="toy._id">
    <custom-card>
      <template #header>
       <h3>{{toy.name}}</h3>
      </template>
       <p>{{toy.price}}</p>
       <p>{{isOnStock}}</p>
       <p>{{toy._id}}</p>

      <template #footer>
        <div class="btn-group">
          <button @click="goToEdit" class="btn btn-primary">edit</button>
          <button @click="goToDetail" class="btn btn-info">details</button>
          <button @click="removeToy(toy._id)" class="btn btn-danger">delete</button>
        </div>
      </template>
    </custom-card>
  </li>
</template>

<script>
import customCard from './custom-card.vue'

export default {
  name: 'toy-preview',
  props: {
    toy: Object,
  },
  components: {
    customCard,
  },
  methods: {
    goToDetail() {
      this.$router.push(`/toy/${this.toy._id}`)
    },
    goToEdit() {
      this.$router.push(`/toy/edit/${this.toy._id}`)
    },
    removeToy(toyId) {
      this.$emit('removeToy', toyId)
    },
  },
  computed:{
      isOnStock(){
          return this.toy.inStock ? 'IN STOCK' : 'OUT OF STOCK'
      }
  }
}
</script>
