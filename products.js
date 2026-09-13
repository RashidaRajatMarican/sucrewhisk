// SUCRE WHISK PRODUCT MANAGEMENT
// Edit this file whenever you want to add products, change prices, descriptions,
// images, or mark an item sold out. Netlify will redeploy automatically after commit.
//
// Categories currently supported: "Gelato", "Granola", "Drinks"
// Image paths should look like: "images/taro.png"
// Set available: false to show SOLD OUT and disable ordering.

window.PRODUCTS = [
  {
    id: 1,
    name: "Taro Gelato",
    category: "Gelato",
    price: 7.50,
    image: "images/taro.png",
    emoji: "🍠",
    description: "Creamy taro gelato with a smooth, delicately sweet flavour.",
    available: true,
    featured: true
  },
  {
    id: 2,
    name: "Pistachio",
    category: "Gelato",
    price: 7.50,
    image: "",
    emoji: "💚",
    description: "Smooth, nutty and small-batch.",
    available: true,
    featured: false
  },
  {
    id: 3,
    name: "Vanilla Bean",
    category: "Gelato",
    price: 7.50,
    image: "",
    emoji: "🍦",
    description: "Classic vanilla with fragrant bean specks.",
    available: true,
    featured: false
  },
  {
    id: 4,
    name: "Dark Chocolate",
    category: "Gelato",
    price: 7.50,
    image: "",
    emoji: "🍫",
    description: "Rich cocoa with a deep chocolate finish.",
    available: true,
    featured: false
  },
  {
    id: 5,
    name: "Original Granola",
    category: "Granola",
    price: 12.00,
    image: "",
    emoji: "🥣",
    description: "Crunchy house granola, lightly sweetened.",
    available: true,
    featured: false
  },
  {
    id: 6,
    name: "Berry Granola",
    category: "Granola",
    price: 14.00,
    image: "",
    emoji: "🫐",
    description: "House granola with berry pieces.",
    available: true,
    featured: false
  },
  {
    id: 7,
    name: "Iced Latte",
    category: "Drinks",
    price: 6.50,
    image: "",
    emoji: "☕",
    description: "Smooth espresso with chilled milk.",
    available: true,
    featured: false
  },
  {
    id: 8,
    name: "Strawberry Milk",
    category: "Drinks",
    price: 6.00,
    image: "",
    emoji: "🥛",
    description: "Fresh strawberry milk, lightly sweet.",
    available: true,
    featured: false
  },
  {
    id: 9,
    name: "Sparkling Peach",
    category: "Drinks",
    price: 5.50,
    image: "",
    emoji: "🍑",
    description: "Refreshing peach sparkling drink.",
    available: true,
    featured: false
  }
];