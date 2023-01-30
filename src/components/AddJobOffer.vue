<template>
  <div class="add-job-offer">
    <button v-if="!showForm" @click="showForm = true">Add Job Offers</button>
    <form v-if="showForm" @submit.prevent="handleSubmit">
      <h4>Add Job Offer</h4>
      <input text="text" placeholder="Job Title" required v-model="title" />
      <textarea
        text="text"
        placeholder="Job Requirements"
        required
        v-model="description"
      ></textarea>
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import useDocument from "../composables/useDocument";
export default {
  props: ["careerField"],
  setup(props) {
    const title = ref("");
    const description = ref("");
    const showForm = ref(false);
    const { updateDoc } = useDocument("careerFields", props.careerField.id);
    const handleSubmit = async () => {
      const newJobOffer = {
        title: title.value,
        description: description.value,
        id: Math.floor(Math.random() * 1000000),
      };
      const res = await updateDoc({
        jobs: [...props.careerField.jobs, newJobOffer],
      });
      title.value = "";
      description.value = "";
    };
    return { title, description, showForm, handleSubmit };
  },
};
</script>

<style>
.add-job-offer {
  text-align: center;
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>