import { IMeta, IStudent } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const STUDENT_URL = "/students";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all student user endpoint
    students: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${STUDENT_URL}`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IStudent[], meta: IMeta) => {
        return {
          students: response,
          meta,
        };
      },
      providesTags: [tagTypes.student],
    }),
    // get single student user endpoint
    student: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${STUDENT_URL}/profile/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.student],
    }),
    // create student user endpoint
    addStudentWithFormData: build.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.student],
    }),
    // update student user endpoint
    updateStudent: build.mutation({
      query: (data) => ({
        url: `${STUDENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.student],
    }),
    // delete student user endpoint
    deleteStudent: build.mutation({
      query: (id) => ({
        url: `${STUDENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.student],
    }),
  }),
});

export const {
  useAddStudentWithFormDataMutation, 
  useStudentsQuery,
  useStudentQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = studentApi;
