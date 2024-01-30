import { IBuilding, IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const BUILDING_URL = "/buildings";

export const buildingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all building
    buildings: build.query({
      query: (arg: Record<string, any>) => ({
        url: BUILDING_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IBuilding[], meta: IMeta) => {
        return {
          buildings: response,
          meta,
        };
      },
      providesTags: [tagTypes.building],
    }),
    //add building
    addBuilding: build.mutation({
      query: (data) => ({
        url: BUILDING_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.building],
    }),
    //get single building
    building: build.query({
      query: (id:string) => ({
        url: `${BUILDING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.building],
    }),
    //uddate single building
    updateBuilding: build.mutation({
      query: (data) => ({
        url: `${BUILDING_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.building],
    }),
    //delete single building by id
    deleteBuilding: build.mutation({
      query: (id:string) => ({
        url: `${BUILDING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.building],
    }),
  }),
});

export const {
  useAddBuildingMutation,
  useUpdateBuildingMutation,
  useBuildingQuery,
  useBuildingsQuery,
  useDeleteBuildingMutation,
} = buildingApi;
