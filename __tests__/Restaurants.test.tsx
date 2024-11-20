import RestaurantCatalog from "@/components/RestaurantCatalog";
import { render, screen, waitFor } from "@testing-library/react";

const mockResult = {
  "success": true,
  "count": 2,
  "pagination": {},
  data: [
    {
      "_id": "673ce99d55175c52d5a7d506",
      "name": "MK Restaurant",
      "foodtype": "Thai Suki (Hotpot)",
      "address": "CentralWorld, 4 Ratchadamri Rd, Pathum Wan, Bangkok",
      "province": "Bangkok",
      "postalcode": "10330",
      "tel": "+66 2 255 6365",
      "picture": "https://drive.google.com/uc?id=1Vsq3yGo0TbJtNnD-Q-GmIKEPhi774W_O",
      "__v": 0,
      "id": "673ce99d55175c52d5a7d506"
    },
    {
      "_id": "673cf32b55175c52d5a7d525",
      "name": "Bar B Q Plaza",
      "foodtype": "Thai Barbecue",
      "address": "Siam Square One, 388 Rama I Rd, Pathum Wan, Bangkok",
      "province": "Bangkok",
      "postalcode": "10330",
      "tel": "+66 2 252 9705",
      "picture": "https://drive.google.com/uc?id=1Vsq3yGo0TbJtNnD-Q-GmIKEPhi774W_O",
      "__v": 0,
      "id": "673cf32b55175c52d5a7d525"
    },
  ]
}

describe('RestaurantCatalog', () => {
  it('should have correct number of restaurant images', async () => {
    const restaurantCatalog = await RestaurantCatalog({ restaurantJson: Promise.resolve(mockResult) })
    render(restaurantCatalog)

    await waitFor(
      () => {
        const restaurantImages = screen.queryAllByRole('img')
        expect(restaurantImages.length).toBe(2)
      }
    )
  })
})
