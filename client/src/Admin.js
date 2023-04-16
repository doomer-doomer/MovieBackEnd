import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chart as ChartJS, ArcElement, Legend, CategoryScale,LinearScale,BarElement,Title,Tooltip } from "chart.js";
import { Pie ,Bar} from "react-chartjs-2";
import {ShimmerText,ShimmerCircularImage,ShimmerThumbnail} from "react-shimmer-effects";
import Button from 'react-bootstrap/Button';
ChartJS.register(ArcElement,CategoryScale,LinearScale,BarElement,Title,Tooltip,
Legend);


export default function AdminPage(){

    const [loading,loaded] = useState(false);
    const [initialisation,finalization] = useState("Loading...");
    const [user_id,setid] = useState("");
    const [user_name,setuser] = useState("");
    const [email,setemail] = useState("");
    const [password,setpass] = useState("");
    const [user_age,setage] = useState("");
    const [gender,setgender] = useState("");
    const [contact,setcontact] = useState("");
    const [country,setcountry] = useState("");

    const [showdata,setshowdata]=useState(false);
    const [showdatatxt,setshowdatatxt]=useState("Show Database");

    const [subscribe,setsub]= useState("")
    const [subscriberev,setsubrev]= useState("")
    const [notsub,setnotsub] = useState(0)
    const [subscribesav,setsubsav]= useState(0)
    const [subscribestd,setsubstd]= useState(0)
    const [subscribeprem,setsubprem]= useState(0)
    const [subscribetionprice,setsubtionprice]= useState("")
    
    const [countofcountry,setcountcountry] = useState([]);
    const [locname,setlocname]=useState([]);

    const [countofgen,setgen] = useState([]);
    const [valgen,setvalgen] = useState([]);

    const [countofage,setcountage] = useState([]);
    const [valage,setvalage] = useState([]);

    const [col1,setbgcolr]=useState("")
    const [col2,sethovercol] = useState("")
    const [col3,setcol3]=useState("")
    const [col4,setcol4] = useState("")
    const [col5,setcol5]=useState("")
    const [col6,setcol6] = useState("")
    const [col7,setcol7]=useState("")
    const [col8,setcol8] =useState("")
    const [col9,setcol9]=useState("")
    const [col10,setcol10] = useState("")

     const suboptions = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Total Subscription Chart',
          },
        },
      };

    const labels = ["Subscriptions"];

 const subcribtiondata = {
  labels,
  datasets: [
    {
      label: 'Saving',
      data: [subscribesav],
      backgroundColor: hexToRGB(col4,0.5),
    },
    {
      label: 'Stanadard',
      data: [subscribestd],
      backgroundColor: hexToRGB(col5,0.5),
    },
    {
        label: 'Premium',
        data: [subscribeprem],
        backgroundColor: hexToRGB(col6,0.5),
      },
      {
        label: 'Not Subscribed',
        data: [notsub],
        backgroundColor: hexToRGB(col7,0.5),
      },
  ],
};
    
    function hexToRGB(hex,alpha) {

        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
      
        if (alpha) {
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
      
        return `rgb(${r}, ${g}, ${b})`;
      }

      console.log(valage)

    const agegroup ={
        labels: countofage.sort(),
        datasets: [{
            label:"Age Group",
            data: Object.values(valage),
            backgroundColor: [
                hexToRGB(col10,0.75),
                hexToRGB(col9,0.75),
                hexToRGB(col8,0.75),
                hexToRGB(col7,0.75),
                hexToRGB(col6,0.75),
                hexToRGB(col5,0.75),
                hexToRGB(col4,0.75),
                hexToRGB(col3,0.75),
                hexToRGB(col2,0.75),
                hexToRGB(col1,0.75)
            ],
            hoverBackgroundColor:[
                hexToRGB(col10,0.5),
                hexToRGB(col9,0.5),
                hexToRGB(col8,0.5),
                hexToRGB(col7,0.5),
                hexToRGB(col6,0.5),
                hexToRGB(col5,0.5),
                hexToRGB(col4,0.5),
                hexToRGB(col3,0.5),
                hexToRGB(col2,0.5),
                hexToRGB(col1,0.5)
            ],
            
        }]
    }

    const ageoptions = {
        responsive:true,
        plugins: {
            legend: {
				horizontalAlign: "right",
				verticalAlign: "center",
				reversed: true
			}
        },
      };
  
console.log(valgen.M)
    const barstate={
        labels: countofgen,
        datasets: [{
            label: 'Gender Ratio',
            data: Object.values(valgen),
            backgroundColor: [
                hexToRGB(col5,0.75),
                hexToRGB(col6,0.75)
            ],
            hoverBackgroundColor:[
                hexToRGB(col5,0.5),
                hexToRGB(col6,0.5)
            ],
            
        }]
    }

    var ratioGen = valgen.M/valgen.F;

    const genoptions = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 1,
          }
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }


    const state = {
        labels: locname,
        datasets: [
          {
            label: 'Country Data',
            backgroundColor: [
                col1,
                col2,
                col3,
                col4,
                col5,
                col6,
                col7,
                col8,
                col9,
                col10
            ],
            hoverBackgroundColor: [
                hexToRGB(col1,0.75),
                hexToRGB(col2,0.75),
                hexToRGB(col3,0.75),
                hexToRGB(col4,0.75),
                hexToRGB(col5,0.75),
                hexToRGB(col6,0.75),
                hexToRGB(col7,0.75),
                hexToRGB(col8,0.75),
                hexToRGB(col9,0.75),
                hexToRGB(col10,0.75)
            ],
            data: Object.values(countofcountry)
          }
        ]
      }

    
      
      const getSubscriptionData=async()=>{
        try {
            
            const subscriberData = await toast.promise(fetch("http://localhost:5000/subscribergetAllData",{
               
            }),{
                pending:"Checking credentials...",
                success:"Subscription Database Connected",
                error:"Something went wrong!"
            });

            const subscriberInfo = await subscriberData.json();

            if (!subscriberData.ok) return;

            const subscribed = subscriberInfo.map(abc=>abc=abc.subscription_id)
            const totalprice = subscriberInfo.map(abc=>abc=abc.subscription_price)
            const Packs = subscriberInfo.map(abc=>abc=abc.subscription_name)
            let i=0;
            let count=0;
            let result=0;
            let sav=0;
            let std=0;
            let prem=0;
            let nosub=0;
            for(i=0;i<subscribed.length;i++){
                if(subscribed[i]==="Not Subscribed"){
                    count = count+1;
                    nosub =nosub+1;
                }
                result = result+ totalprice[i]
                if(Packs[i]==="Saving Pack"){
                    sav=sav+1
                }else if(Packs[i]==="Standard Pack"){
                    std=std+1
                }else if(Packs[i]==="Premium Pack"){
                    prem=prem+1;
                }else{
                    
                }
            }

            const sub_counts = {};
            const sub_Array = Packs;
            sub_Array.forEach(function (x) { sub_counts[x] = (sub_counts[x] || 0) + 1; });
            setsubtionprice(sub_counts);
            setsubrev(result);
            setsubprem(prem)
            setsubsav(sav)
            setsubstd(std);
            setnotsub(nosub)
            //console.log(stdPack);
            setsub(subscribed.length-count)

        } catch (error) {
            
        }
      }

    const getAllData = async e =>{
        try {
            const response = await toast.promise(fetch("http://localhost:5000/getuser"),{
                promise:"Fetching from Database...",
                success:"Database Connected!",
                error:"Something went wrong!"
            });

            const res = await response.json();

            if(!response.ok){
                toast.warn(res, {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                    return;
            }

            //setcountcountry(res.map(abc=>abc.country))
            var country = res.map(abc=>abc.country);
            var gen = res.map(abc=>abc=abc.gender);
            var age = res.map(abc=>abc=abc.user_age);

            loaded(true);
            finalization(res.map(aaa=>aaa=aaa));
            

            var unique_country = country.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
            //console.log(unique);
            setlocname(unique_country);
            var unique_gen = gen.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
            setgen(unique_gen);

            var unique_age = age.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
            setcountage(unique_age);

             console.log(unique_age)
        
            const counts = {};
            const sampleArray = country;
            sampleArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
            setcountcountry(counts)
            

            const gen_counts = {};
            const gen_Array = gen;
            gen_Array.forEach(function (x) { gen_counts[x] = (gen_counts[x] || 0) + 1; });
            setvalgen(gen_counts);

            const age_counts = {};
            const age_Array = age;
            age_Array.forEach(function (x) { age_counts[x] = (age_counts[x] || 0) + 1; });
            setvalage(age_counts);
             console.log(valage)

            const randColor = () =>  {
                return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
            }

            setbgcolr(randColor)
            sethovercol(randColor)
            setcol3(randColor)
            setcol4(randColor)
            setcol5(randColor)
            setcol6(randColor)
            setcol7(randColor)
            setcol8(randColor)
            setcol9(randColor)
            setcol10(randColor)
        


        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(()=>{
        getAllData();
        getSubscriptionData();
    },[]);


    const handleSubmit_delete = async event=>{
        event.preventDefault();
        const body = {user_id}
        try {
            const response = await toast.promise(fetch("http://localhost:5000/delete",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            }),{
                promise:"Sending Request",
                success:"Prompt send successfully!",
                error:"Something went wrong!"
            });

            const res = await response.json();

            if(!response.ok){
                toast.warn(res, {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                    return;
            }

            if(res==="Deleted Successfully"){
                toast.error(res, {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                    getSubscriptionData();
                    getAllData();
                    
            }

            if(res==="Account not found!"){
                toast.info(res, {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                    getAllData();
            }
                
        } catch (error) {
            console.error(error.message);
            
        }
    }

    const handleSubmit_add = async event =>{
        event.preventDefault();
        if(user_name==="" || email === "" || password === ""){
            toast.warn('Insufficient Credentials!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                return;
        }
        try {
            const body = {user_name,email,password,user_age,gender,contact,country};  
            const response = await toast.promise(fetch("http://localhost:5000/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(body)
            }),{
                pending:"Checking credentials...",
                success:"Connecting to Database",
                error:"Something went wrong!"
            });

            const res = await response.json();
            //console.log(res);

            if(!response.ok){
                toast.warn(res, {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                    return;
            }
            
            localStorage.setItem('jwt_token',res.jwtToken);
            if(res.jwtToken.length>10){
                toast.success("Registration successful!", {
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                    getSubscriptionData();
                    getAllData();
            };
                
            
            
        } catch (err) {
            console.error(err.message);
            toast.error(err.message, {
                position: "bottom-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }

    function showdb(){
        if(showdata===true){
            setshowdata(false)
            setshowdatatxt("Show Database")
        }else{
            setshowdata(true)
            setshowdatatxt("Hide Database")
        }
    }

    return(
        <div><ToastContainer/>
            <h1 className='dashboard'>Dashboard.</h1>
<hr></hr>
<div className='SubscriptionData'>
<div className='Subscriptions'>

<h3>Total Users<br></br>
<h1>{subscribe+ notsub}</h1></h3>

<h3>Total Subscriptions<br></br>
<h1>{subscribe}</h1></h3>

<h3>Total Revenue Generated<br></br>
<h1>₹{subscriberev}</h1></h3>



</div>

<div className='subgraph'>
<Bar options={suboptions} data={subcribtiondata} />
</div>
</div>
            
           
           <hr></hr>

            <div className='Queries'>

            <div className='userdata'>
                    <div className='topuserdata'>
                    <h1>Country Distribution</h1>
                    <img src="refresh.png" width="10px" onClick={getAllData}></img>
                    </div>
                    
                    <hr></hr>
                    <div className='countryuser'>
                        
                    {loading?<Pie
                    data={state}
                    options={{
                        title:{
                        display:true,
                        text:'Country',
                        fontSize:20
                        }
                    }}
                    /> :<ShimmerCircularImage size={450} /> }
                    </div>
                    
                
                
                </div>
            
                <div className='deleteusers'>

                    <div className='subdeleteuser'>
                    <h2>Delete Users</h2>
                    <hr></hr>
                    <form onSubmit={handleSubmit_delete}>
                         <label>UserId:<input
                            placeholder='Enter userId'
                            type="text"
                            value={user_id}
                            onChange={(e) => setid(e.target.value)}
                        /></label>
<br></br>
                        <Button type="submit">Submit</Button>
                    </form> 

                    </div>
                    

                    <div className='subadduser'>
                    <h2>Add Users</h2>
                    <hr></hr>
                    <form onSubmit={handleSubmit_add}>
                        <label>Username *<input
                            placeholder='Enter Username'
                            type="text"
                            value={user_name}
                            onChange={(e) => setuser(e.target.value)}
                        /></label>

                        <label>     Email *<input
                            placeholder='Enter email'
                            type="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        /></label>
                        <label>Password *<input
                            placeholder='Enter pass'
                            type="password"
                            value={password}
                            onChange={(e) => setpass(e.target.value)}
                        /></label>

                        <label>Age
                        <input
                        type="number" 
                        value={user_age}
                        placeholder="Enter Age"
                        onChange={(e) => setage(e.target.value)}
                        /></label>
                    
                    <label>Gender
                        <select value={gender} onChange={(e) => setgender(e.target.value)}>
                            <option></option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select></label>
                    
                        <label>Contact
                        <input
                        type="number" 
                        value={contact}
                        placeholder="Enter contact number"
                        onChange={(e) => setcontact(e.target.value)}
                        /></label>
                        
                    
                        <label>Country
                    <select value={country} onChange={(e) => setcountry(e.target.value)}>
                            <option></option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Aland Islands">Aland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
                            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                            <option value="Brunei Darussalam">Brunei Darussalam</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">Christmas Island</option>
                            <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo, Democratic Republic of the Congo">Congo, Democratic Republic of the Congo</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cote D'Ivoire">Cote D'Ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Curacao">Curacao</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">Czech Republic</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">French Polynesia</option>
                            <option value="French Southern Territories">French Southern Territories</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guernsey">Guernsey</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                            <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Isle of Man">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                            <option value="Korea, Republic of">Korea, Republic of</option>
                            <option value="Kosovo">Kosovo</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="Macedonia, the Former Yugoslav Republic of">Macedonia, the Former Yugoslav Republic of</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                            <option value="Moldova, Republic of">Moldova, Republic of</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">Norfolk Island</option>
                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russian Federation">Russian Federation</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Barthelemy">Saint Barthelemy</option>
                            <option value="Saint Helena">Saint Helena</option>
                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                            <option value="Saint Lucia">Saint Lucia</option>
                            <option value="Saint Martin">Saint Martin</option>
                            <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                            <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Serbia and Montenegro">Serbia and Montenegro</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra Leone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Sint Maarten">Sint Maarten</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
                            <option value="South Sudan">South Sudan</option>
                            <option value="Spain">Spain</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                            <option value="Taiwan, Province of China">Taiwan, Province of China</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Timor-Leste">Timor-Leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Viet Nam">Viet Nam</option>
                            <option value="Virgin Islands, British">Virgin Islands, British</option>
                            <option value="Virgin Islands, U.s.">Virgin Islands, U.s.</option>
                            <option value="Wallis and Futuna">Wallis and Futuna</option>
                            <option value="Western Sahara">Western Sahara</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                        </label>
                        
                   <br></br>

                        <Button type="submit">Submit</Button>
                    </form>

                    </div>
                    

                   


                </div>

                {/* <div className='addusers'>
               
                  
                

                </div> */}

               

                </div>
                <br></br>
<hr></hr>
            <div className='bargraphlay'>
            

                    <div className='agegrp'>
                    <div className='topuserdataa'>
                    <h1>Age Group</h1>
                    <img src="refresh.png" width="10px" onClick={getAllData}></img>
                    </div>
                        <hr></hr>
                    {loading?  <Bar
                    options={ageoptions}
                    data={agegroup}
                    
                /> : <ShimmerThumbnail height={300} width={400}  className="m-0" rounded />}
                    </div>

                    <div className='gengrp'>
                    <div className='topuserdataa'>
                    <h1>Gender ratio - {ratioGen}</h1>
                    <img src="refresh.png" width="10px" onClick={getAllData}></img>
                    </div>
                    
                        <hr></hr>
                    {loading?  <Bar
                    options={genoptions}
                    data={barstate}
                    
                /> : <ShimmerThumbnail height={300} width={400}  className="m-0" rounded />}
                    </div>
                
                
              
            </div>
            <Button onClick={showdb}>{showdatatxt}</Button>
            {showdata && <div className='AdminsLay'>

            
                
<div className='AdminData'>
   
    <div className='UserId'>
        <h1>UserId</h1>
        <hr></hr>
        {loading ? <div className='inner_admin_data'><h3>{initialisation.map(abc=>{return(<div className='inner_id'>{abc.user_id}</div>)} )}</h3></div> : Array.apply(null, { length: 5 }).map((e, i) => (
            <span className="busterCards" key={i}>
                <ShimmerText line={3} gap={10} />
            </span>
            ))}
    </div>
    <hr></hr>
    <div className='Username'>
    <h1>Username</h1>
    <hr></hr>
        {loading ? <div className='inner_admin_data'><h3>{initialisation.map(abc=>{return(<div className='inner_username'>{abc.user_name}</div>)} )}</h3></div> : Array.apply(null, { length: 5 }).map((e, i) => (
            <span className="busterCards" key={i}>
                <ShimmerText line={3} gap={10} />
            </span>
            ))}
    </div>
    <hr></hr>
    <div className='Email'>
    <h1>Email</h1>
    <hr></hr>
        {loading ? <div className='inner_admin_data'><h3>{initialisation.map(abc=>{return(<div className='inner_email '>{abc.email}</div>)} )}</h3></div> : Array.apply(null, { length: 5 }).map((e, i) => (
            <span className="busterCards" key={i}>
                <ShimmerText line={3} gap={10} />
            </span>
            ))}
    </div>
    <hr></hr>
    <div className='Password'>
    <h1>Password</h1>
    <hr></hr>
        {loading ? <div className='inner_admin_data'><h3>{initialisation.map(abc=>{return(<div className='inner_password'>{abc.password}</div>)} )}</h3></div> : Array.apply(null, { length: 5 }).map((e, i) => (
            <span className="busterCards" key={i}>
                <ShimmerText line={3} gap={10} />
            </span>
            ))}
    </div>
    <hr></hr>
    <div className='UserId'>
        <h1>Age</h1>
        <hr></hr>
        {loading ? <div className='inner_admin_data'><h3>{initialisation.map(abc=>{return(<div className='inner_id'>{abc.user_age}</div>)} )}</h3></div> : Array.apply(null, { length: 5 }).map((e, i) => (
            <span className="busterCards" key={i}>
                <ShimmerText line={3} gap={10} />
            </span>
            ))}
    </div>
    <hr></hr>
    <div className='Username'>
    <h1>Gender</h1>
    <hr></hr>
        {loading ? <div className='inner_admin_data'><h3>{initialisation.map(abc=>{return(<div className='inner_username'>{abc.gender}</div>)} )}</h3></div> : Array.apply(null, { length: 5 }).map((e, i) => (
            <span className="busterCards" key={i}>
                <ShimmerText line={3} gap={10} />
            </span>
            ))}
    </div>
    <hr></hr>
    <div className='Email'>
    <h1>Contact</h1>
    <hr></hr>
        {loading ? <div className='inner_admin_data'><h3>{initialisation.map(abc=>{return(<div className='inner_email '>{abc.contact}</div>)} )}</h3></div> : Array.apply(null, { length: 5 }).map((e, i) => (
            <span className="busterCards" key={i}>
                <ShimmerText line={3} gap={10} />
            </span>
            ))}
    </div>
    <hr></hr>
    <div className='Password'>
    <h1>Location</h1>
    <hr></hr>
        {loading ? <div className='inner_admin_data'><h3>{initialisation.map(abc=>{return(<div className='inner_password'>{abc.country}</div>)} )}</h3></div> : Array.apply(null, { length: 5 }).map((e, i) => (
            <span className="busterCards" key={i}>
                <ShimmerText line={3} gap={10} />
            </span>
            ))}
    </div>
</div>





</div>}
        </div>
    )
}