import { useRef } from "react";
import { Link } from "react-router-dom";
import Login from "./login";
import Button from 'react-bootstrap/Button';

export default function ErrorPage(props){

    return (
        <div className="totalerrorlay">
			<img src="redbg.jpg" width="100%"></img>
			<div className="errorlay">
				<span><img src="expired.png" width="50px"></img>Session Expired</span>
				<br></br>
				<p>Your Session has been over. Click below to login again.</p>
				<Link to="/login"><Button className="mybtn">Login</Button></Link>
				<div className="errorbtn">
						
						{/* <h1>{props.err}</h1> */}
						
						
				</div>
			</div>
		</div>
    
           

    )
}