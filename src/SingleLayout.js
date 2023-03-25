import Layout from "./DataLayout";

export default function SingleLay(items){
    return(
        <div className="OverallLayout">
           
           
            <div className="BoxStructure">
                
                <div className="UpperPosSingleLayout">


                    <div className="seasons">   
                            <br></br> 
                            <h1>Seasons</h1>             
                            {items.seasons[0].at(0)}
                            <br></br><br></br>
                            {items.seasons[0].at(1)}
                            <br></br><br></br>
                            {items.seasons[0].at(2)}
                            <br></br><br></br>
                            {items.seasons[0].at(3)}
                            <br></br><br></br>
                            {items.seasons[0].at(4)}
                            <br></br><br></br>
                            {items.seasons[0].at(5)}
                    </div>
                    <div>
                    
                    <div className="serieshead">
                   
                        <img className="mainimg" src={items.myimage}></img>
                        {/* <img className="submainimg" src={items.logo}></img> */}
                    </div>
                    <div className="seriesdata">
                        <h1>{items.mytitle}</h1>
                        <h3>Episodes - {items.ep}</h3>
                        <p>{items.rating}</p>
                        <p>{items.des}</p>
                        <p>{items.id}</p>
                     
                        <p>{items.cast.map(kkk=>kkk=kkk.split(","))}</p>
                       
                    </div>
                    
                    

                    
                    <div className="parentobj">
                        

                            <div className="objects">
                                <img src={items.pic[0]}></img>
                                <div className="episodedata">
                                    <h2>{items.episode[0]}</h2>
                                    <p>{items.myep}</p>
                                    <p>{items.epdes}</p>
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[1]}></img>
                                <div className="episodedata">
                                    {items.episode[1]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[2]}></img>
                                <div className="episodedata">
                                    {items.episode[2]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[3]}></img>
                                <div className="episodedata">
                                    {items.episode[3]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[4]}></img>
                                <div className="episodedata">
                                    {items.episode[4]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[5]}></img>
                                <div className="episodedata">
                                    {items.episode[5]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[6]}></img>
                                <div className="episodedata">
                                    {items.episode[6]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[7]}></img>
                                <div className="episodedata">
                                    {items.episode[7]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[8]}></img>
                                <div className="episodedata">
                                    {items.episode[8]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[9]}></img>
                                <div className="episodedata">
                                    {items.episode[9]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[10]}></img>
                                <div className="episodedata">
                                    {items.episode[10]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[11]}></img>
                                <div className="episodedata">
                                    {items.episode[11]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[12]}></img>
                                <div className="episodedata">
                                    {items.episode[12]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[13]}></img>
                                <div className="episodedata">
                                    {items.episode[13]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[14]}></img>
                                <div className="episodedata">
                                    {items.episode[14]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[15]}></img>
                                <div className="episodedata">
                                    {items.episode[15]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[16]}></img>
                                <div className="episodedata">
                                    {items.episode[16]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[17]}></img>
                                <div className="episodedata">
                                    {items.episode[17]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[18]}></img>
                                <div className="episodedata">
                                    {items.episode[18]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[19]}></img>
                                <div className="episodedata">
                                    {items.episode[19]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[20]}></img>
                                <div className="episodedata">
                                    {items.episode[20]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[21]}></img>
                                <div className="episodedata">
                                    {items.episode[21]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[22]}></img>
                                <div className="episodedata">
                                    {items.episode[22]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[23]}></img>
                                <div className="episodedata">
                                    {items.episode[23]}
                                </div>
                                
                            </div>
                            <div className="objects">
                                <img src={items.pic[24]}></img>
                                <div className="episodedata">
                                    {items.episode[24]}
                                </div>
                                
                            </div>

                            
                            
                                
                            </div>
                    </div>

                    

                </div>

                  
                
                
            </div>
            
        </div>
    )
}