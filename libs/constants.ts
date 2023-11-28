import { EvaluationItems } from "@/hooks/useEvaluationStore";

export const evaluationItems = {
  [EvaluationItems.FLAVOR]: {
    label: "맛",
    data: [
      {
        value: 3,
        description: "매일 먹어도 안 질리는 맛",
        src: "/images/taste4.png",
        pos: { y: 0, x: -80 },
      },
      {
        value: 2,
        description: "1주일에 한번은 먹어야 하는 맛",
        src: "/images/taste3.png",
        pos: { y: 80, x: 0 },
      },
      {
        value: 1,
        description: "2주 이상 참기 힘든 맛",
        src: "/images/taste2.png",
        pos: { y: 0, x: 80 },
      },
      {
        value: 0,
        description: "한달에 한번은 꼭 먹어야 하는 맛",
        src: "/images/taste1.png",
        pos: { y: -80, x: 0 },
      },
    ],
  },
  [EvaluationItems.MOOD]: {
    label: "분위기",
    data: [
      {
        value: 4,
        description: "친구랑 오기 좋은",
        src: "/images/mood-friend.png",
        pos: { y: -21.63, x: -66.57 },
      },
      {
        value: 3,
        description: "술 먹기 좋은",
        src: "/images/mood-drink.png",
        pos: { y: 56.63, x: -41.09 },
      },
      {
        value: 2,
        description: "혼밥하기 좋은",
        src: "/images/mood-alone.png",
        pos: { y: 56.63, x: 41.09 },
      },
      {
        value: 1,
        description: "가족끼리 오기 좋은",
        src: "/images/mood-family.png",
        pos: { y: -21.63, x: 66.57 },
      },
      {
        value: 0,
        description: "데이트하기 좋은",
        src: "/images/mood-date.png",
        pos: { y: -70, x: 0 },
      },
    ],
  },
  [EvaluationItems.PRICE]: {
    label: "가격",
    data: [
      { value: 2, description: "", src: "" },
      { value: 1, description: "", src: "" },
      { value: 0, description: "", src: "" },
    ],
  },
  [EvaluationItems.CLEANLINESS]: {
    label: "청결",
    data: [
      {
        value: 2,
        description: "파리가 미끄러질 것 같은 청결",
        src: "/images/clean1.png",
        pos: { y: -70, x: 0 },
      },

      {
        value: 1,
        description: "세균이 존재하지 않는 것 같은 청결",
        src: "/images/clean2.png",
        pos: { y: 35, x: -60.62 },
      },
      {
        value: 0,
        description: "흘려도 3초 안에 주워먹으면 괜찮을 것 같은 청결",
        src: "/images/clean3.png",
        pos: { y: 35, x: 60.62 },
      },
    ],
  },
  [EvaluationItems.PLATING]: {
    label: "플레이팅",
    data: [
      {
        value: 2,
        description: "예술",
        src: "/images/plating1.png",
        pos: { y: -70, x: 0 },
      },
      {
        value: 1,
        description: "화려",
        src: "/images/plating2.png",
        pos: { y: 35, x: -60.62 },
      },
      {
        value: 0,
        description: "깔끔",
        src: "/images/plating3.png",
        pos: { y: 35, x: 60.62 },
      },
    ],
  },
  [EvaluationItems.SERVICE]: {
    label: "서비스",
    data: [
      {
        value: 2,
        description: "바로 단골이 되어버리는 친절함",
        src: "/images/service1.png",
        pos: { y: -70, x: 0 },
      },
      {
        value: 1,
        description: "다시 가고 싶게 만드는 친절함",
        src: "/images/service2.png",
        pos: { y: 35, x: -60.62 },
      },
      {
        value: 0,
        description: "친절함이 느껴짐",
        src: "/images/service3.png",
        pos: { y: 35, x: 60.62 },
      },
    ],
  },
};
