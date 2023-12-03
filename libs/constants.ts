import { EvaluationItems } from "./redux/slices/evaluationSlice";

type EvaluationItemsType = {
  [key in EvaluationItems]: {
    label: string;
    data: {
      [key: string]: {
        id: string;
        description: string;
        src: string;
        pos: { y: number; x: number };
      };
    };
    ids: string[];
  };
};

export const evaluationItems: EvaluationItemsType = {
  [EvaluationItems.FLAVOR]: {
    label: "맛",
    data: {
      3: {
        id: "3",
        description: "매일 먹어도 안 질리는 맛",
        src: "/images/taste4.png",
        pos: { y: 0, x: -80 },
      },
      2: {
        id: "2",
        description: "1주일에 한번은 먹어야 하는 맛",
        src: "/images/taste3.png",
        pos: { y: 80, x: 0 },
      },
      1: {
        id: "1",
        description: "2주 이상 참기 힘든 맛",
        src: "/images/taste2.png",
        pos: { y: 0, x: 80 },
      },
      0: {
        id: "0",
        description: "한달에 한번은 꼭 먹어야 하는 맛",
        src: "/images/taste1.png",
        pos: { y: -80, x: 0 },
      },
    },
    ids: ["3", "2", "1", "0"],
  },
  [EvaluationItems.MOOD]: {
    label: "분위기",
    data: {
      4: {
        id: "4",
        description: "친구랑 오기 좋은",
        src: "/images/mood-friend.png",
        pos: { y: -21.63, x: -66.57 },
      },
      3: {
        id: "3",
        description: "술 먹기 좋은",
        src: "/images/mood-drink.png",
        pos: { y: 56.63, x: -41.09 },
      },
      2: {
        id: "2",
        description: "혼밥하기 좋은",
        src: "/images/mood-alone.png",
        pos: { y: 56.63, x: 41.09 },
      },
      1: {
        id: "1",
        description: "가족끼리 오기 좋은",
        src: "/images/mood-family.png",
        pos: { y: -21.63, x: 66.57 },
      },
      0: {
        id: "0",
        description: "데이트하기 좋은",
        src: "/images/mood-date.png",
        pos: { y: -70, x: 0 },
      },
    },
    ids: ["4", "3", "2", "1", "0"],
  },
  [EvaluationItems.PRICE]: {
    label: "가격",
    data: {
      2: {
        id: "2",
        description: "아주 특별한 날을 위해",
        src: "",
        pos: { y: -70, x: 0 },
      },
      1: {
        id: "1",
        description: "특별한 날",
        src: "",
        pos: { y: 35, x: -60.62 },
      },
      0: {
        id: "0",
        description: "즐거운 식사",
        src: "",
        pos: { y: 35, x: 60.62 },
      },
    },
    ids: ["2", "1", "0"],
  },
  [EvaluationItems.CLEANLINESS]: {
    label: "청결",
    data: {
      2: {
        id: "2",
        description: "파리가 미끄러질 것 같은 청결",
        src: "/images/clean1.png",
        pos: { y: -70, x: 0 },
      },
      1: {
        id: "1",
        description: "세균이 존재하지 않는 것 같은 청결",
        src: "/images/clean2.png",
        pos: { y: 35, x: -60.62 },
      },
      0: {
        id: "0",
        description: "흘려도 3초 안에 주워먹으면 괜찮을 것 같은 청결",
        src: "/images/clean3.png",
        pos: { y: 35, x: 60.62 },
      },
    },
    ids: ["2", "1", "0"],
  },
  [EvaluationItems.PLATING]: {
    label: "플레이팅",
    data: {
      2: {
        id: "2",
        description: "예술",
        src: "/images/plating1.png",
        pos: { y: -70, x: 0 },
      },
      1: {
        id: "1",
        description: "화려",
        src: "/images/plating2.png",
        pos: { y: 35, x: -60.62 },
      },
      0: {
        id: "0",
        description: "깔끔",
        src: "/images/plating3.png",
        pos: { y: 35, x: 60.62 },
      },
    },
    ids: ["2", "1", "0"],
  },
  [EvaluationItems.SERVICE]: {
    label: "서비스",
    data: {
      2: {
        id: "2",
        description: "바로 단골이 되어버리는 친절함",
        src: "/images/service1.png",
        pos: { y: -70, x: 0 },
      },
      1: {
        id: "1",
        description: "다시 가고 싶게 만드는 친절함",
        src: "/images/service2.png",
        pos: { y: 35, x: -60.62 },
      },
      0: {
        id: "0",
        description: "친절함이 느껴짐",
        src: "/images/service3.png",
        pos: { y: 35, x: 60.62 },
      },
    },
    ids: ["2", "1", "0"],
  },
};
