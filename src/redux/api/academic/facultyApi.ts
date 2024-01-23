import { IAcademicFaculty, IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";

const ACADEMIC_FACULTY_URL = "/academic-faculties";

export const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    academicFaculties: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: ACADEMIC_FACULTY_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAcademicFaculty[], meta: IMeta) => {
        return {
          academicFaculties: response,
          meta,
        };
      },
      providesTags: [tagTypes.academicFaculty],
    }),
    academicFaculty: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${ACADEMIC_FACULTY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.academicFaculty],
    }),
    addAcademicFaculty: build.mutation({
      query: (data) => ({
        url: ACADEMIC_FACULTY_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),
    updateAcademicFaculty: build.mutation({
      query: (data:any) => ({
        url: `${ACADEMIC_FACULTY_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),
    deleteAcademicFaculty: build.mutation({
      query: (id) => ({
        url: `${ACADEMIC_FACULTY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.academicFaculty],
    }),
  }),
});

export const {
  useAddAcademicFacultyMutation,
  useUpdateAcademicFacultyMutation,
  useAcademicFacultiesQuery,
  useAcademicFacultyQuery,
  useDeleteAcademicFacultyMutation,
} = academicFacultyApi;
