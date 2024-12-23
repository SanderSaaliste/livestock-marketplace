import image23 from './assets/image 23.png';
import image24 from './assets/image 24.png';
import image25 from './assets/image 25.png';
import image26 from './assets/image 26.png';
import image27 from './assets/image 27.png';
import image28 from './assets/image 28.png';
import image29 from './assets/image 29.png';
import image30 from './assets/image 30.png';
import image32 from './assets/image 32.png';
import image35 from './assets/image 35.png';
import image36 from './assets/image 36.png';
import image38 from './assets/image 38.png';
import image39 from './assets/image 39.png';
import image40 from './assets/image 40.png';

export const apiHost = 'http://localhost:4000/api';

export const categories = [
  {
    group: 'Livestock',
    options: [
      {
        label: 'Livestock',
        icon: 'https://img.icons8.com/ios/50/cattle-sign.png',
      },
      { label: 'Eggs' },
      { label: 'Cattle' },
      { label: 'Pigs' },
      { label: 'Piglets' },
      { label: 'Poultry' },
      { label: 'Goats' },
      { label: 'Carabaos' },
      { label: 'Sheep' },
      { label: 'Horses' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Vehicles',
    options: [
      { label: 'Vehicles', icon: 'https://img.icons8.com/ios/50/tractor.png' },
      { label: 'Cars' },
      { label: 'Motorcycles and ATVs' },
      { label: 'Trucks' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Services / Jobs',
    options: [
      {
        label: 'Services / Jobs',
        icon: 'https://img.icons8.com/ios/50/work.png',
      },
      { label: 'Mechanic' },
      { label: 'Plumber' },
      { label: 'Farm Hand' },
      { label: 'Electrician' },
      { label: 'Builder' },
      { label: 'Veterinarian' },
    ],
  },
  {
    group: 'Real Estate',
    options: [
      {
        label: 'Real Estate',
        icon: 'https://img.icons8.com/ios/20/real-estate.png',
      },
      { label: 'Land Plots' },
      { label: 'Ranches' },
      { label: 'Vineyards' },
      { label: 'Farmland' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Heavy Equipment',
    options: [
      {
        label: 'Heavy Equipment',
        icon: 'https://img.icons8.com/ios/20/digger.png',
      },
      { label: 'Tractors' },
      { label: 'Harvesters' },
      { label: 'Plows' },
      { label: 'Seeders/Planters' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Aquaculture',
    options: [
      {
        label: 'Aquaculture',
        icon: 'https://img.icons8.com/ios/20/fish-food.png',
      },
      { label: 'Fish' },
      { label: 'Dried Fish' },
      { label: 'Nets (Pukot/Net)' },
      { label: 'Lines (Lambat)' },
      { label: 'Aggregating Devices (Payao)' },
      { label: 'Traps (Bubo/Trap)' },
      { label: 'Spears and Harpoons (Pana/Hasa)' },
      { label: 'Boats (Bangka/Banca)' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Tools',
    options: [
      {
        label: 'Tools',
        icon: 'https://img.icons8.com/dotty/20/maintenance.png',
      },
      { label: 'Hand Tools' },
      { label: 'Power Tools' },
    ],
  },
  {
    group: 'Home & Garden',
    options: [
      {
        label: 'Home & Garden',
        icon: 'https://img.icons8.com/ios/20/house-with-a-garden.png',
      },
      { label: 'Plants' },
      { label: 'Furniture' },
      { label: 'Gardening Tools' },
      { label: 'Cleaning Supplies' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Animal Feed',
    options: [
      {
        label: 'Animal Feed',
        icon: 'https://img.icons8.com/ios/20/pig-food.png',
      },
      { label: 'Hay and Silage' },
      { label: 'Pellets' },
      { label: 'Grains' },
      { label: 'Pig Feed' },
      { label: 'Chicken Feed' },
      { label: 'Cattle Feed' },
      { label: 'Poultry Feed' },
      { label: 'Horse Feed' },
      { label: 'Aquafeeds' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Fertilizers',
    options: [
      {
        label: 'Fertilizers',
        icon: 'https://img.icons8.com/external-wanicon-lineal-wanicon/20/external-fertilizer-farming-and-agriculture-wanicon-lineal-wanicon.png',
      },
      { label: 'Organic Fertilisers' },
      { label: 'Chemical Fertilisers' },
    ],
  },
  {
    group: 'Fruits, Vegetables & Growables',
    options: [
      {
        label: 'Fruits, Vegetables & Growables',
        icon: 'https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/20/external-vegetables-health-vitaliy-gorbachev-lineal-vitaly-gorbachev.png',
      },
      { label: 'Rice' },
      { label: 'Mango' },
      { label: 'Banana' },
      { label: 'Pineapple' },
      { label: 'Corn' },
      { label: 'Sugarcane' },
      { label: 'Coffee' },
      { label: 'Cacao' },
      { label: 'Papaya' },
      { label: 'Coconut' },
      { label: 'Eggplant' },
      { label: 'Tomato' },
      { label: 'Squash' },
      { label: 'Bitter Melon' },
      { label: 'String Beans' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Seeds',
    options: [
      {
        label: 'Seeds',
        icon: 'https://img.icons8.com/ios/20/paper-bag-with-seeds.png',
      },
      { label: 'Rice Seeds' },
      { label: 'Corn Seeds' },
      { label: 'Mung Bean Seeds (Munggo)' },
      { label: 'Coconut Seeds (Niyog)' },
      { label: 'Peanut Seeds' },
      { label: 'Okra Seeds' },
      { label: 'Ampalaya (Bitter Melon) Seeds' },
      { label: 'Tomato Seeds (Kamatis)' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Building Materials',
    options: [
      {
        label: 'Building Materials',
        icon: 'https://img.icons8.com/wired/20/construction-materials.png',
      },
      { label: 'Steel' },
      { label: 'Wood' },
      { label: 'Bamboo' },
      { label: 'Glass' },
      { label: 'Roofing Materials' },
      { label: 'Sand & Gravel' },
      { label: 'Bricks' },
      { label: 'Cement' },
      { label: 'Other' },
    ],
  },
  {
    group: 'Other',
    options: [
      {
        label: 'Other',
        icon: 'https://img.icons8.com/ios/20/connection-status-off.png',
      },
    ],
  },
];

export const groups = [
  { title: 'Livestock', icon: image23 },
  { title: 'Vehicles', icon: image24 },
  { title: 'Services / Jobs', icon: image25 },
  { title: 'Real Estate', icon: image26 },
  { title: 'Heavy Equipment', icon: image27 },
  { title: 'Aquaculture', icon: image28 },
  { title: 'Tools', icon: image29 },
  { title: 'Home & Garden', icon: image30 },
  { title: 'Animal Feed', icon: image40 },
  { title: 'Fertilizers', icon: image32 },
  { title: 'Fruits, Vegetables & Growable', icon: image39 },
  { title: 'Building Materials', icon: image38 },
  { title: 'Seeds', icon: image35 },
  { title: 'Other', icon: image36 },
];
