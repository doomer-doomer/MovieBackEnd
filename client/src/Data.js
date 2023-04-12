import React, { useEffect, useState ,useRef } from "react";
import Layout from './DataLayout';
import datas from "./datas";
import SingleLay from "./SingleLayout";
import season from "./season";
import episodes from "./episodes";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApiKey = "8cd5fdfdbdmsh1e9c0bce5756f43p1d9321jsn04a4bd150890"
const Host = "streaming-availability.p.rapidapi.com"
const Url = "https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=18&page=2&output_language=en&language=en"


const totalUrl = "https://netflix54.p.rapidapi.com/season/episodes/?ids=70123993%2C70145831%2C70190773%2C70242039%2C70281308%2C80039648&offset=0&limit=25&lang=en"
const netflixHost = "netflix54.p.rapidapi.com"

export default function FetchData(props){

    let myrandomImg
    let starttitle
    var [counter,newcounter] = useState(Math.floor(Math.random() * 297 +1))

    const scroll1 = React.useRef()
    const scroll2 = React.useRef()
    const scroll3 = React.useRef()
    const scroll4 = React.useRef()
    const scroll5 = React.useRef()
    const scroll6 = React.useRef()
    const scroll7 = React.useRef()
    const scroll8 = React.useRef()
    const scroll9 = React.useRef()
    const scroll10 = React.useRef()
    const scroll11= React.useRef()
    const scroll12 = React.useRef()
    const scroll13 = React.useRef()
    const scroll14 = React.useRef()
    const scroll15 = React.useRef()

    const [infovisible,setinfovisible] = useState(false);

    const [visbile,setVisible]=useState(false)
    const [visbile2,setVisible2]=useState(true)

    const [singletitle,setsingletitle] = useState("")
    const [singleimg,setsingleimg] = useState("")
    const [singlelogo,setsinglelogo] = useState("")
    const [singlecast,setsinglecast] = useState("")
    const [singleep,setsingleep] = useState("")
    const [singlerating,setsinglerating] = useState("")
    const [singledes,setsingledes] = useState("")
    const [singleid,setsingleid] = useState("")
    const [singleseason,setsingleseason] = useState("")
    const [singleepisode,setsinglepisode] = useState("")
    const [singlepic,setsinglepic] = useState("")
    const [singleepisodedes,setsingleepisodedes] = useState("")
    const [singleepdes,setsingleepdes] = useState("")
    

    function Mytoggle2 (title,logo,img,ep,rating,isvisible,cast,des,id,seasons,episode,pic,myep,epdes){
        setVisible(true)
        setVisible2(false)
        setsingletitle(title)
        setsingleimg(img)
        setsinglelogo(logo)
        setsinglecast(cast)
        setsingleep(ep)
        setsinglerating(rating)
        setsingledes(des)
        setsingleid(id)
        setsingleseason(seasons)
        setsinglepisode(episode)
        setsinglepic(pic)
        setsingleepisodedes(myep)
        setsingleepdes(epdes);
        window.scrollTo(0, 0);
      }


    const [loadimg,newimg] = useState(gen)
    const [title,newTitle] = useState(titletext)
    const [text,newtext] = useState(mytext)
    const [zzseason,newseason] = useState(myseason)
    const [desk,newDesk] = useState(mydesk)
    const [genrez,newGenrez] = useState(mygenre)
    const [ratingz,newRatingz] = useState(myrating)
    const [zoom,unzoom] = useState("")

    const [onemonth,setonemonth] = useState(false)
    const [threemonth,setthreemonth] = useState(false)
    const [yearmonth,setyearmonth] = useState(false)

    const allowances = async event=>{
        try {
            const token = localStorage.getItem('jwt_token');
            if (!token) return;
            const getSubscriberData = await fetch("http://localhost:5000/subscriberAllData",{
                method:"POST",
                headers: { Authorization: `Bearer ${token}`,
                jwt_token: token
            },
            });

            const userData = await getSubscriberData.json();

            if(!getSubscriberData.ok){
                console.log("No Data found")
                return;
            }

            if(userData.subscription_price===199){
                setonemonth(true)
            }else if(userData.subscription_price===399){
                setonemonth(true);
                setthreemonth(true);
            }else if(userData.subscription_price===999){
                setonemonth(true)
                setthreemonth(true)
                setyearmonth(true)
            }else{
                setonemonth(true)
                setthreemonth(true)
                setyearmonth(true)
            }

        } catch (error) {
            console.log(error.message);
        }
    }
    

    const LongText = ({content,limit}) => {
        const [showAll, setShowAll] = useState(false);

        const showMore = () => setShowAll(true);
        const showLess = () => setShowAll(false);

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
        const toShow = content.substring(0, limit) + "...";
        return <div> 
            {toShow} 
            <button onClick={showMore} className="morebtn">Read more</button>
        </div>
    }


    function next(){
        newcounter(newc=>newc = ++newc)
        if(counter<297 && counter>0){
            newimg(checkImg=>checkImg = gen())
            newTitle(checkTitle=>checkTitle = titletext())
            newtext(checkText=>checkText = mytext())
            newseason(checkSeason=>checkSeason = myseason())
            newDesk(checkDesk=>checkDesk = mydesk())
            newGenrez(checkGen=>checkGen = mygenre())
            newRatingz(checkRatingz=>checkRatingz = myrating())
        }else{
            newcounter(cahngec=>cahngec = Math.floor(Math.random() * 297 +1) )
        }
        
    }

    function back(){
        newcounter(newc=>newc = --newc)
        if(counter<297 && counter>0){

            newimg(checkImg=>checkImg = gen())
            newTitle(checkTitle=>checkTitle = titletext())
            newtext(checkText=>checkText = mytext())
            newseason(checkSeason=>checkSeason = myseason())
            newDesk(checkDesk=>checkDesk = mydesk())
            newGenrez(checkGen=>checkGen = mygenre())
            newRatingz(checkRatingz=>checkRatingz = myrating())
            
        }else{
            newcounter(cahngec=>cahngec = Math.floor(Math.random() * 297 +1) )
        }
    }
    

    function mydesk(){
        const img = datas.map(datas=>{
            return datas = datas.jawSummary.currentContextualSynopsis.text
        })
        //base_random = Math.floor(Math.random() * img.length)
        myrandomImg = img[counter]
        return myrandomImg
    }

    function mygenre(){
        const img = datas.map(datas=>{
            return datas = datas.jawSummary.genres.map(mygen=>mygen.name).join(",")
        })
        //base_random = Math.floor(Math.random() * img.length)
        myrandomImg = img[counter]
        return myrandomImg
    }

    
    function gen(){
        const img = datas.map(datas=>{
            return datas = datas.jawSummary.backgroundImage.url
        })
        //base_random = Math.floor(Math.random() * img.length)
        myrandomImg = img[counter]
        return myrandomImg
    }


    function titletext(){
        const text = datas.map(datas=>{
            return datas = datas.jawSummary.logoImage.url
        })
        //const random = Math.floor(Math.random() * img.length)
        starttitle = text[counter]
        return starttitle

    }

    
    function mytext(){
        const text = datas.map(datas=>{
            return datas = datas.jawSummary.title
        })
        //const random = Math.floor(Math.random() * img.length)
        starttitle = text[counter]
        return starttitle

    }

    
    function myseason(){
        const text = datas.map(datas=>{
            return datas = datas.jawSummary.numSeasonsLabel
        })
        //const random = Math.floor(Math.random() * img.length)
        starttitle = text[counter]
        return starttitle

    }

    function myrating(){
        const text = datas.map(datas=>{
            return datas = datas.jawSummary.maturity.rating.value
        })
        //const random = Math.floor(Math.random() * img.length)
        starttitle = text[counter]
        return starttitle

    }

    function swipeRight1(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll1.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    function swipeRight2(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll2.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    function swipeRight3(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll3.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    function swipeRight4(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll4.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    function swipeRight5(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll5.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    function swipeRight6(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll6.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    function swipeRight7(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll7.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    function swipeRight8(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll8.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    function swipeRight9(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll9.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    function swipeRight10(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll10.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    function swipeRight11(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll11.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    function swipeRight12(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll12.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    function swipeRight13(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll13.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    function swipeRight14(){
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll14.current.scrollLeft += 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }


    const swipeLeft1 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll1.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    const swipeLeft2 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll2.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    const swipeLeft3 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll3.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    const swipeLeft4 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll4.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    const swipeLeft5 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll5.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    const swipeLeft6 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll6.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    const swipeLeft7 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll7.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }
    const swipeLeft8 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll8.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    const swipeLeft9 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll9.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    const swipeLeft10 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll10.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    const swipeLeft11 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll11.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    const swipeLeft12 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll12.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    const swipeLeft13 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll13.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }

    const swipeLeft14 = () =>{
        
        var scrollAmount = 0;
        var slideTimer = setInterval(function(){
            scroll14.current.scrollLeft -= 62;
            scrollAmount += 10;
            if(scrollAmount >= 100){
                window.clearInterval(slideTimer);
            }
        }, 50);
    }


    const movies = datas.map(titles=>{
            return <Layout

                
                logo = {titles.jawSummary.logoImage.url}
                bgimage = {titles.jawSummary.backgroundImage.url}
                title = {titles.jawSummary.title}

                cast = {titles.jawSummary.cast.map(castName=>
                    castName = castName.name)}

                episodeCount = {titles.jawSummary.episodeCount}

                lang = {titles.jawSummary.numSeasonsLabel}
                des = {titles.jawSummary.synopsis}

                rating = {titles.jawSummary.maturity.rating.value}

            /> 
        
    })
    
    
    let sitcom_genre = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="Sitcoms"
            )).length!==0
    )


    let Mysteries = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="TV Mysteries"
            )).length!==0
    )

    

    let Sci_Fi = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="Sci-Fi TV"
            )).length!==0
    )

    let Thrillers = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="TV Thrillers"
            )).length!==0
    )

    let Drama = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="TV Dramas"
            )).length!==0
    )

    let Teens = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="Teen TV Shows"
            )).length!==0
    )


    console.log(Teens)

    let Family = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="Family Movies"
            )).length!==0
    )

    //console.log(Family.length());

    let Kids = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="Kids' TV"
            )).length!==0
    )

    let Adult = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="Adult Animation"
            )).length!==0
    )

    console.log(Adult)
    let Crime = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="Crime TV Shows"
            )).length!==0
    )

    let Fantasy = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="Fantasy TV Shows"
            )).length!==0
    )

    let Horror = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="TV Horror"
            )).length!==0
    )

    let Romantic = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="Romantic TV Dramas"
            )).length!==0
    )
    
    let Reality = datas.filter((item)=>
        (item.jawSummary.genres.filter((inner)=>
                inner.name ==="Reality TV"
            )).length!==0 
    )

    


      let mytitle
      let myimg

      /*
      const seasonId = season.map(titles=>{
        return titles = titles.seasons.map(aaa=>aaa=aaa.name)
        
      })
      */

      const zzepisode = episodes.map(epi=>
        epi = epi.episodes.map(details=>
            details = details.summary.episode
        )
      )

      const pic = episodes.map(newpic=>
        newpic= newpic.episodes.map(zzz=>{
            return zzz=zzz.interestingMoment._342x192.webp.value.url

        })
        )

        const s1 =episodes[0].episodes.map(kbc=>{
            const item = `${kbc.contextualSynopsis.text}`
            return <li>{item}</li>
        });
        const s2 =episodes[1].episodes.map(kbc=>kbc.contextualSynopsis.text);
        const s3 =episodes[2].episodes.map(kbc=>kbc.contextualSynopsis);
        const s4 =episodes[3].episodes.map(kbc=>kbc.contextualSynopsis);
        const s5 =episodes[4].episodes.map(kbc=>kbc.contextualSynopsis);
        const s6 =episodes[5].episodes.map(kbc=>kbc.contextualSynopsis);

        const titlefind = episodes[0].episodes.map(kkk=>kkk=kkk.title)
        const desfind = episodes[0].episodes.map(kkk=>kkk=kkk.contextualSynopsis.text)


        // console.log(s1.map(kbc=>kbc));

            let i=0
            let j=0


        const eachpic = pic.map(spicc=>spicc = spicc.map(num=>num=num))
        const [change,setchaneg] = useState([""])
        


      const myarr=[]
      const titlearr=[]
      const desarr=[]

      function picz(){
        for(i=0;i<eachpic[0].length;i++){
            for(j=0;j<1;j++)
                 myarr[i] = eachpic[0].at(i)
             
           }
        
      }
      function titlefinder(){
        for(i=0;i<titlefind.length;i++){
            for(j=0;j<1;j++)
                 titlearr[i] = titlefind[i]
             
           }
        
      }

      function desfinder(){
        for(i=0;i<desfind.length;i++){
            for(j=0;j<1;j++)
                 desarr[i] = desfind[i]
             
           }
      }

      //console.log(desarr)

      //console.log(episodes[0].episodes.map(kkk=>kkk=kkk.contextualSynopsis.text))

      //console.log(myarr)
      picz();
      titlefinder();
      desfinder();

      const seriesdes = datas[0].jawSummary.episodez
      const desss = seriesdes.map(aaa=>aaa=aaa.episodes.map(aaa=>aaa=aaa.contextualSynopsis.text))
      //console.log(desss[0].at(0))
      
      
    const sitcoms = sitcom_genre.map(titles=>{

        // //let seasonz = []
        // //if(titles.jawSummary.id==season.map(kkk=>kkk=kkk.titleId)){
        //     //seasonz = seasonId
        // //}
        // const s1 =episodes[0].episodes.map(kbc=>{
        //     const item = `${kbc.contextualSynopsis.text}`
        //     return( {item})
        // });
                
                    return <Layout
                    
                    id = {titles.jawSummary.id}
                    logo = {titles.jawSummary.logoImage.url}
                    bgimage = {titles.jawSummary.backgroundImage.url}
                    title = {titles.jawSummary.title}

                    cast = {titles.jawSummary.cast.map(castName=>
                        castName = castName.name)}

                    episodeCount = {titles.jawSummary.episodeCount}

                    lang = {titles.jawSummary.numSeasonsLabel}
                    des = {titles.jawSummary.synopsis}

                    rating = {titles.jawSummary.maturity.rating.value}
                    isvisible = {true}

                    
                    seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}

                    episode = {titlearr}
                    //pic = {episodes.map(ahh=>ahh=ahh.episodes.map(ahhh=>ahhh=ahhh.interestingMoment._342x192.webp.value.url.at(0)))}
                    //pic ={eachpic[0].map(kkk=>kkk=kkk)}
                    pic={myarr}
                    epdes = {s1}
                    myep = {desss[0].at(0)}
                    mytoggle = {Mytoggle2}

                    //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}

                    />
                    })

                                       //console.log(season1.map(kkk=>kkk=kkk.map(ahh=>ahh=ahh)))
const mystry = Mysteries.map(titles=>{


    return <Layout
    
    logo = {titles.jawSummary.logoImage.url}
    bgimage = {titles.jawSummary.backgroundImage.url}
    title = {titles.jawSummary.title}

    cast = {titles.jawSummary.cast.map(castName=>
        castName = castName.name)}

    episodeCount = {titles.jawSummary.episodeCount}

    lang = {titles.jawSummary.numSeasonsLabel}
    des = {titles.jawSummary.synopsis}

    rating = {titles.jawSummary.maturity.rating.value}
    seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}

    episode = {titlearr}
    //pic = {episodes.map(ahh=>ahh=ahh.episodes.map(ahhh=>ahhh=ahhh.interestingMoment._342x192.webp.value.url.at(0)))}
    //pic ={eachpic[0].map(kkk=>kkk=kkk)}
    pic={myarr}
    episodedescription = {desarr}
    mytoggle = {Mytoggle2}
    //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}

    />
    })

    const sify = Sci_Fi.map(titles=>{
    
        
        return <Layout
        
        logo = {titles.jawSummary.logoImage.url}
        bgimage = {titles.jawSummary.backgroundImage.url}
        title = {titles.jawSummary.title}

        cast = {titles.jawSummary.cast.map(castName=>
            castName = castName.name)}

        episodeCount = {titles.jawSummary.episodeCount}

        lang = {titles.jawSummary.numSeasonsLabel}
        des = {titles.jawSummary.synopsis}

        rating = {titles.jawSummary.maturity.rating.value}
        seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}

        episode = {titlearr}
        //pic = {episodes.map(ahh=>ahh=ahh.episodes.map(ahhh=>ahhh=ahhh.interestingMoment._342x192.webp.value.url.at(0)))}
        //pic ={eachpic[0].map(kkk=>kkk=kkk)}
        pic={myarr}
        episodedescription = {desarr}
        mytoggle = {Mytoggle2}
        //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}

        />
        })

        const thrillerz = Thrillers.map(titles=>{
    
        
            return <Layout
            
            logo = {titles.jawSummary.logoImage.url}
            bgimage = {titles.jawSummary.backgroundImage.url}
            title = {titles.jawSummary.title}
    
            cast = {titles.jawSummary.cast.map(castName=>
                castName = castName.name)}
    
            episodeCount = {titles.jawSummary.episodeCount}
    
            lang = {titles.jawSummary.numSeasonsLabel}
            des = {titles.jawSummary.synopsis}
    
            rating = {titles.jawSummary.maturity.rating.value}
            seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}
            episode = {titlearr}
            pic={myarr}
            episodedescription = {desarr}
            mytoggle = {Mytoggle2}
            //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}
    
            />
            })

            const drama = Drama.map(titles=>{
    
        
                return <Layout
                
                logo = {titles.jawSummary.logoImage.url}
                bgimage = {titles.jawSummary.backgroundImage.url}
                title = {titles.jawSummary.title}
        
                cast = {titles.jawSummary.cast.map(castName=>
                    castName = castName.name)}
        
                episodeCount = {titles.jawSummary.episodeCount}
        
                lang = {titles.jawSummary.numSeasonsLabel}
                des = {titles.jawSummary.synopsis}
        
                rating = {titles.jawSummary.maturity.rating.value}
                seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}
                episode = {titlearr}
                pic={myarr}
                episodedescription = {desarr}
                mytoggle = {Mytoggle2}
                //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}
        
                />
                })

    const kids = Kids.map(titles=>{
    
        
        return <Layout
        
        logo = {titles.jawSummary.logoImage.url}
        bgimage = {titles.jawSummary.backgroundImage.url}
        title = {titles.jawSummary.title}

        cast = {titles.jawSummary.cast.map(castName=>
            castName = castName.name)}

        episodeCount = {titles.jawSummary.episodeCount}

        lang = {titles.jawSummary.numSeasonsLabel}
        des = {titles.jawSummary.synopsis}

        rating = {titles.jawSummary.maturity.rating.value}
        seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}
        episode = {titlearr}
        pic={myarr}
        episodedescription = {desarr}
        mytoggle = {Mytoggle2}
        //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}

        />
        })
    const family= Family.map(titles=>{
    
        
        return <Layout
        
        logo = {titles.jawSummary.logoImage.url}
        bgimage = {titles.jawSummary.backgroundImage.url}
        title = {titles.jawSummary.title}

        cast = {titles.jawSummary.cast.map(castName=>
            castName = castName.name)}

        episodeCount = {titles.jawSummary.episodeCount}

        lang = {titles.jawSummary.numSeasonsLabel}
        des = {titles.jawSummary.synopsis}

        rating = {titles.jawSummary.maturity.rating.value}
        seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}
        episode = {titlearr}
        pic={myarr}
        episodedescription = {desarr}
        mytoggle = {Mytoggle2}
        //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}

        />
        })
    const horror= Horror.map(titles=>{
    
        
        return <Layout
        
        logo = {titles.jawSummary.logoImage.url}
        bgimage = {titles.jawSummary.backgroundImage.url}
        title = {titles.jawSummary.title}

        cast = {titles.jawSummary.cast.map(castName=>
            castName = castName.name)}

        episodeCount = {titles.jawSummary.episodeCount}

        lang = {titles.jawSummary.numSeasonsLabel}
        des = {titles.jawSummary.synopsis}

        rating = {titles.jawSummary.maturity.rating.value}
        seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}
        episode = {titlearr}
        pic={myarr}
        episodedescription = {desarr}
        mytoggle = {Mytoggle2}
        //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}

        />
        })
    const adult= Adult.map(titles=>{
    
        
        return <Layout
        
        logo = {titles.jawSummary.logoImage.url}
        bgimage = {titles.jawSummary.backgroundImage.url}
        title = {titles.jawSummary.title}

        cast = {titles.jawSummary.cast.map(castName=>
            castName = castName.name)}

        episodeCount = {titles.jawSummary.episodeCount}

        lang = {titles.jawSummary.numSeasonsLabel}
        des = {titles.jawSummary.synopsis}

        rating = {titles.jawSummary.maturity.rating.value}
        seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}
        episode = {titlearr}
        pic={myarr}
        episodedescription = {desarr}
        mytoggle = {Mytoggle2}
        //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}

        />
        })
    const teen= Teens.map(titles=>{
    
        
        return <Layout
        
        logo = {titles.jawSummary.logoImage.url}
        bgimage = {titles.jawSummary.backgroundImage.url}
        title = {titles.jawSummary.title}

        cast = {titles.jawSummary.cast.map(castName=>
            castName = castName.name)}

        episodeCount = {titles.jawSummary.episodeCount}

        lang = {titles.jawSummary.numSeasonsLabel}
        des = {titles.jawSummary.synopsis}

        rating = {titles.jawSummary.maturity.rating.value}
        
        seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}
        episode = {titlearr}
        pic={myarr}
        episodedescription = {desarr}
        mytoggle = {Mytoggle2}
        //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}

        />
        })
    const reality= Reality.map(titles=>{
    
        
        return <Layout
        
        logo = {titles.jawSummary.logoImage.url}
        bgimage = {titles.jawSummary.backgroundImage.url}
        title = {titles.jawSummary.title}

        cast = {titles.jawSummary.cast.map(castName=>
            castName = castName.name)}

        episodeCount = {titles.jawSummary.episodeCount}

        lang = {titles.jawSummary.numSeasonsLabel}
        des = {titles.jawSummary.synopsis}

        rating = {titles.jawSummary.maturity.rating.value}
        seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}
        episode = {titlearr}
        pic={myarr}
        episodedescription = {desarr}
        mytoggle = {Mytoggle2}
        //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}

        />
        })
    const romance= Romantic.map(titles=>{
    
        
        return <Layout
        
        logo = {titles.jawSummary.logoImage.url}
        bgimage = {titles.jawSummary.backgroundImage.url}
        title = {titles.jawSummary.title}

        cast = {titles.jawSummary.cast.map(castName=>
            castName = castName.name)}

        episodeCount = {titles.jawSummary.episodeCount}

        lang = {titles.jawSummary.numSeasonsLabel}
        des = {titles.jawSummary.synopsis}

        rating = {titles.jawSummary.maturity.rating.value}
        seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}
        episode = {titlearr}
        pic={myarr}
        episodedescription = {desarr}
        mytoggle = {Mytoggle2}
        //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}

        />
        })
    
    const crime= Crime.map(titles=>{
    
        
        return <Layout
        
        logo = {titles.jawSummary.logoImage.url}
        bgimage = {titles.jawSummary.backgroundImage.url}
        title = {titles.jawSummary.title}

        cast = {titles.jawSummary.cast.map(castName=>
            castName = castName.name)}

        episodeCount = {titles.jawSummary.episodeCount}

        lang = {titles.jawSummary.numSeasonsLabel}
        des = {titles.jawSummary.synopsis}

        rating = {titles.jawSummary.maturity.rating.value}
        seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}
        episode = {titlearr}
        pic={myarr}
        episodedescription = {desarr}
        mytoggle = {Mytoggle2}
        //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}

        />
        })
    const fantasy= Fantasy.map(titles=>{
    
        
        return <Layout
        
        logo = {titles.jawSummary.logoImage.url}
        bgimage = {titles.jawSummary.backgroundImage.url}
        title = {titles.jawSummary.title}

        cast = {titles.jawSummary.cast.map(castName=>
            castName = castName.name)}

        episodeCount = {titles.jawSummary.episodeCount}

        lang = {titles.jawSummary.numSeasonsLabel}
        des = {titles.jawSummary.synopsis}

        rating = {titles.jawSummary.maturity.rating.value}
        seasons = {season.map(sea=>sea=sea.seasons.map(kkk=>kkk=kkk.name))}
        episode = {titlearr}
        pic={myarr}
        episodedescription = {desarr}
        mytoggle = {Mytoggle2}
        //sitcoms = {titles.jawSummary.genres.map(sitcom=>sitcom = sitcom.name = "Sitcoms")}

        />
        })
                

             
    function goback(){
        setVisible(false)
        setVisible2(true)
        window.scrollTo(0, 0);
    }

    function top(){
        window.scrollTo(0,0);
    }

    function reveal() {
        var reveals = document.querySelectorAll(".contentContainer");
        for (var i = 0; i < reveals.length; i++) {
          var windowHeight = window.innerHeight;
          var elementTop = reveals[i].getBoundingClientRect().top;
          var elementVisible = 150;
          if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
          } else {
            reveals[i].classList.remove("active");
          }
        }
      }

      window.addEventListener("scroll", reveal);

      useEffect(()=>{
        reveal();
        allowances();
      },[]);
    /*
     const getData = async (url,host) =>{
        const response = await fetch(url,{
            method: 'GET',
	        headers: {
                accept: "application/json",
                'X-RapidAPI-Key': ApiKey,
                'X-RapidAPI-Host': host,
                },
            });
        if(!response.ok){
            throw new Error('Http stats errror! Status: '+ response.status);
        }
        return await response.json();
     };
     */

    /*const runApiQueries = async () =>{
        //const data = await getData(Url,Host);
        //const netflixData = await getData(totalUrl,netflixHost)
        //console.log(data)
        //console.log(netflixData)
     }

     */

    // runApiQueries();
    return(

        <div>
            
                                    
            {visbile && 
            <div>
                
                <button className="goback" onClick={goback}>Go back</button>
                    <SingleLay 
                        mytitle={singletitle} 
                        myimage={singleimg}
                        logo = {singlelogo}
                        cast = {singlecast}
                        ep = {singleep}
                        rating = {singlerating}
                        des = {singledes}
                        id = {singleid}
                        seasons = {singleseason}
                        episode = {singleepisode}
                        pic = {singlepic}
                        myep = {singleepisodedes}
                        epdes={singleepdes}
                     />   
            </div>}
                        

<div className="main">
            {/*
            <div className="arrangeLayout">
                {movies}
                
            </div>
            For all movies
            */}
            {visbile2 && 
            <div className="parentContent">
                

                <div className="content_info">
                    
                    {!infovisible && <button onClick={back} className="leftbtn"><img src="right-arrow3.png" width="100%"></img></button>}
                    
                        <div className="PageLogo">
                            
                            {!infovisible && <img src={title} className="basetitle"></img>}
                        
                        <div className="imageSection" onMouseEnter={()=> setinfovisible(true)} onMouseLeave={()=> setinfovisible(false)}>
                            
                            
                            <img  className="backimg" src={loadimg} width="100%" ></img>
                            
                        </div>
                        
                                
                            
                        </div>
                        

                        {infovisible && <div className="Info">
                            <h1>{text}</h1>
                            <h2>{zzseason}</h2>
                            <div className="subInfo">
                                <p>{genrez}</p>
                                <p>{ratingz}</p>
                            </div>
                            <p>{desk}</p>
                            
                        </div>}
                        
                        {!infovisible && <button onClick={next} className="rightbtn"><img src="right-arrow2.png" width="100%"></img></button>}


                    </div>







<div className="gridContainer">

                {onemonth && <div className="contentContainer">
                    <div className="arrangeLayout">
                                <div className="genre">
                                    <h2>Sitcoms</h2>
                                </div>
                                <div className="layer1" ref={scroll1}>
                                    <button onClick={swipeLeft1} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                                    
                                    {sitcoms}
                                    <button onClick={swipeRight1} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                                </div>
                            </div>
                </div>}
                            
                            
                {onemonth && <div className="contentContainer">
                <div className="arrangeLayout">
                            <div className="genre">
                                    <h2>Si-Fi</h2>
                                </div>
                                <div className="layer2" ref={scroll2}>
                                    <button onClick={swipeLeft2} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                                    <button onClick={swipeRight2} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                                    {sify}
                                </div>
                                
                                
                            </div>

                    
                </div>}

            {onemonth && <div className="contentContainer">     
            <div className="arrangeLayout">
            <div className="genre">
                    <h2>Mystery</h2>
                </div>
                <div className="layer3" ref={scroll3}>
                    <button onClick={swipeLeft3} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                    <button onClick={swipeRight3} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                    {mystry}
                </div>
                
                
            </div>
            </div>}

           {threemonth && <div className="contentContainer">
            <div className="arrangeLayout">
            <div className="genre">
                    <h2>Thriller</h2>
                </div>
                <div className="layer4" ref={scroll4}>
                    <button onClick={swipeLeft4} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                    <button onClick={swipeRight4} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                    {thrillerz}
                </div>
                
                
            </div>
            </div>}

           {threemonth && <div className="contentContainer">
            <div className="arrangeLayout">
            <div className="genre">
                    <h2>Drama</h2>
                </div>
                <div className="layer5" ref={scroll5}>
                    <button onClick={swipeLeft5} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                    <button onClick={swipeRight5} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                    {drama}
                </div>
              
                
            </div>
            </div>}

            {threemonth && <div className="contentContainer">
            <div className="arrangeLayout">
            <div className="genre">
                    <h2>Adult</h2>
                </div>
                <div className="layer6" ref={scroll6}>
                    <button onClick={swipeLeft6} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                    <button onClick={swipeRight6} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                    {adult}
                </div>
             
                
            </div>
            </div>}

            {threemonth && <div className="contentContainer">
            <div className="arrangeLayout">
            <div className="genre">
                    <h2>Romance</h2>
                </div>
                <div className="layer7" ref={scroll7}>
                    <button onClick={swipeLeft7} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                    <button onClick={swipeRight7} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                    {romance}
                </div>
                
                
            </div>
            </div>}

            {threemonth && <div className="contentContainer">
            <div className="arrangeLayout">
            <div className="genre">
                    <h2>Crime</h2>
                </div>
                <div className="layer8" ref={scroll8}>
                    <button onClick={swipeLeft8} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                    <button onClick={swipeRight8} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                    {crime}
                </div>
               
                
            </div>
            </div>}

            {yearmonth && <div className="contentContainer">
            <div className="arrangeLayout">
            <div className="genre">
                    <h2>Fantasy</h2>
                </div>
                <div className="layer9" ref={scroll9}>
                    <button onClick={swipeLeft9} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                    <button onClick={swipeRight9} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                    {fantasy}
                </div>
            
                
            </div>
</div>}

      {yearmonth && <div className="contentContainer">      
            <div className="arrangeLayout">
            <div className="genre">
                    <h2>Teens</h2>
                </div>
                <div className="layer10" ref={scroll10}>
                    <button onClick={swipeLeft10} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                    <button onClick={swipeRight10} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                    {teen}
                </div>
               
                
            </div>
</div>}


{yearmonth && <div className="contentContainer">

<div className="arrangeLayout">
            <div className="genre">
                    <h2>Family</h2>
                </div>
                <div className="layer11" ref={scroll11}>
                    <button onClick={swipeLeft11} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                    <button onClick={swipeRight11} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                    {family}
                </div>
               
                
            </div>

</div>}
{yearmonth && <div className="contentContainer">
            <div className="arrangeLayout">
            <div className="genre">
                    <h2>Kids</h2>
                </div>
                <div className="layer12" ref={scroll12}>
                    <button onClick={swipeLeft12} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                    <button onClick={swipeRight12} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                    {kids}
                </div>
             
                
            </div>
            </div>}

            {yearmonth && <div className="contentContainer">
                
            <div className="arrangeLayout">
            <div className="genre">
                    <h2>Reality</h2>
                </div>
                <div className="layer13" ref={scroll13}>
                    <button onClick={swipeLeft13} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                    <button onClick={swipeRight13} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                    {reality}
                </div>
               
                
            </div>

            </div>}


           {yearmonth && <div className="contentContainer">
            <div className="arrangeLayout">
            <div className="genre">
                    <h2>Horror</h2>
                </div>
                <div className="layer14" ref={scroll14}>
                    <button onClick={swipeLeft14} className="swipeLeft"><img src="rightarrow2.png" width="100px"></img></button>
                    <button onClick={swipeRight14} className="swipeRight"><img className="rightimg" src="rightarrow.png" width="100px"></img></button>
                    {horror}
                </div>
               
                
            </div>

            </div>}

</div>

            
            </div>
            
           }

            


        </div>

                    <div className="scrollTop">
                        <img src="scrolltop.png" onClick={top}></img>
                    </div>
        </div>
        
       

      
        
    )
}

