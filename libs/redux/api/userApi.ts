import { setToken } from "@/libs/utils";
import { api } from ".";

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
      RestaurantEvaluateDto[],
      { id?: number; size?: number }
    >({
      query: ({ id = 0, size = 20 }) => ({
        url: `/mypage/evaluate-list?id=${id}&size=${size}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({
                type: "EvaluationHistory" as const,
                id: item.id,
              })),
              { type: "EvaluationHistory", id: "LIST" },
            ]
          : [{ type: "EvaluationHistory", id: "LIST" }],
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.id !== undefined && arg.id !== 0)
          currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.id !== previousArg?.id;
      },
    }),

    getTopTen: build.query<TopTenDto[], void>({
      query: () => ({
        url: "/mypage/top10-list",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({
                type: "TopTen" as const,
                id: item.menuId,
              })),
              { type: "TopTen", id: "LIST" },
            ]
          : [{ type: "TopTen", id: "LIST" }],
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
            return arg;
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = dispatch(
          userApi.util.updateQueryData("getTopTen", undefined, (draft) =>
            draft.filter((item) => item.menuId !== arg.menuId)
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
