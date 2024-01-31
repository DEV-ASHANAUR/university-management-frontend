import { IMeta, ISemesterRegistration } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const BASE_SEMESTER_REGISTRATION_URL = "/semester-registrations";

export const semesterRegistrationApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    semesterRegistrations: build.query({
      query: (arg: Record<string, any>) => ({
        url: BASE_SEMESTER_REGISTRATION_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: ISemesterRegistration[], meta: IMeta) => {
        return {
          semesterRegistrations: response,
          meta,
        };
      },
      providesTags: [tagTypes.semesterRegistration],
    }),
    //addSemesterRegistrations
    addSemesterRegistrations: build.mutation({
      query: (data) => ({
        url: BASE_SEMESTER_REGISTRATION_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.semesterRegistration],
    }),
    //get single course
    semesterRegistration: build.query({
      query: (id: string) => ({
        url: `${BASE_SEMESTER_REGISTRATION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.semesterRegistration],
    }),
    //uddate single course
    updateSemesterRegistrations: build.mutation({
      query: (data) => ({
        url: `${BASE_SEMESTER_REGISTRATION_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.semesterRegistration],
    }),
    //delete single course by id
    deleteSemesterRegistrations: build.mutation({
      query: (id) => ({
        url: `${BASE_SEMESTER_REGISTRATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.semesterRegistration],
    }),
  }),
});

export const {
  useSemesterRegistrationQuery,
  useSemesterRegistrationsQuery,
  useAddSemesterRegistrationsMutation,
  useDeleteSemesterRegistrationsMutation,
  useUpdateSemesterRegistrationsMutation,
} = semesterRegistrationApi;
