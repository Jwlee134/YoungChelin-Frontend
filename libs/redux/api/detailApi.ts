import { api } from ".";

export const detailApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDetail: build.query<DetailDto, string>({
      query: (menuId) => ({
        url: `/detail/${menuId}`,
      }),
      providesTags: (result, error, id) => [{ type: "Dish", id }],
    }),
  }),
});
