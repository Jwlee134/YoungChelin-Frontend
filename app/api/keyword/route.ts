import axios from "axios";

export interface Document {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
  n: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const rect = searchParams.get("rect");

  const { documents } = await axios
    .get<{ documents: Document[] }>(
      `https://dapi.kakao.com/v2/local/search/keyword.json`,
      {
        headers: { Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}` },
        params: {
          query,
          rect,
          category_group_code: "FD6",
        },
      }
    )
    .then((res) => res.data);

  return Response.json(
    documents.map((document, i) => ({ ...document, n: i + 1 }))
  );
}
