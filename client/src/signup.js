import { BrowserRouter as Router,Link,Route,Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signup(){
    const [user_name,setusername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPass] = useState("");
    const [user_age,setage] = useState("");
    const [gender,setgender] = useState("");
    const [contact,setcontact] = useState("");
    const [country,setcountry] = useState("");
    const [checkpass,setcheckpass] = useState("");

    function reloadFun(){
        window.location.reload();
    }

    const handleSubmit = async e => {
        e.preventDefault();
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
        if(password!==checkpass){
            toast.warn('Passwords are not matching!', {
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
        if(contact.length!=10){
            toast.warn('Incorrect phone number!', {
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
            console.log(res);

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
                    
                setTimeout(reloadFun,3000);
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
    



    return(
        <div className="LoginMain">
           <ToastContainer
           
           />
           <div className='mainilogoimg'>
            <img src='chillax.png'></img>
           </div>
           <div className="imageLogin">
          
            <img src="loginbg.jpg"></img>
           
            </div>

           

            <div className="signuplay">

                <div className='signcontent'>

                <h1>Sign up</h1>
                <div className="signupitems">
                <form onSubmit={handleSubmit}>
                    <label>Username *
                        <input
                        type="text" 
                        value={user_name}
                        onChange={(e) => setusername(e.target.value)}
                        />
                    </label>
                    <label>Email *
                        <input
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>Password *
                        <input
                        type="password" 
                        value={password}
                        onChange={(e) => setPass(e.target.value)}
                        />
                    </label>

                    <label>Re-Type Password *
                        <input
                        type="password" 
                        value={checkpass}
                        onChange={(e) => setcheckpass(e.target.value)}
                        />
                    </label>

                    <label>Age
                        <input
                        type="number" 
                        value={user_age}
                        onChange={(e) => setage(e.target.value)}
                        />
                    </label>
                    <label>Gender
                        <select value={gender} onChange={(e) => setgender(e.target.value)}>
                            <option></option>
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </label>

                    <label>Contact
                        <input
                        type="number" 
                        value={contact}
                        onChange={(e) => setcontact(e.target.value)}
                        />
                        
                    </label>
                    <label>Country
                    <select value={country} onChange={(e) => setcountry(e.target.value)}>
                            <option></option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="AlandIslands">Åland Islands</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="AmericanSamoa">American Samoa</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antarctica">Antarctica</option>
                            <option value="Antigua&Barbuda">Antigua & Barbuda</option>
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
                            <option value="Bonaire,SintEustatius&Saba">Caribbean Netherlands</option>
                            <option value="Bosnia&Herzegovina">Bosnia & Herzegovina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="BouvetIsland">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="BIOT">British Indian Ocean Territory</option>
                            <option value="BruneiDarussalam">Brunei</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="BurkinaFaso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="CapeVerde">Cape Verde</option>
                            <option value="CaymanIslands">Cayman Islands</option>
                            <option value="CentralAfricanRepublic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="ChristmasIsland">Christmas Island</option>
                            <option value="CocosIslands">Cocos (Keeling) Islands</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo - Brazzaville</option>
                            <option value="Congo,DemocraticRepublic of the Congo">Congo - Kinshasa</option>
                            <option value="CookIslands">Cook Islands</option>
                            <option value="CostaRica">Costa Rica</option>
                            <option value="CoteD'Ivoire">Côte d’Ivoire</option>
                            <option value="Croatia">Croatia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Curacao">Curaçao</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="CzechRepublic">Czechia</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="DominicanRepublic">Dominican Republic</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="ElSalvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands (Malvinas)">Falkland Islands (Islas Malvinas)</option>
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
                            <option value="HeardIsland&Mcdonald Islands">Heard & McDonald Islands</option>
                            <option value="HolySee">Vatican City</option>
                            <option value="Honduras">Honduras</option>
                            <option value="HongKong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran">Iran</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="IsleofMan">Isle of Man</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jersey">Jersey</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Korea, Democratic People's Republic of">North Korea</option>
                            <option value="Korea, Republic of">South Korea</option>
                            <option value="Kosovo">Kosovo</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao">Laos</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon">Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">Libya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macao">Macao</option>
                            <option value="Macedonia, the Former Yugoslav Republic of">North Macedonia</option>
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
                            <option value="Micronesia, Federated States of">Micronesia</option>
                            <option value="Moldova, Republic of">Moldova</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montenegro">Montenegro</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar (Burma)</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">Curaçao</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="NorfolkIsland">Norfolk Island</option>
                            <option value="NorthernMarianaIslands">Northern Mariana Islands</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Palestinian">Palestine</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn Islands</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Réunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russian Federation">Russia</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="SaintBarthelemy">St. Barthélemy</option>
                            <option value="SaintHelena">St. Helena</option>
                            <option value="SaintKitts&Nevis">St. Kitts & Nevis</option>
                            <option value="SaintLucia">St. Lucia</option>
                            <option value="SaintMartin">St. Martin</option>
                            <option value="SaintPierre&Miquelon">St. Pierre & Miquelon</option>
                            <option value="SaintVincent&Grenadines">St. Vincent & Grenadines</option>
                            <option value="Samoa">Samoa</option>
                            <option value="SanMarino">San Marino</option>
                            <option value="SaoTome&Principe">São Tomé & Príncipe</option>
                            <option value="SaudiArabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Serbia&Montenegro">Serbia</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="SierraLeone">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="SintMaarten">Sint Maarten</option>
                            <option value="Slovakia">Slovakia</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="SolomonIslands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="SouthAfrica">South Africa</option>
                            <option value="SouthGeorgia">South Georgia & South Sandwich Islands</option>
                            <option value="SouthSudan">South Sudan</option>
                            <option value="Spain">Spain</option>
                            <option value="SriLanka">Sri Lanka</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard&JanMayen">Svalbard & Jan Mayen</option>
                            <option value="Swaziland">Eswatini</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syrian">Syria</option>
                            <option value="Taiwan">Taiwan</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania</option>
                            <option value="Thailand">Thailand</option>
                            <option value="TimorLeste">Timor-Leste</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad&Tobago">Trinidad & Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks&CaicosIslands">Turks & Caicos Islands</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="UAE">United Arab Emirates</option>
                            <option value="UK">United Kingdom</option>
                            <option value="US">United States</option>
                            <option value="USMinor Outlying Islands">U.S. Outlying Islands</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="VietNam">Vietnam</option>
                            <option value="VirginIslands,British">British Virgin Islands</option>
                            <option value="VirginIslands,US">U.S. Virgin Islands</option>
                            <option value="Wallis&Futuna">Wallis & Futuna</option>
                            <option value="WesternSahara">Western Sahara</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                        </select>
                        
                    </label>
                   
                   
                    <Button type='submit'>Register</Button>
                    <br></br>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                    
                    
                </form>

                </div>

                </div>
               
                

            </div>
        </div>
    )
}