import { api } from ".";

export const evaluateApi = api.injectEndpoints({
  endpoints: (build) => ({
    postRestaurant: build.mutation<void, RestaurantDto>({
      query: (body) => ({
        url: "/evaluate/find-restaurant",
        method: "POST",
        body,
      }),
    }),

    getDishes: build.query<MenuResponseDto[], string>({
      query: (restaurantId) => ({
        url: `/evaluate/menu?restaurantId=${restaurantId}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({
                type: "Dish" as const,
                id: item.menuId,
              })),
              { type: "Dish", id: "LIST" },
            ]
          : [{ type: "Dish", id: "LIST" }],
    }),

    /**
     * FormData key 목록
     * @param file - File
     * @param menuName - string
     */
    postMenu: build.mutation<
      MenuResponseDto,
      { body: FormData; restaurantId: string }
    >({
      query: ({ body, restaurantId }) => ({
        url: `/evaluate/menu/add-menu?restaurantId=${restaurantId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Dish", id: "LIST" }],
    }),

    /**
     * FormData key 목록
     * @param menuId - number
     * @param restaurantId - string
     * @param resultDto - ResultDto
     * @param file - File
     */
    postEvaluation: build.mutation<void, FormData>({
      query: (body) => ({
        url: `/evaluate/menu/survey`,
        method: "POST",
        body,
      }),
    }),
  }),
});
