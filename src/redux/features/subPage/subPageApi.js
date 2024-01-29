import { api } from "../../api/apiSlice";

const subPageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    spInitialize: builder.mutation({
      query: ({ data }) => ({
        url: `/sp/initialize`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sp"],
    }),

    toggleSp: builder.mutation({
      query: ({ data, id }) => ({
        url: `/sp/toggle/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["sp"],
    }),

    deleteSp: builder.mutation({
      query: ({ data, id }) => ({
        url: `/sp/${id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["sp"],
    }),

    getSp: builder.query({
      query: (id) => `/sp/${id}`,
      providesTags: ["sp"],
    }),

    getAllSp: builder.query({
      query: () => `/sp`,
      providesTags: ["sp"],
    }),
  }),
});

export const {
  useToggleSpMutation,
  useSpInitializeMutation,
  useDeleteSpMutation,
  useGetSpQuery,
  useGetAllSpQuery,
} = subPageApi;
