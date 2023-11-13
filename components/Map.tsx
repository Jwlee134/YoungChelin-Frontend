import { Document } from "@/app/api/keyword/route";
import useDebounce from "@/hooks/useDebounce";
import { Input, Listbox, ListboxItem } from "@nextui-org/react";
import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  data: Document[] | null;
  setData: Dispatch<SetStateAction<Document[] | null>>;
  setSelectedId: Dispatch<SetStateAction<string>>;
}

interface MapForm {
  keyword: string;
}

export default function Map({ data, setData, setSelectedId }: MapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const { register, handleSubmit, watch } = useForm<MapForm>();
  const value = watch("keyword");
  const debouncedValue = useDebounce(value);
  const [, setOverlays] = useState<any[]>([]);

  function resetOverlays() {
    setOverlays((overlays) => {
      overlays.forEach((overlay) => {
        overlay.setMap(null);
      });
      return [];
    });
  }

  const getPlaces = useCallback(() => {
    const {
      ha: lLng,
      qa: lLat,
      oa: rLng,
      pa: rLat,
    } = mapRef.current.getBounds();
    axios
      .get<Document[]>(
        `/api/keyword?query=${debouncedValue}&rect=${lLng},${lLat},${rLng},${rLat}`
      )
      .then((res) => {
        // 오버레이 초기화
        resetOverlays();
        // 오버레이 다시 그리기
        res.data.map((item) => {
          const overlay = new window.kakao.maps.CustomOverlay({
            position: new window.kakao.maps.LatLng(item.y, item.x),
            content: `<div style="width: 24px; height: 24px; background-color: rgb(0, 112, 240); display: flex; justify-content: center; align-items: center; border-radius: 9999px; color: white; font-size: 14px;" >${item.n}</div>`,
          });
          overlay.setMap(mapRef.current);
          setOverlays((overlays) => [...overlays, overlay]);
        });
        setData(res.data);
      });
  }, [debouncedValue, setData]);

  function onValid({ keyword }: MapForm) {
    if (!keyword) return;
    getPlaces();
  }

  useEffect(() => {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);
    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(35.836348, 128.752962),
          level: 4,
        };

        const map = new window.kakao.maps.Map(ref.current, options);
        mapRef.current = map;
      });
    };
    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);

    return () => {
      kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
      kakaoMapScript.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !debouncedValue) return;
    getPlaces();
  }, [debouncedValue, getPlaces]);

  useEffect(() => {
    if (!value && data && data.length > 0) {
      setData(null);
      resetOverlays();
    }
  }, [value, data, setData]);

  const emptyContent =
    !value && data === null
      ? "가게 이름을 입력하세요."
      : value && data && !data.length
      ? "일치하는 가게가 없습니다."
      : "";

  return (
    <>
      <div className="grow h-[60vh] rounded-xl" ref={ref} />
      <div className="w-[30%] shrink-0 pl-3">
        <form onSubmit={handleSubmit(onValid)}>
          <Input {...register("keyword")} label="가게 이름" className="mb-3" />
        </form>
        <div className="h-[calc(60vh-68px)] overflow-y-auto">
          <Listbox
            items={data || []}
            aria-label="가게 선택"
            variant="flat"
            selectionMode="single"
            onSelectionChange={(keys) => {
              setSelectedId(Array.from(keys).join(""));
            }}
            emptyContent={<p className="text-sm">{emptyContent}</p>}
          >
            {(item) => (
              <ListboxItem
                key={item.id}
                description={
                  <>
                    <div>지번: {item.address_name}</div>
                    <div>도로명: {item.road_address_name}</div>
                  </>
                }
              >
                <div>
                  {item.n}. {item.place_name}
                </div>
              </ListboxItem>
            )}
          </Listbox>
        </div>
      </div>
    </>
  );
}
