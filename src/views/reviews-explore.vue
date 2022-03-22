<template>
  <section v-if="reviews" >
    <h2>All Reviews</h2>
    <article class="review p-2" v-for="review in reviews" :key="review._id">
      <h1>
        by <span class="clr-teal">{{ review.user.username }}</span> about
        <span class="clr-teal">{{ review.toy.name }}</span>
      </h1>
      <p>{{ review.content }}</p>
    </article>
  </section>
</template>

<script>
export default {
  name: 'reviews-explore',
  data() {
    return {
      reviews: null,
    }
  },
  async created() {
    this.reviews = await this.$store.dispatch({ type: 'getReviews' })
  },
}
</script>

<style></style>
