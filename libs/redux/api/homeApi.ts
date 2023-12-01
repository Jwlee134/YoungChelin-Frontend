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
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getByKeyword: build.query<
      RestaurantEvaluateDto[],
      { id?: number; size?: number; qs: string }
    >({
      query: ({ id = 0, size = 20, qs }) => ({
        url: `/home/search?${qs}&${queryString.stringify({ id, size })}`,
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
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),

    getByFilter: build.query<
      RestaurantEvaluateDto[],
      { id?: number; size?: number; qs: string }
    >({
      query: ({ id = 0, size = 20, qs }) => ({
        url: `/home/search/filter?${qs}&${queryString.stringify({ id, size })}`,
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
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});
