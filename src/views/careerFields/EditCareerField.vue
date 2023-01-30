<template>
  <form @submit.prevent="handleUpdate">
    <h4>Create Career Field</h4>
    <input
      type="text"
      required
      placeholder="Career field title"
      v-model="title"
    />
    <textarea
      required
      placeholder="Career field description..."
      v-model="description"
    ></textarea>
    <label>Upload image</label>
    <input type="file" @change="handleChange" />
    <div class="error">{{ fileError }}</div>
    <div class="error"></div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Saving...</button>
  </form>
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
import EditCareerFieldWrapperVue from './EditCareerFieldWrapper.vue';

export default {
  props: ["id", "title", "description"],
  setup(props) {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection("careerFields");
    const { user } = getUser();
    const router = useRouter();

    const route = useRoute();
  // const { document: careerField } = getDocument(
  //     "careerFields",
  //     route.params.id
  //   );

    console.log(props)
    
    // watch(careerField, (value) => console.log(value))

const { updateDoc } = useDocument("careerFields", route.params.id);
    
    const title = ref(props.title);
    const description = ref(props.description);
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);
    
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

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(file.value);
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          imageUrl: url.value,
          filePath: filePath.value,
          jobs: [],
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          router.push({ name: "CareerFieldDetails", params: { id: res.id } });
        }
      }
    };

    //allowed file types
    const types = ["image/png", "image/jpeg"];

    const handleChange = (e) => {
      const selected = e.target.files[0];
      console.log(selected);

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpg)";
      }
    };

    return {
      title,
      description,
      handleSubmit,
      handleChange,
      fileError,
      isPending,
      handleUpdate
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