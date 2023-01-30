<template>
  <form @submit.prevent="handleUpdate">
    <h4>Edit Career Field</h4>
    <input
      type="text"
      required
      placeholder="Edit field title"
      v-model="title"
    />
    <!-- <textarea
      required
      placeholder="Edit field description..."
      v-model="description"
    ></textarea> -->
    <label>Edit image</label>
    <!-- <input type="file" @change="handleChange" />
    <div class="error">{{ fileError }}</div>
    <div class="error"></div> -->
    <!-- <button v-if="!isPending">Update</button>
    <button v-else disabled>Saving...</button> -->
  </form>
</template>

<script>
import getDocument from "@/composables/getDocument";
import useDocument from "@/composables/useDocument";
import { useRoute } from "vue-router";
import { ref } from "@vue/reactivity";

export default {
  props: ["id"],
setup(props) {
  
const route = useRoute();
  const { error, document: careerField } = getDocument(
      "careerFields",
      route.params.id
    );

const { updateDoc } = useDocument("careerFields", route.params.id);
const title = ref("");
const description = ref(careerField.description);
const file = ref(careerField.file);

const handleUpdate = async () => {
      isPending.value = true
      if (file.value) {
        await uploadImage(file.value)
      }

      const res = await updateDoc(props.id,{
          title: title.value,
          description: description.value,
          //imageUrl: url.value,
          // filePath: filePath.value,
          // createdAt: timestamp()
      })

      // await updateDoc({
      //   item: [ ...props.careerFields.id, res ]
      // })
 
      isPending.value = false
      if (!error.value) {
 
        await router.push({ name: "CareerFieldDetails" })
      }
    }
    return { handleUpdate };
}
}
  
</script>
