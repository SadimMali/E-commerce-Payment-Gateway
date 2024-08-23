export interface Products {
  id: number;
  category: string;
  subCategory: string;
  description: string;
  img: string;
  name: string;
  subName: string;
  price: number;
  otherImgs: Array<string>;
  style: string;
  colorway: string;
  releaseDate: string;
}

export const PRODUCTS: Array<Products> = [
  {
    id: 1,
    category: "sneaker",
    subCategory: "jordon",
    description:
      "Jordan Brand connected with Parisian fashion house Dior to create history with the Jordan 1 Retro High Dior, now available on store. This is the first time that Jordan has collaborated with a legacy fashion label like Dior, making this release one for the books. This release was limited to only 8,500 pairs, each pair individually numbered.",
    img: "/product/afdior.jpg",
    name: "Jordan 1 Retro High Dior",
    subName: "Dior",
    price: 7257,
    otherImgs: ["/product/afdior1.jpg", "/product/afdior2.jpg"],
    style: "CN8607 002",
    colorway: "WOLF GREY/SAIL-PHOTON DUST-WHITE",
    releaseDate: "04/06/2020",
  },
  {
    id: 2,
    category: "sneaker",
    subCategory: "jordon",
    description:
      "Jordan Brand connected with Parisian fashion house Dior to create history with the Jordan 1 Retro Low Dior, now available on store. This is the first time that Jordan has collaborated with a legacy fashion label like Dior, making this release one for the books. This release was limited to only 4,700 pairs, each pair individually numbered",
    img: "/product/afdiorlow.jpg",
    name: "Jordan 1 Retro Low Dior",
    subName: "Dior",
    price: 5914,
    otherImgs: ["/product/afdiorlow1.jpg", "/product/afdiorlow2.jpg"],
    style: "CN8608 002",
    colorway: "GREY/BLACK-SAIL",
    releaseDate: "04/06/2020",
  },
  {
    id: 3,
    category: "sneaker",
    subCategory: "jordon",
    description:
      "Nike and Jordan Brand are returning back to the Spider-Verse for their second Spider-Man themed Air Jordan 1, with the release of the Air Jordan 1 High OG Spider-Man Across the Spider-Verse.",
    img: "/product/afspid.jpg",
    name: "Jordan 1 Retro High OG",
    subName: "Spider-Man Across the Spider-Verse",
    price: 306,
    otherImgs: ["/product/afspid1.jpg", "/product/afspid2.jpg"],
    style: "DV1748-601",
    colorway: "UNIVERSITY RED/BLACK/WHITE",
    releaseDate: "05/20/2023",
  },

  {
    id: 4,
    category: "sneaker",
    subCategory: "airforce",
    description:
      "Pre-orders for the AF1 opened to select Louis Vuitton clients. And on July 19, nine editions of Louis Vuitton's Air Force 1 released online to the public, each priced between $2,750 and $3,450, with an in-store drop reportedly in the works.",
    img: "/product/afzoom.jpg",
    name: "Louis Vuitton Nike Air Force 1 Low",
    subName: "By Virgil Abloh White Red",
    price: 4077,
    otherImgs: ["/product/afzoom1.jpg", "/product/afzoom2.jpg"],
    style: "LV",
    colorway: "WHITE/RED",
    releaseDate: "07/19/2022",
  },
  {
    id: 5,
    category: "sneaker",
    subCategory: "jordon",
    description:
      "Turn style on its head with this crafted take on the Air Jordan 1 Mid. Its 'inside out'-inspired construction, including unique layering and exposed foam accents, ups the ante on this timeless Jordan Brand silhouette. ",
    img: "/product/airflv.jpg",
    name: "Air Jordon 1 Mid",
    subName: "SE Craft",
    price: 135,
    otherImgs: ["/product/airflv1.jpg", "/product/airflv2.png"],
    style: "DM9652-102",
    colorway: "Sail/Fossil Stone/Celestial Gold/Taupe Haze",
    releaseDate: "04/01/2023",
  },
  {
    id: 6,
    category: "sneaker",
    subCategory: "airforce",
    description:
      "Debuting in 1982 as a basketball must-have, the Air Force 1 came into its own in the '90s. The clean look of the classic white-on-white AF1 was endorsed from the basketball courts to the block and beyond. Finding its rhythm in hip-hop culture, releasing limited collabs and colorways, Air Force 1 became an iconic sneaker around the globe. And with over 2000 iterations of this staple, its impact on fashion, music and sneaker culture can’t be denied.",
    img: "/product/airforcelr.jpg",
    name: "Nike Air Force 1Low Retro",
    subName: "Men's Shoes",
    price: 150,
    otherImgs: ["/product/airforcelr1.jpg", "/product/airforcelr2.jpg"],
    style: "FD7039-100",
    colorway: "White/Gum Yellow/University Gold",
    releaseDate: "",
  },
  {
    id: 7,
    category: "sneaker",
    subCategory: "airforce",
    description:
      "The radiance lives on in the Nike Air Force 1 ’07, the b-ball OG that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and the perfect amount of flash to make you shine.",
    img: "/product/airforcew.jpg",
    name: "Nike Air Force 1'07",
    subName: "Men's Shoes",
    price: 150,
    otherImgs: ["/product/airforcew1.jpg", "/product/airforcew2.jpg"],
    style: "CW2288-111",
    colorway: "White/White",
    releaseDate: "2015",
  },
  {
    id: 8,
    category: "accessories",
    subCategory: "cap",
    description:
      "A classic mid-depth cap with plenty of styling options, this Nike Club Cap comes in smooth cotton twill that has a soft wash for easy comfort from day 1. The precurved bill lends itself to casual styling, and the adjustable back-strap lets you find the right fit.",
    img: "/product/cap.jpg",
    name: "Nike Club",
    subName: "Unstructured Futura Wash Cap",
    price: 26,
    otherImgs: ["/product/cap1.jpg", "/product/cap2.jpg"],
    style: "FB5368-100",
    colorway: "White/Black",
    releaseDate: "",
  },
  {
    id: 9,
    category: "allclothing",
    subCategory: "short",
    description:
      "The Nike Flex Stride Shorts get updated with an all-new woven fabric and enhanced breathability in high-sweat areas. Their soft liner provides secure support where you need it. This product is made with at least 50% recycled polyester fibers.",
    img: "/product/lowshort.jpg",
    name: "Nike Flex Stride",
    subName: `Men's 5" 2-In-1 Running Shorts`,
    price: 55,
    otherImgs: ["/product/lowshort2.jpg", "/product/lowshort3.jpg"],
    style: "CJ5467-010",
    colorway: "Black/Black",
    releaseDate: "",
  },
  {
    id: 10,
    category: "sneaker",
    subCategory: "dunks",
    description:
      "From backboards to skateboards, the influence of the Nike Dunk is undeniable. Although introduced as a basketball shoe in 1985, its flat and grippy soles were perfect for a neglected sports community—skaters. Uncovering a subculture craving creativity as much as function, Dunk released decades of countless colorways that continue to capture the soul of skaters from coast to coast.",
    img: "/product/nblretro.jpg",
    name: "Nike Dunk Low LX",
    subName: "Women's Shoes",
    price: 120,
    otherImgs: ["/product/nblretro2.jpg", "/product/nblretro3.jpg"],
    style: "DV7411-200",
    colorway: "Celestial Gold/Sail/Gold Suede/Wheat Gold",
    releaseDate: "",
  },
  {
    id: 11,
    category: "sneaker",
    subCategory: "dunks",
    description:
      "Fireside style and a whole lotta freshness—this joyful take on the Dunk Low is the perfect match for rosy cheeks, the first floating snowflakes and your favorite winter beverage. Plaid accents bring the warm feels, while cheerful colors put a seasonally appropriate bow on top of the storied basketball look. Don't worry—even if you've been naughty, you're gonna look nice.",
    img: "/product/nblretropre.jpg",
    name: "Nike Dunk Low Retro Premium",
    subName: "Men's Shoes",
    price: 120,
    otherImgs: ["/product/nblretropre1.jpg", "/product/nblretropre2.jpg"],
    style: "DV0827-100",
    colorway: "White/White/University Red/Black",
    releaseDate: "",
  },
  {
    id: 12,
    category: "accessories",
    subCategory: "backpack",
    description:
      "The Nike Utility Speed Backpack keeps your gear close, secure and organized when commuting to and from training sessions. Cushioned straps give you comfort on the go, and the pack opens flat for easy access to must-have items.",
    img: "/product/tbackpack.jpg",
    name: "Nike Utility Speed",
    subName: "Training Backpack (27L)",
    price: 77,
    otherImgs: ["/product/tbackpack1.jpg", "/product/tbackpack2.jpg"],
    style: "CK2668-010",
    colorway: " Black/Black/Enigma Stone",
    releaseDate: "",
  },
  {
    id: 13,
    category: "allclothing",
    subCategory: "tshirt",
    description:
      "Run, spin, lift, stretch—no matter where your workout takes you, we have you covered in the sweat-wicking Primary Tank. It's ultra soft and comfortable, with underarm ventilation to help keep you cool during your reps.",
    img: "/product/short-sleeve.jpg",
    name: "Nike Primary",
    subName: "Men'Dri-FIT Versatile Tank",
    price: 30,
    otherImgs: ["/product/short-sleeve1.jpg", "/product/short-sleeve2.jpg"],
    style: "DV9833-815",
    colorway: "Monarch/Heather",
    releaseDate: "",
  },
  {
    id: 14,
    category: "allclothing",
    subCategory: "short",
    description:
      "The Nike Sportswear Club shorts is made with our everyday cotton fabric and a classic fit for a familiar feel right out of the bag. An embroidered Futura logo on the chest provides a signature Nike look.",
    img: "/product/shorts.jpg",
    name: "Nike Sportswear ",
    subName: "Men's Graphic Shorts",
    price: 30,
    otherImgs: ["/product/shorts1.jpg", "/product/shorts2.jpg"],
    style: "AR4997-591",
    colorway: "Violet Shock",
    releaseDate: "",
  },
  {
    id: 15,
    category: "accessories",
    subCategory: "bottle",
    description:
      "A water bottle made to go with you no matter where your workout takes you. This textured, squeezable bottle fits comfortably in your hand, making hydration a breeze from warm-up to cooldown.",
    img: "/product/SqueezableBottle.jpg",
    name: "Nike Refuel ",
    subName: "Men's Graphic Shorts",
    price: 15,
    otherImgs: [
      "/product/SqueezableBottle1.jpg",
      "/product/SqueezableBottle2.jpg",
    ],
    style: "N1007666-125",
    colorway: "Grey",
    releaseDate: "",
  },
  {
    id: 16,
    category: "accessories",
    subCategory: "sunglass",
    description:
      "Throw back your style without compromising on comfort. With their '90s vibe, the Nike NV07 Sunglasses have a square, streamlined design without giving up on durability and wearability. Between the 4-base flat lens providing a slim profile and the durable hinges, you'll be made in the shade.",
    img: "/product/sunglass.jpg",
    name: "Nike NV07 ",
    subName: "Sunglasses",
    price: 100,
    otherImgs: ["/product/sunglass1.jpg", "/product/sunglass2.jpg"],
    style: "FN0303-010",
    colorway: "Black/Dark Grey/Dark Grey",
    releaseDate: "",
  },
  {
    id: 17,
    category: "sneaker",
    subCategory: "dunks",
    description:
      "From the school-spirited College Colors Program to the vibrant Nike CO.JP collection, Nike Dunks have seen many colorways since the design’s inception in 1985. But with each new colorway, the Dunk’s classic color-blocking has remained in some capacity. Nike put its timeless color-blocking to work with the Nike Dunk Low Retro White Black.",
    img: "/product/panda.jpg",
    name: "Nike Dunk Low Retro",
    subName: "White Black Panda (2021)",
    price: 122,
    otherImgs: ["/product/panda1.jpg", "/product/panda2.jpg"],
    style: "DD1391-100",
    colorway: "White/Black",
    releaseDate: "03/10/2021",
  },

  {
    id: 18,
    category: "sneaker",
    subCategory: "dunks",
    description:
      "ravis Scott teamed up with Nike SB to release his first official skate shoe, the Nike SB Dunk Low Travis Scott (Regular Box), now available on store. This design follows a similar design aesthetic as seen on the Air Force 1 Low Travis Scott Cactus Jack, featuring an array of materials and prints. Unlike previous Travis Scott releases, these were not available on SNKRS and only available at select Nike SB stockists. ",
    img: "/product/travis.jpg",
    name: "Nike SB Dunk Low",
    subName: "Travis Scott (Regular Box)",
    price: 1200,
    otherImgs: ["/product/travis2.jpg", "/product/travis1.jpg"],
    style: "CT5053-001",
    colorway: "Black/Black-Parachute Beige-Petra Brown",
    releaseDate: "02/29/2020",
  },
  {
    id: 19,
    category: "allclothing",
    subCategory: "jacket",
    description:
      "This premium leather jacket is slightly cropped with a snug fit. Satin lining, a snap at the collar and zippers on the sleeves combine modern with moto. Exclusive original graphics are featured on embroidered and rubber patches throughout.",
    img: "/product/womenjack.jpg",
    name: "Jordan x Travis Scott",
    subName: "Women's Jacket",
    price: 600,
    otherImgs: ["/product/womenjack1.jpg", "/product/womenjack.jpg"],
    style: "DX6168-256",
    colorway: "Archaeo Brown/Dark Smoke Grey/Sail",
    releaseDate: "",
  },
];

// Fn to generate random products
export function getRandomProduct(
  products: Array<Products>,
  count: number
): Array<Products> {
  const randomProduct = products.sort(() => 0.5 - Math.random());

  return randomProduct.slice(0, count);
}
