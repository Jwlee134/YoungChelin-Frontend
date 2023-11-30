interface ChangePwDto {
  currentPw: string;
  changepw: string;
}

interface EmailDto {
  email: string;
}

interface ResultDto {
  flavor: string;
  cleanliness: string;
  service: string;
  price: string;
  plating: string;
  mood: string[];
}

interface EvaluateDto {
  restaurantId: string;
  taste: string;
  mood: string[];
  price: string;
  cleaning: string;
  plating: string;
  service: string;
}

interface JwtDto {
  token: string;
}

interface RestaurantDto {
  place_name: string;
  restaurantId: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface LoginDto {
  userName: string;
  password: string;
}

interface MenuDto {
  menuId: number;
  menuName: string;
}

interface MenuResponseDto extends MenuDto {
  url: string;
}

interface RecommendDto extends MenuResponseDto {
  userName: string;
  restaurantId: string;
  evaluate: ResultDto;
}

interface RecommendationResponseDto {
  recommend: RecommendDto[];
  hotMenu: RecommendDto[];
  steadyMenu: RecommendDto[];
}

interface RegisterDto extends EmailDto, LoginDto {}

type RecommendDtoWithoutUsername = Omit<RecommendDto, "userName">;

interface RestaurantEvaluateDto extends RecommendDtoWithoutUsername {
  id: string;
  last: boolean;
}

interface TopTenDto extends RecommendDtoWithoutUsername {
  rank: string;
}

interface Statistics {
  avg: number;
  url: string;
}

interface DetailDto {
  menuId: number;
  restaurantId: string;
  resultDto: ResultDto;
  statistics: Statistics[];
}

interface ProfileDto {
  userName: string;
  url: string;
}
