import { useEffect, useState } from "react"

export default function StartPage(){

    const [email,setemail] = useState("");

    const handleSubmit = (e)=>{
        e.preventDefault();
        alert(email);
    }

    return (
        <div>
            <div className="startpgLay">
                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hdwallpapers.in%2Fred_light_background_hd_red_aesthetic-wallpapers.html&psig=AOvVaw3jAy_iRAVjp0CO7x1hlxQX&ust=1679224819432000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCNi1jYmu5f0CFQAAAAAdAAAAABAF"></img>
            </div>

                <div className="emailForm">
                                <form>
                                    <label>Email:
                                        <input
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        />
                                    </label>
                                    
                                    <button type="button" onClick={handleSubmit}>Submit</button>
                                </form>
                </div>
                

        </div>
    )
}