import { IMeta, IRoom } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const ROOM_URL = "/rooms";

export const roomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    //get all room
    rooms: build.query({
      query: (arg: Record<string, any>) => ({
        url: ROOM_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IRoom[], meta: IMeta) => {
        return {
          rooms: response,
          meta,
        };
      },
      providesTags: [tagTypes.room],
    }),
    //add room
    addRoom: build.mutation({
      query: (data) => ({
        url: ROOM_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.room],
    }),
    //get single room
    room: build.query({
      query: (id: string) => ({
        url: `${ROOM_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.room],
    }),
    //uddate single room
    updateRoom: build.mutation({
      query: (data) => ({
        url: `${ROOM_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.room],
    }),
    //delete single room by id
    deleteRoom: build.mutation({
      query: (id) => ({
        url: `${ROOM_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.room],
    }),
  }),
});

export const {
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
  useRoomQuery,
  useRoomsQuery,
} = roomApi;
