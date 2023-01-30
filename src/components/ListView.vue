<template>
  <div v-for="careerField in careerFields" :key="careerField.id">
    <router-link
      :to="{ name: 'CareerFieldDetails', params: { id: careerField.id } }"
    >
      <div class="single">
        <div class="thumbnail">
          <img :src="careerField.imageUrl" />
        </div>
        <div class="info">
          <h3>{{ careerField.title }}</h3>
          <p>Added by {{ careerField.userName }}</p>
        </div>
        <div class="job-count">
          <p>{{ careerField.jobs.length }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["careerFields"],
};
</script>

<style scoped>
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background: white;
  margin: 16px 0;
  transition: all ease 0.2s;
}
.single:hover {
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.2s;
}
.thumbnail {
  max-width: 100px;
  max-height: 100px;
  overflow: hidden;
  border-radius: 10px;
}
img {
  max-width: 150%;
  max-height: 150%;
  display: block;
}
.info {
  margin: 0 30px;
}
.job-count {
  margin-left: auto;
}
</style>