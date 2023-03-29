import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {ShimmerThumbnail} from "react-shimmer-effects";

export default function Layout(items){
    const visibleRef = React.useRef()
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(true);
    const {id} = useParams();
    

    const showElement = () => {
        setVisible(true);
        setVisible2(false)
    }

    const hideElement = () => {
        setVisible(false);
        setVisible2(true)
    }

    const LongText = ({content,limit}) => {
        const [showAll, setShowAll] = useState(false);

        const showMore = () => setShowAll(true);
        const showLess = () => setShowAll(false);

        const isvisible = false
        if (content.length <= limit) {
            // there is nothing more to show
            return <div>{content}</div>
        }
        if (showAll) {
            // We show the extended text and a link to reduce it
            return <div> 
            {content} 
            <button onClick={showLess} className="lessbtn"> Read less</button> 
            </div>
        }
        // In the final case, we show a text with ellipsis and a `Read more` button
        const toShow = content.substring(0, limit) + " ...";
        return <div> 
            {toShow} 
            <button onClick={showMore} className="morebtn"></button>
        </div>
    }
   
    return(
        <div className="main_root">
            
            <div className="card_layout">
                
                <div className="card">
                
                    <div className="contents">

                    
                    
                        <div className="imageContainer" onClick={()=>items.mytoggle(items.title,items.logo,items.bgimage,items.episodeCount,items.rating,items.isvisible,items.cast,items.des,items.id,items.seasons,items.episode,items.pic)}>
        
                            <div className="imageLogo" onMouseEnter={showElement} onMouseLeave={hideElement}>
                            <img className="logoimg" src={items.logo}></img>
                            
                            {/* <img className="myimg" src={items.bgimage}></img> */}
                             {items.bgimage ? <img className="myimg" src={items.bgimage}></img>: <ShimmerThumbnail height={250} rounded />}

                               
                            </div>
                            <div className="Image">
                               
                            </div>
                        </div>
                       
                        {visible && <div className="aboutInfo">
                        <div className="heading">
                                <h2>{items.title}</h2>
                                <h4>{items.lang}</h4>
                                <div className="stats">
                                    <h5>Episodes {items.episodeCount}</h5>
                                    <h5>{items.rating}</h5>
                                </div>
                                
                            {/*<p>{items.cast}</p>*/}
                            <p><LongText content={items.des} limit={100}></LongText></p>
                            </div>
                            
                       </div>}
                        
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}