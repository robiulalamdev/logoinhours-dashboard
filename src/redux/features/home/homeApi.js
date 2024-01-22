import { api } from "../../api/apiSlice";

const homeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    toggleLanding: builder.mutation({
      query: ({ data }) => ({
        url: `/landing/toggle`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["landing"],
    }),

    getHome: builder.query({
      query: () => `/landing`,
      providesTags: ["landing"],
    }),
  }),
});

export const { useToggleLandingMutation, useGetHomeQuery } = homeApi;
