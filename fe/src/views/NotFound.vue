<template>
  <div class="main-content">
    <ElCard
      class="not-found"
    >
      <template #header>
        <h2>Page Not Found</h2>
      </template>
      <ElButton
        type="primary"
        @click="$router.push({ name: 'Home' })"
      >
        Click here to go to the homepage
      </ElButton>
    </ElCard>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
  };
</script>

<style lang="scss" scoped>
.main-content {
  display: flex;
  justify-content: center;
  padding: 1em;
  text-align: center;
}
.not-found {
  display: inline-block;
  width: 900px;
}
</style>
