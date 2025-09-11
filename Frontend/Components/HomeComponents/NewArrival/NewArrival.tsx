import './NewArrival.css'
import SectionHeaders from '../SectionHeaders/SectionHeaders'
import { useRef } from 'react';
import ps4Image from "../../../src/assets/ps5slim.png"
import womanimage from "../../../src/assets/attractivewoman.png"
import perfumeimage from "../../../src/assets/perfume.png"
import speakerimage from "../../../src/assets/speakerimage.png"

const NewArrival = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const details = {
        title:"Featured",
        type:"New Arrival",
        showArrow:false,
        scrollRef:scrollRef,
        showAllBtn:false
    }
  return (
    <div className='new-arrival-container'>
        <SectionHeaders details={details}/>
        <div className="new-arrival-grid">
            <div className="new-arrival-item-1" style={{backgroundImage: `url(${ps4Image})`,
        backgroundSize: "70%",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "center",}}>
                <div> 
                <p className='new-arrival-item-name'>Play Station 5</p>
                <p className='new-arrival-item-description'>Black and White Version of the console now on sale</p>
                <a href="" className='new-arrival-item-link'>Shop Now</a>
                </div>
            </div>
            <div className="new-arrival-item-2" style={{backgroundImage: `url(${womanimage})`,
        backgroundSize: "70%",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "center",}}>
                <div>
                <p className='new-arrival-item-name'>Women's Collection</p>
                <p className='new-arrival-item-description'>Featured Women's collection that gives you another vibe</p>
                <a href="" className='new-arrival-item-link'>Shop Now</a>
                </div>
            </div>
            <div className="new-arrival-item-3" style={{backgroundImage: `url(${speakerimage})`,
        backgroundSize: "70%",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "center",}}>
                <div>
                <p className='new-arrival-item-name'>Electronics</p>
                <p className='new-arrival-item-description'>Speakers, TV and other home appliances</p>
                <a href="" className='new-arrival-item-link'>Shop Now</a>
                </div>
            </div>
            <div className="new-arrival-item-4" style={{backgroundImage: `url(${perfumeimage})`,
        backgroundSize: "70%",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "center",}}>
                <div>
                <p className='new-arrival-item-name'>Perfume</p>
                <p className='new-arrival-item-description'>Intense EUD</p>
                <a href="" className='new-arrival-item-link'>Shop Now</a>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default NewArrival