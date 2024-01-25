import { api } from "../../api/apiSlice";

const globalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    toggleGlobal: builder.mutation({
      query: ({ data }) => ({
        url: `/global/toggle`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["global"],
    }),

    getGlobal: builder.query({
      query: () => `/global`,
      providesTags: ["global"],
    }),

    createReview: builder.mutation({
      query: ({ data }) => ({
        url: `/reviews/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reviews"],
    }),

    getReviews: builder.query({
      query: () => `/reviews`,
      providesTags: ["reviews"],
    }),
  }),
});

export const {
  useToggleGlobalMutation,
  useGetGlobalQuery,

  // review
  useCreateReviewMutation,
  useGetReviewsQuery,
} = globalApi;
