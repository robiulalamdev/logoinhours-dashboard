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
    updateLandingSectionStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/landing/section-status/${id}`,
        method: "PATCH",
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

export const {
  useToggleLandingMutation,
  useGetHomeQuery,
  useUpdateLandingSectionStatusMutation,
} = homeApi;
