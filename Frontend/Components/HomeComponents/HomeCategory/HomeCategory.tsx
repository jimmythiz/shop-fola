import "./HomeCategory.css"

import { FaMobileAlt, FaLaptop, FaCamera, FaHeadphones, FaGamepad, FaTools,FaLaptopHouse   } from "react-icons/fa";
import { GiRunningShoe,GiFruitBowl,GiLoincloth ,GiClothes   } from "react-icons/gi";
import { IoMdMan,IoMdWoman  } from "react-icons/io";
import { CiSpeaker } from "react-icons/ci";
import { PiBabyBold } from "react-icons/pi";
import { LuWatch } from "react-icons/lu";
import { FaChildren } from "react-icons/fa6";
import { TbPerfume } from "react-icons/tb";
import { useRef } from 'react';
import SectionHeaders from "../SectionHeaders/SectionHeaders";
import {Link} from 'react-router-dom'

import CategoryCard from '../CategoryCard/CategoryCard';

const HomeCategory = () => {
    
    const scrollRef = useRef<HTMLDivElement>(null);
    const details = {
        title:"Categories",
        type:"Browse By Category",
        showArrow:true,
        scrollRef:scrollRef
    }
     const categories = [
  { name: "Phones", icon: FaMobileAlt },
  { name: "Computer", icon: FaLaptop },
  { name: "SmartWatches", icon: LuWatch },
  { name: "Camera", icon: FaCamera },
  { name: "Headphones", icon: FaHeadphones },
  { name: "Gaming", icon: FaGamepad },
  { name: "Clothing", icon: GiClothes  },
  { name: "Electronics", icon: CiSpeaker  },
  { name: "Household", icon: FaLaptopHouse  },
  { name: "Shoes", icon: GiRunningShoe  },
  { name: "Beauty", icon: GiLoincloth  },
  { name: "Perfume", icon: TbPerfume },
  { name: "Women", icon: IoMdWoman  },
  { name: "Men", icon: IoMdMan  },
  { name: "Children", icon: FaChildren },
  { name: "Baby", icon: PiBabyBold },
  { name: "Groceries", icon: GiFruitBowl  },
  { name: "Others", icon: FaTools  },
  
];
  return (
    <div className="home-category-container">
        <SectionHeaders details={details}/>
        <div className="home-category-scroller" ref={scrollRef}>
          {categories.map((category,index)=>(
            <Link to={`/category/${category.name.toLowerCase()}`} key={index}>
              <CategoryCard  category={category}/>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default HomeCategory