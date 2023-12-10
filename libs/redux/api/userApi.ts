import { setToken } from "@/libs/utils";
import { api } from ".";
import { EntityState, createEntityAdapter } from "@reduxjs/toolkit";

export const topTenAdapter = createEntityAdapter<TopTenDto>({
  selectId: (model) => model.rank,
  sortComparer: (a, b) => a.rank.localeCompare(b.rank),
});

export const evaluationHistoryAdapter =
  createEntityAdapter<RestaurantEvaluateDto>();

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<RegisterDto, RegisterDto>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),

    sendEmail: build.mutation<void, EmailDto>({
      query: (body) => ({
        url: "/register/send-email",
        method: "POST",
        body,
      }),
    }),

    verifyEmail: build.mutation<void, EmailDto>({
      query: (body) => ({
        url: "/register/verify-email",
        method: "POST",
        body,
      }),
    }),

    login: build.mutation<JwtDto, LoginDto>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setToken(data.token);
          dispatch(api.util.invalidateTags([{ type: "Profile" }]));
        } catch {}
      },
    }),

    findId: build.mutation<string, EmailDto>({
      query: (body) => ({
        url: "/login/find-id",
        method: "POST",
        body,
        responseHandler: "text",
      }),
    }),

    findPw: build.mutation<void, EmailDto>({
      query: (body) => ({
        url: "/login/find-pw",
        method: "POST",
        body,
      }),
    }),

    getRecommends: build.query<RecommendationResponseDto, void>({
      query: () => ({
        url: "/recommend",
      }),
    }),

    getMe: build.query<ProfileDto, void>({
      query: () => ({
        url: "/me",
      }),
      providesTags: () => [{ type: "Profile" }],
    }),

    changePassword: build.mutation<void, ChangePwDto>({
      query: (body) => ({
        url: "/mypage/change-pw",
        method: "POST",
        body,
      }),
    }),

    /**
     * FormData key 목록
     * @param file - File
     */
    changeProfilePicture: build.mutation<{ file: string }, FormData>({
      query: (body) => ({
        url: "/mypage/profile-upload",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Profile" }],
    }),

    getEvaluationHistory: build.query<
      EntityState<RestaurantEvaluateDto>,
      { id?: number; size?: number }
    >({
      query: ({ id = 0, size = 20 }) => ({
        url: `/mypage/evaluate-list?id=${id}&size=${size}`,
      }),
      providesTags: (result) =>
        result?.entities
          ? [
              ...Object.values(result.entities).map((item) => ({
                type: "EvaluationHistory" as const,
                id: item?.id,
              })),
              { type: "EvaluationHistory", id: "LIST" },
            ]
          : [{ type: "EvaluationHistory", id: "LIST" }],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.id !== undefined && arg.id !== 0)
          evaluationHistoryAdapter.addMany(
            currentCache,
            Object.values(newItems.entities) as RestaurantEvaluateDto[]
          );
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.id !== previousArg?.id;
      },
      transformResponse(response: RestaurantEvaluateDto[]) {
        return evaluationHistoryAdapter.addMany(
          evaluationHistoryAdapter.getInitialState(),
          response
        );
      },
    }),

    getTopTen: build.query<EntityState<TopTenDto>, void>({
      query: () => ({
        url: "/mypage/top10-list",
      }),
      providesTags: (result) =>
        result?.entities
          ? [
              ...Object.values(result.entities).map((item) => ({
                type: "TopTen" as const,
                id: item?.rank,
              })),
              { type: "TopTen", id: "LIST" },
            ]
          : [{ type: "TopTen", id: "LIST" }],
      transformResponse(response: TopTenDto[]) {
        return topTenAdapter.addMany(topTenAdapter.getInitialState(), response);
      },
    }),

    postTopTen: build.mutation<void, TopTenDto[]>({
      query: (body) => ({
        url: "/mypage/top10-list",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "TopTen", id: "LIST" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = dispatch(
          userApi.util.updateQueryData("getTopTen", undefined, (draft) => {
            topTenAdapter.upsertMany(draft, arg);
          })
        );
        queryFulfilled.catch(result.undo);
      },
    }),

    deleteTopTen: build.mutation<void, TopTenDto>({
      query: (body) => ({
        url: "/mypage/delete-top10-list",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "TopTen", id: "LIST" }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = dispatch(
          userApi.util.updateQueryData("getTopTen", undefined, (draft) =>
            topTenAdapter.removeOne(draft, arg.rank)
          )
        );
        queryFulfilled.catch(result.undo);
      },
    }),

    deleteAccount: build.mutation<void, void>({
      query: () => ({
        url: "/mypage/withdraw",
        method: "POST",
      }),
    }),
  }),
});
