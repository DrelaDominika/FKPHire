<template>
  <div class="user-career-fields">
    <h2>My Career Fields</h2>
    <div v-if="careerFields">
      <ListView :careerFields="careerFields" />
    </div>
    <router-link :to="{ name: 'CreateCareerField' }" class="btn"
      >Create a New Career Field</router-link
    >
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView.vue";
export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { documents: careerFields } = getCollection("careerFields", [
      "userId",
      "==",
      user.value.uid,
    ]);
    return { careerFields };
  },
};
</script>

<style scoped>
h2 {
  padding-bottom: 10px;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--secondary);
}
.btn {
  margin-top: 20px;
}
</style>