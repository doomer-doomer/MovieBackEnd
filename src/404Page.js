import { useRef } from "react";
import { Link } from "react-router-dom";
import Login from "./login";

export default function ErrorPage(props){

    return (
        <div className="errorbody">
         <figure>
	<div class="sad-mac"></div>
	<figcaption>
		<span class="sr-text">Error 404: Not Found</span>
		<span class="e"></span>
		<span class="r"></span>
		<span class="r"></span>
		<span class="o"></span>
		<span class="r"></span>
		<span class="_4"></span>
		<span class="_0"></span>
		<span class="_4"></span>
		<span class="n"></span>
		<span class="o"></span>
		<span class="t"></span>
		<span class="f"></span>
		<span class="o"></span>
		<span class="u"></span>
		<span class="n"></span>
		<span class="d"></span>

      
	</figcaption>
    
            <div className="errorbtn">
                 {/* <h1>{props.err}</h1> */}
                 <img src="hand-pointer.png" width="50px" ></img>
                 <Link to="/login"><button className="mybtn">Session Expired !</button></Link>
            </div>
</figure>
            
        </div>
    )
}