import { api } from "../../api/apiSlice";

const pagesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPage: builder.mutation({
      query: ({ data }) => ({
        url: `/pages/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pages"],
    }),

    updatePage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/pages/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["pages"],
    }),

    deletePage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/pages/${id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["pages"],
    }),

    getPages: builder.query({
      query: () => `/pages`,
      providesTags: ["pages"],
    }),

    getPage: builder.query({
      query: ({ id }) => `/pages/${id}`,
      providesTags: ["pages"],
    }),
  }),
});

export const {
  useCreatePageMutation,
  useDeletePageMutation,
  useGetPagesQuery,
  useGetPageQuery,
  useUpdatePageMutation,
} = pagesApi;
