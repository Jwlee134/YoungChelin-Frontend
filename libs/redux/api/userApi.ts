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
        url: "register/verify-email",
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
    }),

    findId: build.mutation<string, EmailDto>({
      query: (body) => ({
        url: "/login/find-id",
        method: "POST",
        body,
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

    getMe: build.query<ProfileDto | null, void>({
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
              { type: "EvaluationHistory", id: "LIST" },
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
    }),

    deleteAccount: build.mutation<void, void>({
      query: () => ({
        url: "/mypage/withdraw",
        method: "POST",
      }),
    }),
  }),
});
