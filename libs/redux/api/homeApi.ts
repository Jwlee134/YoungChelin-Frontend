import { api } from ".";
import queryString from "query-string";

export const homeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getHome: build.query<
      RestaurantEvaluateDto[],
      { id?: number; size?: number }
    >({
      query: ({ id = 0, size = 20 }) => ({
        url: `/home?id=${id}&size=${size}`,
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

    getByKeyword: build.query<
      RestaurantEvaluateDto[],
      { id?: number; size?: number; keyword: string }
    >({
      query: (data) => ({
        url: `/home/search?${queryString.stringify(data)}`,
      }),
    }),

    getByFilter: build.query<
      RestaurantEvaluateDto[],
      { id?: number; size?: number; qs: string }
    >({
      query: ({ id, size, qs }) => ({
        url: `/home/search/filter?${qs}${queryString.stringify({ id, size })}`,
      }),
    }),
  }),
});
