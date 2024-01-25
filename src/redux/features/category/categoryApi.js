import { api } from "../../api/apiSlice";

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: ({ data }) => ({
        url: `/categories/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    deleteCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    getCategories: builder.query({
      query: () => `/categories`,
      providesTags: ["categories"],
    }),

    getCategory: builder.query({
      query: ({ id }) => `/categories/${id}`,
      providesTags: ["categories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
} = categoryApi;
