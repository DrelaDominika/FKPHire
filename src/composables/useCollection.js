import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {

  const error = ref(null)
  const isPending = ref(false)

  // add a new document
  const addDoc = async (doc) => {
    error.value = null
    isPending.value = true

    try {
      const res = await projectFirestore.collection(collection).add(doc)
      isPending.value = false
      return res
    }
    catch (err) {
      console.log(err.message)
      error.value = 'could not send the message'
      isPending.value = false
    }
  }

  const updateDoc = (id, doc) => {
    return projectFirestore.collection(id).update(doc)
  }

  return { error, addDoc, isPending, updateDoc }

}

export default useCollection