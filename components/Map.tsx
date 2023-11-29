"use client";

import { Document } from "@/app/api/keyword/route";
import useDebounce from "@/hooks/useDebounce";
import { evaluationActions } from "@/libs/redux/slices/evaluationSlice";
import { useDispatch, useSelector } from "@/libs/redux/store";
import { Input, Listbox, ListboxItem, Selection } from "@nextui-org/react";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapForm {
  keyword: string;
}

export default function Map() {
  const { map, keyword, restaurant, data } = useSelector(
    ({ evaluation }) => ({
      map: evaluation.map,
      keyword: evaluation.addressKeyword,
      restaurant: evaluation.restaurant,
      data: evaluation.addressData,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const keywordRef = useRef("");
  const initialDataRef = useRef({
    lat: map.lat,
    lng: map.lng,
    level: map.level,
    keyword,
  });
  const mapRef = useRef<any>(null);
  const { register, handleSubmit, watch, setValue } = useForm<MapForm>();
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
        dispatch(evaluationActions.setAddressData(res.data));
      });
  }, [debouncedValue, dispatch]);

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
          center: new window.kakao.maps.LatLng(
            initialDataRef.current.lat,
            initialDataRef.current.lng
          ),
          level: initialDataRef.current.level,
        };
        const instance = new window.kakao.maps.Map(ref.current, options);
        mapRef.current = instance;
      });
    };
    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
    if (initialDataRef.current.keyword)
      setValue("keyword", initialDataRef.current.keyword);

    return () => {
      kakaoMapScript.removeEventListener("load", onLoadKakaoAPI);
      kakaoMapScript.remove();
      const coords = mapRef.current?.getCenter();
      const level = mapRef.current?.getLevel();
      if (coords?.Ma && coords?.La && level)
        dispatch(
          evaluationActions.setMap({ lat: coords.Ma, lng: coords.La, level })
        );
      dispatch(evaluationActions.setAddressKeyword(keywordRef.current));
    };
  }, [dispatch, setValue]);

  useEffect(() => {
    if (!mapRef.current || !debouncedValue) return;
    keywordRef.current = debouncedValue;
    getPlaces();
  }, [debouncedValue, getPlaces]);

  useEffect(() => {
    if (!value && data && data.length > 0) {
      dispatch(evaluationActions.setAddressData(null));
      resetOverlays();
    }
  }, [value, data, dispatch]);

  function onSelectionChange(keys: Selection) {
    const item = data?.find((item) => item.id === Array.from(keys).join(""))!;
    dispatch(
      evaluationActions.setRestaurant({
        addr: item.road_address_name,
        id: parseInt(item.id, 10),
        name: item.place_name,
        x: parseFloat(item.x),
        y: parseFloat(item.y),
      })
    );
  }

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
            aria-label="레스토랑 목록"
            items={data || []}
            variant="flat"
            selectionMode="single"
            selectedKeys={
              restaurant.id ? new Set([restaurant.id + ""]) : undefined
            }
            onSelectionChange={onSelectionChange}
            emptyContent={<p className="text-sm">{emptyContent}</p>}
          >
            {(item) => (
              <ListboxItem
                aria-label="레스토랑"
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
