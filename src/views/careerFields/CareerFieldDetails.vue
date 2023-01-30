<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="careerField" class="career-field-details">
    <div class="career-field-info">
      <div class="image">
        <img :src="careerField.imageUrl" />
      </div>
      <h2>{{ careerField.title }}</h2>
      <p class="username">Created by {{ careerField.userName }}</p>
      <p class="description">{{ careerField.description }}</p>
      <div class="icons">
        <span v-if="ownership" class="material-icons"> edit </span>
        <span v-if="ownership" @click="handleDelete" class="material-icons"> delete </span>
      </div>
    </div>

    <div class="job-list">
      <div v-if="!careerField.jobs.length">
        No jobs have been added to this career field yet.
      </div>
      <div v-for="job in careerField.jobs" :key="job.id" class="single-job">
        <div class="details">
          <h3>{{ job.title }}</h3>
          <p>{{ job.description }}</p>
        </div>
        <div class="icons-job">
        <span v-if="ownership" class="material-icons"> edit </span>
        <span v-if="ownership" @click="handleClick(job.id)" class="material-icons"> delete </span>
      </div>
      </div>
      <AddJobOffer :careerField="careerField" v-if="ownership" />
    </div>
  </div>
</template>

<script>
import AddJobOffer from "@/components/AddJobOffer.vue";
import useStorage from "@/composables/useStorage";
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import { computed } from "vue";
import { useRouter } from "vue-router";
export default {
  props: ["id"],
  components: { AddJobOffer },
  setup(props) {
    const { error, document: careerField } = getDocument(
      "careerFields",
      props.id
    );
    const { user } = getUser();
    const { deleteDoc, updateDoc } = useDocument("careerFields", props.id);
    const { deleteImage } = useStorage();
    const router = useRouter();
    const ownership = computed(() => {
      return (
        careerField.value &&
        user.value &&
        user.value.uid == careerField.value.userId
      );
    });
    const handleDelete = async () => {
      await deleteDoc();
      await deleteImage(careerField.value.filePath);
      router.push({ name: "Home" });
    };
    const handleClick = async (id) => {
      const jobs = careerField.value.jobs.filter((job) => job.id != id);
      await updateDoc({ jobs });
    };

    return { error, careerField, ownership, handleDelete, handleClick };
  },
};
</script>

<style>
.career-field-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.image {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
}
.image img {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  max-width: 150%;
  max-height: 150%;
}
.career-field-info {
  text-align: center;
}
.career-field-info h2 {
  text-transform: capitalize;
  font-size: 28px;
  margin-top: 20px;
}
.career-field-info p {
  margin-bottom: 20px;
}
.username {
  color: #999;
}
.description {
  text-align: left;
}
.single-job {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
.material-icons {
  font-size: 24px;
  margin-left: 5px;
  cursor: pointer;
}
.material-icons:hover {
  color: #777;
}
.icons-job {
  display: flex;
  align-items: left;
}
</style>