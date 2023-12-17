import * as yup from 'yup'

export const departmentSchema = yup.object().shape({
  title: yup.string().min(2).max(32).required("Title is required!")
})