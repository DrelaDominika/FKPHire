<template>
<div v-if="careerField">
  <EditCareerField :careerField="careerField"></EditCareerField>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { timestamp } from "@/firebase/config";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import { watch } from '@vue/runtime-core';
import EditCareerField from "@/views/careerFields/EditCareerField.vue"

export default {
components: { EditCareerField },
  setup() {


    const route = useRoute();
  const { document: careerField } = getDocument(
      "careerFields",
      route.params.id
    );

    

    return {
      careerField, EditCareerField
    };
  },
};
</script>

<style>
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>