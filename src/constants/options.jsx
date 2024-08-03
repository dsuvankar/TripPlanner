export const SelectTravelList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler for exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travels in tandem",
    icon: "🥂",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving people",
    icon: "👨‍👩‍👧‍👦",
    people: "3-5",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill seekers",
    icon: "🛳️",
    people: "5-10",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost at all",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan for Location: {location}, for {Days} Days for {people} people with a {budget} budget. Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with place Name, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, , rating, Time to travel each of the location for {Days} with each day plan with best time to visit in JSON format.";
