import { Link } from "react-router-dom";
import Login from "./login";

export default function ErrorPage(props){
    return (
        <div>
            <h1>{props.status}</h1>
            <div>
                 <h1>{props.err}</h1>
                 <Link to="/login"><button>Login</button></Link>
            </div>
        </div>
    )
}