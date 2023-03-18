import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Middle(){

    const navigate = useNavigate();

    function render(){
        navigate('/Homepage');
    }

    useEffect(()=>{
        render();
    },[])
    return(
        <div></div>
    )
}