import api from './api-config'

export const sendForm = async (formData) => {
  await api.post("/contact", formData)
}