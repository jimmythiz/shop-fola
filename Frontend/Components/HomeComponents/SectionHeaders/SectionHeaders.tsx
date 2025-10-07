import './SectionHeaders.css'
import { Link } from 'react-router-dom';
import type { RefObject } from "react";


interface User {
  title: string;
  type: string;
  scrollRef: RefObject<HTMLDivElement | null>;
  days? :string;
  hours?: string;
  minutes?:string;
  seconds?:string;
  daystime?:number;
  hourtime?:number;
  minutetime?:number;
  secondstime?:number;
  showTimer?: boolean;
  showArrow?:boolean;
  showAllBtn?:boolean;
}

interface ProfileCardProps {
  details: User;
}

import { FaArrowLeft,FaArrowRight  } from "react-icons/fa";
const SectionHeaders = ({details}:ProfileCardProps) => {
    const scrollLeft = ()=>{
        if (details.scrollRef.current) details.scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
    const scrollRight = ()=>{
        if (details.scrollRef.current) details.scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  return (
    <>
    <div className="section-headers-date">
            <p>{details.title}</p>
        </div>
        <div className="section-headers-date-info">
            <div className="time-section-sales-type">
                <h1>{details.type}</h1>
            </div>
            {details.showTimer && (
            <div className="section-headers-sales-expire">
                <div><p>{details.days}</p><h1>{details.daystime}</h1></div>
                <div className="column">:</div>
                <div><p>{details.hours}</p><h1>{details.hourtime}</h1></div>
                <div className="column">:</div>
                <div><p>{details.minutes}</p><h1>{details.minutetime}</h1></div>
                <div className="column">:</div>
                <div><p>{details.seconds}</p><h1>{details.secondstime}</h1></div>
            </div>
             )}
             {details.showArrow && (
            <div className="section-headers-arrows">
                <span onClick={scrollLeft}><FaArrowLeft /></span>
                <span onClick={scrollRight}><FaArrowRight /></span>
            </div>
            )}
            {details.showAllBtn && (
              <button className='section-headers-view-all'><Link to='/allproducts'>View All</Link></button>
            )}
        </div>
        </>
  )
}

export default SectionHeaders