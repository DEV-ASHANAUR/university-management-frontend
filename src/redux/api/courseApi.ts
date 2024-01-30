import { ICourse, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const COURSE_URL = "/courses";

export const courseApi:any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all course
    courses: build.query({
      query: (arg: Record<string, any>) => ({
        url: COURSE_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ICourse[], meta: IMeta) => {
        return {
          courses: response,
          meta,
        };
      },
      providesTags: [tagTypes.course],
    }),
    //add course
    addCourse: build.mutation({
      query: (data) => ({
        url: COURSE_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.course],
    }),
    //get single course
    course: build.query({
      query: (id: string) => ({
        url: `${COURSE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.course],
    }),
    //uddate single course
    updateCourse: build.mutation({
      query: (data) => ({
        url: `${COURSE_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.course],
    }),
    //delete single course by id
    deleteCourse: build.mutation({
      query: (id) => ({
        url: `${COURSE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.course],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useCourseQuery,
  useCoursesQuery,
} = courseApi;
