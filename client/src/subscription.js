import React, { useState ,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Subcribe(){

const [cardnum,setcardnum] = useState("");
const [firstname,setfirstname] = useState("");
const [lastname,setlastname]=useState("")
const [validUpto,setvalidUpto] = useState("");
const [cvv,setcvv] = useState("");
const [mytoken,setotp]=useState("");
const [detect,setdetect]=useState(false)

const [checkcarddetails,setcarddetails] = useState(false);
const [checkqrdetails,setqrdetails] = useState(false);

const [hiddendetails,sethiddendetails]=useState(false);

const [validateotp,setvalidateotp] = useState("");

const ref1 = React.useRef();
const ref2 = React.useRef();

const navigate = useNavigate();

const [paysuccesscol,setpaysuccesscol]=useState("primary")
const [paysuccessstatus,setpaysuccessstatus]=useState("Pay Now")
const [subscribesuccesscol,setsubscribesuccesscol]=useState("primary")
const [subscribesuccesscol2,setsubscribesuccesscol2]=useState("primary")
const [subscriptionsuccessstatus,setsubscriptionsuccessstatus]=useState("Subscribe Now")
const [verfiycol,setverifylcol]=useState("primary")
const [verfiystatus,setverifylstatus]=useState("Verify")

const [subscription_name,setsubname]=useState("")
const [subscription_price,setprice] = useState("");
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const [showPayment1, setShowPayment1] = useState(false);
const handleClosePay1 = () => {setShowPayment1(false)
   
};
const handleShowPay1 = () => {setShowPayment1(true)
setsubname("Saving Pack")
setprice(199)
   
};

const [showPayment2, setShowPayment2] = useState(false);
const handleClosePay2 = () => {setShowPayment2(false)
  
};
const handleShowPay2 = () => {setShowPayment2(true)
    setsubname("Standard Pack")
    setprice(399)
   
};

const [showPayment3, setShowPayment3] = useState(false);
const handleClosePay3 = () => {setShowPayment3(false)
    
};
const handleShowPay3 = () => {setShowPayment3(true)
    setsubname("Premium Pack")
    setprice(999)
    
};

const [showOTP, setShowOTP] = useState(false);
const handleCloseOTP = () => setShowOTP(false);
const handleShowOTP = () => setShowOTP(true);

const [paybycard,setcard]=useState(true)
const [paybyqr,setqr] = useState(false)

const card = React.useRef();
var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
var amexpRegEx = /^(?:3[47][0-9]{13})$/;
var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

//ref1.current.style.backgroundColor = "lightgreen"
//ref2.current.style.backgroundColor = "white"

const cardpayment = ()=>{
    setcard(true)
    setqr(false)
    ref1.current.style.backgroundColor = "lightgreen"
    ref2.current.style.backgroundColor = "white"
}

const qrpayment=()=>{
    setcard(false)
    setqr(true)
    ref1.current.style.backgroundColor = "white"
    ref2.current.style.backgroundColor = "lightgreen"
}

const if_subscribed = ()=>{
    navigate("/middle");
}

const verfiyOTP = async event=>{
    event.preventDefault()

    try {
        
        const body = {mytoken}
        const res = await toast.promise(fetch("http://localhost:5000/verifyotp",{
            method:"POST",
            body:JSON.stringify(body),
            headers: { Authorization: `Bearer ${mytoken}`,
            otp_token: mytoken,
            "Content-Type":"application/json"
        },
            
        }),{
            pending:"Loading...",
            success:"Connected",
            error:"Error"
        });
        const result = await res.json();

        if(!res.ok){
            toast.error("OTP is not Valid", {
                position: "bottom-left",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                //handleCloseOTP()
            return
        }

        console.log(validateotp)
        console.log(result)

            if(result===validateotp){
                handleClosePay1()
                handleClosePay2()
                handleClosePay3()
                toast.success("OTP Validation Confirm", {
                    position: "bottom-left",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
                    //setdetect(true)
                    setverifylcol("success")
                    setverifylstatus("Verified Successfully✔️")
                    const dosubscribe = await subscribe();
            }
        

    } catch (error) {
        toast.error("Something went Wrong", {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
}

const sendOTP= async (e)=>{
    //e.preventDefault()
    try {
        const token = localStorage.getItem('jwt_token');
        if (!token) return;
        const res = await toast.promise(fetch("http://localhost:5000/sendotp",{
            method:"POST",
            headers: { Authorization: `Bearer ${token}`,
            jwt_token: token
        },
        }),{
            pending:"Sending Mail...",
            success:"Mail Sent",
            error:"Error"
        });

        const parseRes = await res.json();
        console.log(parseRes.genOTP)
        const otp_to_check = parseRes.genOTP;

        const body = {otp_to_check}
        const resp = await toast.promise(fetch("http://localhost:5000/verifyotp",{
            method:"POST",
            body:JSON.stringify(body),
            headers: { Authorization: `Bearer ${otp_to_check}`,
            otp_token: otp_to_check,
            "Content-Type":"application/json"
        },
            
        }),{
            pending:"Loading...",
            success:"Connected",
            error:"Error"
        });
        const result = await resp.json();
        setvalidateotp(result);
        console.log(result)
        if(!res.ok){
            return
        }

        toast.success("OTP has been send to your Email", {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        handleShowOTP();
        setsubscribesuccesscol("success")
        setTimeout(handleClosePay1(),3000);
        setTimeout(handleClosePay2(),3000);
        setTimeout(handleClosePay3(),3000);



    } catch (error) {
        toast.error("OTP Error", {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
}

const checkSubscription= async (e)=>{
    try {
        const token = localStorage.getItem('jwt_token');
        const subscriberData = await fetch("http://localhost:5000/subscriberData",{
            method:"POST",
            headers: { Authorization: `Bearer ${token}`,
            jwt_token: token
        },
        });

        if (!subscriberData) return;

        const newtoken = await subscriberData.json();
        //console.log(newtoken.subscription_id)
        
        if(newtoken!=="Not Subscribed"){
            try {
                const res = await fetch("http://localhost:5000/subscriptionCheck",{
                method:"POST",
                headers: { Authorization: `Bearer ${newtoken.subscription_id}`,
                subscription_token: newtoken.subscription_id
                },
                });

                const response = await res.json();
                if(!res.ok){
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
                        
                        
                    
                }

                if(response===true){
                    toast.success("Subscription Validated✔️", {
                        position: "bottom-left",
                        autoClose: 4000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                        setTimeout(if_subscribed,2000);
                }
            } catch (error) {
                console.log(error.message);
                toast.error(error.message, {
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
    } catch (error) {
        console.log(error.message);
        toast.error(error.message, {
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

const subscribe = async (e)=>{
    //e.preventDefault();
    try {
        const token = localStorage.getItem('jwt_token');
        if (!token) return;
        
        const body = {subscription_name,subscription_price}
        const res = await toast.promise(fetch("http://localhost:5000/subscribe",{
            method:"POST",
            body:JSON.stringify(body),
            headers: { Authorization: `Bearer ${token}`,
            jwt_token: token,
            "Content-Type":"application/json"
        },
            
        }),{
            pending:"Loading...",
            success:"Connected",
            error:"Error"
        });

        const response = await res.json();
        if(!res.ok){
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
        if(subscription_price===199){
            handleClosePay1()
        }else if(subscription_price===399){
            handleClosePay2()
        }else{
            handleClosePay3()
        }
        
        toast.success(`${response}🚀 `, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            setsubscriptionsuccessstatus("Subscribtion Successful✔️")
            setsubscribesuccesscol2("success")
            checkSubscription();
        
       
    } catch (error) {
        toast.error(error.message, {
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

  async function ValidateCreditCardNumber(cardval) {

    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    var amexpRegEx = /^(?:3[47][0-9]{13})$/;
    var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    var isValid = false;
  
    if (visaRegEx.test(cardval)) {
        
      isValid = true;
    } else if(mastercardRegEx.test(cardval)) {
       
      isValid = true;
    } else if(amexpRegEx.test(cardval)) {
        
      isValid = true;
    } else if(discovRegEx.test(cardval)) {
      
      isValid = true;
    }
  
    if(isValid) {
       setcarddetails(true)
       setpaysuccesscol("success")
       setpaysuccessstatus("Payment Successful")
       const send = await sendOTP();
       console.log(send)
    } else {
        toast.info(`Please provide a valid Visa number!`, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
    })
    };
       
    
  }

const authenticateCard=(e)=>{
    e.preventDefault();
    if(firstname!="" && validUpto!="" && cardnum.length===16 && cvv.length===3){
        ValidateCreditCardNumber(cardnum)
        if(detect===true){
            toast.success(`Payment Successful`, {
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
    
        

    }else{
        toast.warn(`Please enter your Credentials`, {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
    })
    };

}

useEffect(()=>{
    checkSubscription();
},[])

    return(
        
        <div className="subcritionlay"><ToastContainer/>

                    <Modal
                        show={showOTP}
                        onHide={handleCloseOTP}
                        backdrop="static"
                        keyboard={false}
                        centered
                        size="lg"
                    >
                       <Modal.Header>
                            <Modal.Title>Verify OTP</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form className='savingform' onSubmit={verfiyOTP}>
                                <div className='savingformrefresh'>
                                    
                                <label>OTP<input
                                    type='text'
                                    value={mytoken}
                                    onChange={(e)=>setotp(e.target.value)}
                                    placeholder='Enter OTP'
                                /></label>
                                <img src='refresh.png' width="25px" onClick={sendOTP}></img>
                                </div>
                               

                                <Button type="submit" variant={verfiycol}>{verfiystatus}</Button>
                                
                            </form>
                            
                        </Modal.Body>

                        {/* <Modal.Footer>
                        {detect &&
                                    <Button onClick={subscribe} variant={subscribesuccesscol2}>{subscriptionsuccessstatus}</Button>
                                }
                        </Modal.Footer> */}

                    </Modal>
            <h1 className='topsubscribe'>Do you also hate inturrupts? <br></br>
            Check out our latest packs to keep you moving on.</h1>
            <Modal show={show} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title><h1><strong>Terms & Conditions</strong></h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <p>Welcome to Chillax!</p>
            <p>These terms and conditions outline the rules and regulations for the use of Chillax Ltd.'s Website, located at http://localhost:3000/homepage.</p>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Chillax if you do not agree to take all of the terms and conditions stated on this page.</p>
            <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of in. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>
            <h3><strong>Cookies</strong></h3>
            <p>We employ the use of cookies. By accessing Chillax, you agreed to use cookies in agreement with the Chillax Ltd.'s Privacy Policy. </p>
            <p>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>
            <h3><strong>License</strong></h3>
            <p>Unless otherwise stated, Chillax Ltd. and/or its licensors own the intellectual property rights for all material on Chillax. All intellectual property rights are reserved. You may access this from Chillax for your own personal use subjected to restrictions set in these terms and conditions.</p>
            <p>You must not:</p>
            <ul>
                <li>Republish material from Chillax</li>
                <li>Sell, rent or sub-license material from Chillax</li>
                <li>Reproduce, duplicate or copy material from Chillax</li>
                <li>Redistribute content from Chillax</li>
            </ul>
            <p>This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the <a href="https://www.termsfeed.com/terms-conditions-generator/">Terms and Conditions Generator</a>.</p>
            <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Chillax Ltd. does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Chillax Ltd.,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Chillax Ltd. shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
            <p>Chillax Ltd. reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>
            <p>You warrant and represent that:</p>
            <ul>
                <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>
                <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>
                <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>
                <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>
            </ul>
            <p>You hereby grant Chillax Ltd. a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>
            <h3><strong>Hyperlinking to our Content</strong></h3>
            <p>The following organizations may link to our Website without prior written approval:</p>
            <ul>
                <li>Government agencies;</li>
                <li>Search engines;</li>
                <li>News organizations;</li>
                <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
            </ul>
            <p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party's site.</p>
            <p>We may consider and approve other link requests from the following types of organizations:</p>
            <ul>
                <li>commonly-known consumer and/or business information sources;</li>
                <li>dot.com community sites;</li>
                <li>associations or other groups representing charities;</li>
                <li>online directory distributors;</li>
                <li>internet portals;</li>
                <li>accounting, law and consulting firms; and</li>
                <li>educational institutions and trade associations.</li>
            </ul>
            <p>We will approve link requests from these organizations if we decide that: (a) the link would not make us look unfavorably to ourselves or to our accredited businesses; (b) the organization does not have any negative records with us; (c) the benefit to us from the visibility of the hyperlink compensates the absence of Chillax Ltd.; and (d) the link is in the context of general resource information.</p>
            <p>These organizations may link to our home page so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party's site.</p>
            <p>If you are one of the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Chillax Ltd.. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you intend to link to our Website, and a list of the URLs on our site to which you would like to link. Wait 2-3 weeks for a response.</p>
            <p>Approved organizations may hyperlink to our Website as follows:</p>
            <ul>
                <li>By use of our corporate name; or</li>
                <li>By use of the uniform resource locator being linked to; or</li>
                <li>By use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site.</li>
            </ul>
            <p>No use of Chillax Ltd.'s logo or other artwork will be allowed for linking absent a trademark license agreement.</p>
            <h3><strong>iFrames</strong></h3>
            <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>
            <h3><strong>Content Liability</strong></h3>
            <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>
            <h3><strong>Reservation of Rights</strong></h3>
            <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>
            <h3><strong>Removal of links from our website</strong></h3>
            <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>
            <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>
            <h3><strong>Disclaimer</strong></h3>
            <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
            <ul>
                <li>limit or exclude our or your liability for death or personal injury;</li>
                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>
            <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>
            <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
                    
        </Modal.Body>
      </Modal>

      <Modal show={showPayment1} onHide={handleClosePay1} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title><h1><strong>Payment Gateway</strong></h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='paymentoptions'>
                <button onClick={cardpayment} ref={ref1} className='b1'><h4><img src='atm-card.png' width="35px"></img> Card Payment</h4></button>
                <button onClick={qrpayment} ref={ref2}><h4><img src="qr-code.png" width="35px"></img> Google Pay</h4></button>
            </div>
            <div className='savingbox'>
                {paybycard && <div className='savingcred'>
            
                    <form className='savingform' onSubmit={authenticateCard}>
                    <h3>Card Credentials</h3>
                    <br></br>
                    <label>Name on Card
                            <input
                                type='text'
                                value={firstname}
                                onChange={(e)=>setfirstname(e.target.value)}
                                placeholder='Enter Name on Card'
                        /></label>
                        <label>Valid Upto
                            <input
                                type='month'
                                min="1990-06"
                                max="2040-09"
                                value={validUpto}
                                onChange={(e)=>setvalidUpto(e.target.value)}
                                placeholder='Enter valid Upto'
                        /></label>
                        <label>Card Number
                        <div className='carddetails'>
                            <img src='creditcard.png' ref={card} width="40px"></img>
                            <input 
                                type='number'
                                value={cardnum}
                                max="9999999999999999"
                                min="1000000000000000"
                                onChange={(e)=>{setcardnum(e.target.value)
                                    if (visaRegEx.test(e.target.value)) {
                                        card.current.src="visa.png"
                                      } else if(mastercardRegEx.test(e.target.value)) {
                                        card.current.src="mc_symbol.svg"
                                      } else if(amexpRegEx.test(e.target.value)) {
                                        card.current.src="ae.png"
                                      } else if(discovRegEx.test(e.target.value)) {
                                        card.current.src="discover.png"
                                      }else{
                                        card.current.src="creditcard.png"
                                      }}}
                                placeholder='1234123412341234'
                            />
                            
                            
                            </div>
                            </label>

                        <label>Security Code
                            <input
                                type='password'
                                value={cvv}
                                max="999"
                                min="100"
                                onChange={(e)=>setcvv(e.target.value)}
                                placeholder='CVC'
                            /></label>
                            
                          
                            
                            <h3><br></br>Subscription Details</h3>
                            <br></br>
                            <label>Subscription Pack
                            <input
                                type='text'
                                value="Saving Pack"
                                placeholder='Saving Pack'
                                onChange={(e)=>setsubname(e.target.value)}
                                disabled
                               
                            /></label>

                        <label>Price
                            <input
                                type='number'
                                value="199"
                                placeholder='199.00'
                                onChange={(e)=>setprice(e.target.value)}
                                disabled
                                
                            /></label>
                            <Button variant={subscribesuccesscol} type='submit'>Pay Now</Button>
                    </form>
                </div>}

                {paybyqr && <div>
                        <h1>Qr Payment</h1>
                        <div className='savingcred'>
                    <form className='savingform' onSubmit={sendOTP}>
                    <label>First Name
                            <input
                                type='text'
                                value={firstname}
                                onChange={(e)=>setfirstname(e.target.value)}
                                placeholder='Enter First Name'
                        /></label>
                        <label>Last Name
                            <input
                                type='text'
                                value={lastname}
                                onChange={(e)=>setlastname(e.target.value)}
                                placeholder='Enter Last Name'
                        /></label>
            </form>
            <form className='savingform' onSubmit={sendOTP}>
                             <h3><br></br>Subscription Details</h3>
                            <br></br>
                            <label>Subscription Pack
                            <input
                                type='text'
                                value="Saving Pack"
                                placeholder='Saving Pack'
                                disabled
                               
                            /></label>

                        <label>Price
                            <input
                                type='number'
                                value="199"
                                placeholder='199.00'
                                disabled
                            /></label>
                            <button type='submit'>Purchase</button>
                    </form>
                </div>
                    </div>}
                <div className='packagesave'>
                    
                        <h1>Checkout - ₹199.00</h1>
                        <h3>Saving Pack</h3>
                        <hr></hr>
                        <p>A pack which contains -</p>
                        <li>Custom Theme ✔️</li>
                        <li>Movies/Series- 50+ ✔️</li>
                        <li>Genre/Category - 3 ✔️</li>
                        <li>Video Quality- 720p ✔️</li>
                        <li>Tenure - 1 Month ✔️</li>
                        <li>Download Available ❌</li>
                        <li>User-Based Recommendation ❌</li>
                </div>
            </div>
               
        </Modal.Body>
      </Modal>

      <Modal show={showPayment2} onHide={handleClosePay2} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title><h1><strong>Payment Gateway</strong></h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='paymentoptions'>
                <button onClick={cardpayment} ref={ref1} className='b1'><h4><img src='atm-card.png' width="35px"></img> Card Payment</h4></button>
                <button onClick={qrpayment} ref={ref2}><h4><img src="qr-code.png" width="35px"></img> Google Pay</h4></button>
            </div>
        <div className='savingbox'>
                {paybycard &&<div className='savingcred'>
                    <form className='savingform' onSubmit={authenticateCard}>
                    <h3>Card Credentials</h3>
                    <br></br>
                    <label>Name on Card
                            <input
                                type='text'
                                value={firstname}
                                onChange={(e)=>setfirstname(e.target.value)}
                                placeholder='Enter Name on Card'
                        /></label>
                        <label>Valid Upto
                            <input
                                type='month'
                                min="1990-06"
                                max="2040-09"
                                value={validUpto}
                                onChange={(e)=>setvalidUpto(e.target.value)}
                                placeholder='Enter validUpto'
                        /></label>
                        <label>Card Number
                        <div className='carddetails'>
                            <img src='creditcard.png' ref={card} width="40px"></img>
                            <input 
                                type='number'
                                value={cardnum}
                                max="9999999999999999"
                                min="1000000000000000"
                                onChange={(e)=>{setcardnum(e.target.value)
                                    if (visaRegEx.test(e.target.value)) {
                                        card.current.src="visa.png"
                                      } else if(mastercardRegEx.test(e.target.value)) {
                                        card.current.src="mc_symbol.svg"
                                      } else if(amexpRegEx.test(e.target.value)) {
                                        card.current.src="ae.png"
                                      } else if(discovRegEx.test(e.target.value)) {
                                        card.current.src="discover.png"
                                      }else{
                                        card.current.src="creditcard.png"
                                      }}}
                                placeholder='1234123412341234'
                            />
                            
                            </div>
                            </label>

                        <label>Security Code
                            <input
                                type='password'
                                value={cvv}
                                max="999"
                                min="100"
                                onChange={(e)=>setcvv(e.target.value)}
                                placeholder='CVC'
                            /></label>
                
                          
                             <h3><br></br>Subscription Details</h3>
                            <br></br>
                            <label>Subscription Pack
                            <input
                                type='text'
                                value="Standard Pack"
                                placeholder='Standard Pack'
                                disabled
                               
                            /></label>

                        <label>Price
                            <input
                                type='number'
                                value="399"
                                placeholder='399.00'
                                disabled
                            /></label>
                            <Button variant={subscribesuccesscol} type='submit'>Pay Now</Button>
                    </form>
                </div>}
                {paybyqr && <div>
                        <h1>Qr Payment</h1>
                        <div className='savingcred'>
                    <form className='savingform' onSubmit={sendOTP}>
                    <label>First Name
                            <input
                                type='text'
                                value={firstname}
                                onChange={(e)=>setfirstname(e.target.value)}
                                placeholder='Enter First Name'
                        /></label>
                        <label>Last Name
                            <input
                                type='text'
                                value={lastname}
                                onChange={(e)=>setlastname(e.target.value)}
                                placeholder='Enter Last Name'
                        /></label>
            
                             <h3><br></br>Subscription Details</h3>
                            <br></br>
                            <label>Subscription Pack
                            <input
                                type='text'
                                value="Standard Pack"
                                placeholder='Standard Pack'
                                disabled
                               
                            /></label>

                        <label>Price
                            <input
                                type='number'
                                value="399"
                                placeholder='399.00'
                                disabled
                            /></label>
                            <button type='submit'>Purchase</button>
                    </form>
                </div>
                    </div>}
                <div className='packagesave'>
                
                <h1>Checkout - ₹399.00</h1>
                <h3>Standard Pack</h3>
                    <hr></hr>
                    <p>A pack which contains -</p>
                    <li>Custom Theme ✔️</li>
                    <li>Movies/Series - 150+ ✔️</li>
                    <li>Genre/Category - 8 ✔️</li>
                    <li>Video Quality- 1080p ✔️</li>
                    <li>Tenure - 3 Month ✔️</li>
                    <li>Download Available ✔️</li>
                    <li>User-Based Recommendation ❌</li>
                </div>
            </div>
        </Modal.Body>
      </Modal>

      <Modal show={showPayment3} onHide={handleClosePay3} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title><h1><strong>Payment Gateway</strong></h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='paymentoptions'>
                <button onClick={cardpayment} ref={ref1} className='b1'><h4><img src='atm-card.png' width="35px"></img> Card Payment</h4></button>
                <button onClick={qrpayment} ref={ref2}><h4><img src="qr-code.png" width="35px"></img> Google Pay</h4></button>
            </div>
          <div className='savingbox'>
            {paybycard &&
                <div className='savingcred'>
                    <form className='savingform' onSubmit={authenticateCard}>
                    <h3>Card Credentials</h3>
                    <br></br>
                    <label>Name on Card
                            <input
                                type='text'
                                value={firstname}
                                onChange={(e)=>setfirstname(e.target.value)}
                                placeholder='Enter Name on Card'
                        /></label>
                        <label>Valid Upto
                            <input
                                type='month'
                                min="1990-06"
                                max="2040-09"
                                value={validUpto}
                                onChange={(e)=>setvalidUpto(e.target.value)}
                                placeholder='Expire Date'
                        /></label>
                        <label>Card Number
                            <div className='carddetails'>
                            <img src='creditcard.png' ref={card} width="40px"></img>
                            <input 
                                type='number'
                                value={cardnum}
                                max="9999999999999999"
                                min="1000000000000000"
                                onChange={(e)=>{setcardnum(e.target.value)
                                    if (visaRegEx.test(e.target.value)) {
                                        card.current.src="visa.png"
                                      } else if(mastercardRegEx.test(e.target.value)) {
                                        card.current.src="mc_symbol.svg"
                                      } else if(amexpRegEx.test(e.target.value)) {
                                        card.current.src="ae.png"
                                      } else if(discovRegEx.test(e.target.value)) {
                                        card.current.src="discover.png"
                                      }else{
                                        card.current.src="creditcard.png"
                                      }}}
                                placeholder='1234123412341234'
                            />
                            
                            </div>
                           </label>

                        <label>Security code
                            <input
                                type='password'
                                value={cvv}
                                max="999"
                                min="100"
                                onChange={(e)=>setcvv(e.target.value)}
                                placeholder='CVC'
                            /></label>
                            
                            
                             <h3><br></br>Subscription Details</h3>
                            <br></br>
                            <label>Subscription Pack
                            <input
                                type='text'
                                value="Premium Pack"
                                placeholder='Premium Pack'
                                disabled
                               
                            /></label>

                        <label>Price
                            <input
                                type='number'
                                value="999"
                                placeholder='999.00'
                                disabled
                            /></label>
                            <Button variant={subscribesuccesscol} type='submit'>Pay Now</Button>
                    </form>
                </div>}
                {paybyqr && <div>
                        <h1>Qr Payment</h1>
                        <div className='savingcred'>
                    <form className='savingform' onSubmit={sendOTP}>
                    <label>First Name
                            <input
                                type='text'
                                value={firstname}
                                onChange={(e)=>setfirstname(e.target.value)}
                                placeholder='Enter First Name'
                        /></label>
                        <label>Last Name
                            <input
                                type='text'
                                value={lastname}
                                onChange={(e)=>setlastname(e.target.value)}
                                placeholder='Enter Last Name'
                        /></label>
            
                             <h3><br></br>Subscription Details</h3>
                            <br></br>
                            <label>Subscription Pack
                            <input
                                type='text'
                                value="Premium Pack"
                                placeholder='Premium Pack'
                                disabled
                               
                            /></label>

                        <label>Price
                            <input
                                type='number'
                                value="999"
                                placeholder='999.00'
                                disabled
                            /></label>
                            <button type='submit'>Purchase</button>
                    </form>
                </div>
                    </div>}
                <div className='packagesave'>
                
                <h1>Checkout - ₹999.00</h1>
                <h3>Premium Pack</h3>
                    <hr></hr>
                    <p>A pack which contains -</p>
                    <li>Custom Theme ✔️</li>
                    <li>Movies/Series - 300 ✔️</li>
                    <li>Genre/Category - 14 ✔️</li>
                    <li>Video Quality- UHD ✔️</li>
                    <li>Tenure - 12 Month ✔️</li>
                    <li>Download Available ✔️</li>
                    <li>User-Based Recommendation ✔️</li>
                </div>
            </div>
        </Modal.Body>
      </Modal>
            <div className="features">
                
                <div className="subscribebox">
                    <h3>Saving Pack</h3>
                    <h1>₹199</h1>
                    <hr></hr>
                    <p>A pack which contains -</p>
                    <li>Custom Theme ✔️</li>
                    <li>Movies/Series - 50+ ✔️</li>
                    <li>Genre/Category - 3 ✔️</li>
                    <li>Video Quality- 720p ✔️</li>
                    <li>Tenure - 1 Month ✔️</li>
                    <li>Download Available ❌</li>
                    <li>User-Based Recommendation ❌</li>
                    <br></br>
                    <Button onClick={handleShowPay1}>Purchase</Button>
                    <br></br>
                    <small><button onClick={handleShow}>Terms & Conditions Appiled*</button></small>
                </div>
                <div className="subscribebox">
                    <h3>Standard Pack</h3>
                    
                    <h1>₹399</h1>
                    <hr></hr>
                    <p>A pack which contains -</p>
                    <li>Custom Theme ✔️</li>
                    <li>Movies/Series - 150+ ✔️</li>
                    <li>Genre/Category - 8 ✔️</li>
                    <li>Video Quality- 1080p ✔️</li>
                    <li>Tenure - 3 Month ✔️</li>
                    <li>Download Available ✔️</li>
                    <li>User-Based Recommendation ❌</li>
                    <br></br>
                    
                    <Button onClick={handleShowPay2}>Purchase</Button>
                    <br></br>
                    <small><button onClick={handleShow}>Terms & Conditions Appiled*</button></small>
                </div>
                <div className="subscribebox">
                    <h3>Premium Pack</h3>
                    <h1>₹999</h1>
                    <hr></hr>
                    <p>A pack which contains -</p>
                    <li>Custom Theme ✔️</li>
                    <li>Movies/Series - 300 ✔️</li>
                    <li>Genre/Category - 14 ✔️</li>
                    <li>Video Quality- UHD ✔️</li>
                    <li>Tenure - 12 Month ✔️</li>
                    <li>Download Available ✔️</li>
                    <li>User-Based Recommendation ✔️</li>
                    <br></br>
                    
                    <Button onClick={handleShowPay3}>Purchase</Button>
                    <br></br>
                    <small><button onClick={handleShow}>Terms & Conditions Appiled*</button></small>
                </div>
            </div>
        </div>
    )
}