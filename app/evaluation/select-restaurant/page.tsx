import Map from "@/components/Map";

export default function SelectRestaurant() {
  return (
    <>
      <h1 className="text-xl font-bold mb-4">어느 가게에서 식사를 하셨나요?</h1>
      <p className="text-sm text-gray-500 mb-2">
        ⚠ 현재 지도 영역 내에 존재하는 가게들을 검색합니다.
      </p>
      <div className="flex">
        <Map />
      </div>
    </>
  );
}
