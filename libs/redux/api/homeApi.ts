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
      /* 하나의 cache key에 계속적으로 여러 데이터를 merge 해야 하므로 key는 getHome */
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.id !== undefined && arg.id !== 0)
          currentCache.push(...newItems);
      },
      /* id가 바뀔때마다 refetch 수행 */
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.id !== previousArg?.id;
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
      /* keyword가 변경될 때마다 데이터는 달라져야 하므로 key는 getByKeyword(keyword) */
      serializeQueryArgs: ({ queryArgs }) => {
        const { qs } = queryArgs;
        return `getByKeyword(${qs})`;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.id !== undefined && arg.id !== 0)
          currentCache.push(...newItems);
      },
      /* 페이지네이션용 id가 바뀔때마다 refetch 수행 */
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.id !== previousArg?.id;
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
      /* filter가 변경될 때마다 데이터는 달라져야 하므로 key는 getByFilter(filter) */
      serializeQueryArgs: ({ queryArgs }) => {
        const { qs } = queryArgs;
        return `getByFilter(${qs})`;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg.id !== undefined && arg.id !== 0)
          currentCache.push(...newItems);
      },
      /* 페이지네이션용 id가 바뀔때마다 refetch 수행 */
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.id !== previousArg?.id;
      },
    }),
  }),
});
