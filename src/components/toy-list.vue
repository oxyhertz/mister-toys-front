<template>
  <transition-group name="list" tag="ul" class="toy-list" >
    <toy-preview @removeToy="removeToy" v-for="toy in toys" :toy="toy" :key="toy._id" ></toy-preview>
  </transition-group>
</template>

<script>
import toyPreview from './toy-preview.vue'
export default {
  props: {
    toys: {
      type: Array,
      required: true,
    },
  },
  components: {
    toyPreview,
},
  methods: {
    removeToy(toyId) {
        console.log('toyId',toyId)
      this.$emit('removeToy', toyId)
    },
  },
}
</script>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>