import { Category } from "./shopSlice";

// Royalty-free images from Pexels CDN
const i = {
  kurti: "https://images.pexels.com/photos/28213774/pexels-photo-28213774.jpeg",
  kurti2:
    "https://images.pexels.com/photos/20702673/pexels-photo-20702673.jpeg",
  kurti3:
    "https://images.pexels.com/photos/27334197/pexels-photo-27334197.jpeg",
  top1: "https://images.pexels.com/photos/33772495/pexels-photo-33772495.jpeg",
  jeans1: "https://images.pexels.com/photos/7752689/pexels-photo-7752689.jpeg",
  jeans2:
    "https://images.pexels.com/photos/33793899/pexels-photo-33793899.jpeg",
  jeans3:
    "https://images.pexels.com/photos/33802858/pexels-photo-33802858.jpeg",
  korean1:
    "https://images.pexels.com/photos/33821752/pexels-photo-33821752.jpeg",
  korean2: "https://images.pexels.com/photos/7124117/pexels-photo-7124117.jpeg",
  korean3:
    "https://images.pexels.com/photos/33807926/pexels-photo-33807926.jpeg",
  gown1: "https://images.pexels.com/photos/8468811/pexels-photo-8468811.jpeg",
  gown2: "https://images.pexels.com/photos/32100313/pexels-photo-32100313.jpeg",
  dress1:
    "https://images.pexels.com/photos/20189472/pexels-photo-20189472.jpeg",
  jacket1:
    "https://images.pexels.com/photos/33820901/pexels-photo-33820901.jpeg",
  jacket2:
    "https://images.pexels.com/photos/16354625/pexels-photo-16354625.jpeg",
  jacket3:
    "https://images.pexels.com/photos/33831276/pexels-photo-33831276.jpeg",
  street1:
    "https://images.pexels.com/photos/13565970/pexels-photo-13565970.jpeg",
  baggy1:
    "https://images.pexels.com/photos/33819729/pexels-photo-33819729.jpeg",
  crop1: "https://images.pexels.com/photos/19330216/pexels-photo-19330216.jpeg",
  skirt1:
    "https://images.pexels.com/photos/33779810/pexels-photo-33779810.jpeg",
  track1: "https://images.pexels.com/photos/6048283/pexels-photo-6048283.jpeg",
  shirt1:
    "https://images.pexels.com/photos/33820023/pexels-photo-33820023.jpeg",
  tee1: "https://images.pexels.com/photos/33827653/pexels-photo-33827653.jpeg",
  fashion1:
    "https://images.pexels.com/photos/33810195/pexels-photo-33810195.jpeg",
  nightsuit2:
    "https://images.pexels.com/photos/7162258/pexels-photo-7162258.jpeg",
  nightsuit3:
    "https://images.pexels.com/photos/6976714/pexels-photo-6976714.jpeg",
  frock2:
    "https://images.pexels.com/photos/12735283/pexels-photo-12735283.jpeg",
};

const setA = [
  i.top1,
  i.kurti,
  i.jeans1,
  i.korean1,
  i.gown1,
  i.dress1,
  i.jacket1,
];
const setB = [
  i.street1,
  i.baggy1,
  i.crop1,
  i.skirt1,
  i.track1,
  i.shirt1,
  i.tee1,
];
const setC = [
  i.kurti,
  i.fashion1,
  i.jeans1,
  i.dress1,
  i.jacket1,
  i.street1,
  i.crop1,
];

export const imagesByCategory: Record<Category, string[]> = {
  top: setA,
  jeans: [
    i.jeans1,
    i.jeans2,
    i.jeans3,
    i.baggy1,
    i.street1,
    i.fashion1,
    i.tee1,
    i.shirt1,
    i.track1,
  ],
  "korean tops": [
    i.korean1,
    i.korean2,
    i.korean3,
    i.top1,
    i.fashion1,
    i.crop1,
    i.skirt1,
    i.dress1,
    i.jacket1,
  ],
  gown: [
    i.gown1,
    i.gown2,
    i.dress1,
    i.top1,
    i.kurti,
    i.fashion1,
    i.skirt1,
    i.shirt1,
  ],
  "night suit": [
    i.nightsuit2,
    i.nightsuit3,
    i.tee1,
    i.crop1,
    i.top1,
    i.dress1,
    i.street1,
    i.track1,
    i.jeans1,
  ],
  kurti: [
    i.kurti,
    i.kurti2,
    i.kurti3,
    i.dress1,
    i.top1,
    i.shirt1,
    i.skirt1,
    i.street1,
    i.fashion1,
  ],
  frock: [
    i.dress1,
    i.frock2,
    i.skirt1,
    i.top1,
    i.fashion1,
    i.tee1,
    i.crop1,
    i.gown1,
  ],
  jackets: [
    i.jacket1,
    i.jacket2,
    i.jacket3,
    i.street1,
    i.top1,
    i.shirt1,
    i.jeans1,
    i.fashion1,
    i.crop1,
  ],
  accessories: [
    i.street1,
    i.tee1,
    i.top1,
    i.skirt1,
    i.crop1,
    i.shirt1,
    i.fashion1,
  ],
  "baggy jeans": [
    i.baggy1,
    i.jeans1,
    i.street1,
    i.tee1,
    i.top1,
    i.crop1,
    i.fashion1,
  ],
  "crop top": [
    i.crop1,
    i.top1,
    i.tee1,
    i.fashion1,
    i.skirt1,
    i.dress1,
    i.street1,
  ],
  skirt: [i.skirt1, i.dress1, i.top1, i.fashion1, i.crop1, i.tee1, i.shirt1],
  "track pants": [
    i.track1,
    i.street1,
    i.tee1,
    i.jeans1,
    i.crop1,
    i.top1,
    i.fashion1,
  ],
  shirts: [i.shirt1, i.top1, i.crop1, i.tee1, i.street1, i.fashion1, i.dress1],
  "t-shirt": [
    i.tee1,
    i.top1,
    i.crop1,
    i.jeans1,
    i.street1,
    i.fashion1,
    i.shirt1,
  ],
};
