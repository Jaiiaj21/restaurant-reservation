interface RestaurantItem {
  _id: string,
  name: string,
  address: string,
  foodtype: string,
  province: string,
  postalcode: string,
  tel: string,
  picture: string,
  __v: number,
  id: string
}

interface RestaurantJson {
  success: boolean,
  count: number,
  pagination: Object,
  data: RestaurantItem[]
}

interface ReservationItem {
  _id: string,
  bookingDate: string,
  numOfGuests: number,
  user: {
    _id: string,
    name: string,
    email: string
  },
  restaurant: {
    _id: string,
    name: string,
    address: string,
    tel: string,
    id: string
  } | null
  createdAt: string,
  __v: number
}

interface ReservationJson {
  success: boolean,
  count: number,
  data: ReservationItem[]
}

interface LoginJson {
  success: boolean,
  _id: string,
  name: string,
  email: string,
  token: string
}

interface ProfileJson {
  success: boolean,
  data: {
    _id: string,
    name: string,
    email: string,
    tel: string,
    role: string,
    createdAt: string,
    __v: number
  }
}
