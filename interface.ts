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
  user: string,
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
