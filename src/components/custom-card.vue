<template>
  <article class="custom-card flex flex-col gap-1 items-center">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot name="default"></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </article>
</template>

<style scoped>
.custom-card {
  justify-content: space-between;
  background: white;
  padding: 2em;
  border: 1px solid black;
  border-radius: 5px;
  height:350px
}

.custom-card header {
  font-size: 2rem;
}

.custom-card main {
  text-align: center;
  font-size: 1.5em;
}

.custom-card footer {
  font-size: 1rem;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
