import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminPage(){

    const [loading,loaded] = useState(false);
    const [initialisation,finalization] = useState("Loading...");
    const [user_id,setid] = useState("");
    const [user_name,setuser] = useState("");
    const [email,setemail] = useState("");
    const [password,setpass] = useState("");

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

            loaded(true);
            finalization(res.map(aaa=>aaa=aaa));
            console.log();


        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(()=>{
        getAllData();
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
            const body = {user_name,email,password};  
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
    return(
        <div><ToastContainer/>
            <div className='AdminsLay'>
                <h1 className='dashboard'>Dashboard.</h1>
                
                <div className='AdminData'>
                   
                    <div className='UserId'>
                        <h1>UserId</h1>
                        <hr></hr>
                        {loading ? <div className='inner_admin_data'><h3>{initialisation.map(abc=>{return(<div className='inner_id'>{abc.user_id}</div>)} )}</h3></div> : <div>Loading...</div>}
                    </div>
                    <hr></hr>
                    <div className='Username'>
                    <h1>Username</h1>
                    <hr></hr>
                        {loading ? <div className='inner_admin_data'><h3>{initialisation.map(abc=>{return(<div className='inner_username'>{abc.user_name}</div>)} )}</h3></div> : <div>Loading...</div>}
                    </div>
                    <hr></hr>
                    <div className='Email'>
                    <h1>Email</h1>
                    <hr></hr>
                        {loading ? <div className='inner_admin_data'><h3>{initialisation.map(abc=>{return(<div className='inner_email '>{abc.email}</div>)} )}</h3></div> : <div>Loading...</div>}
                    </div>
                    <hr></hr>
                    <div className='Password'>
                    <h1>Password</h1>
                    <hr></hr>
                        {loading ? <div className='inner_admin_data'><h3>{initialisation.map(abc=>{return(<div className='inner_password'>{abc.password}</div>)} )}</h3></div> : <div>Loading...</div>}
                    </div>
                </div>

                <div className='Queries'>
                <div className='deleteusers'>
                    <h3>Delete Users</h3>
                    <form onSubmit={handleSubmit_delete}>
                         UserId:<input
                            placeholder='Enter userId'
                            type="text"
                            value={user_id}
                            onChange={(e) => setid(e.target.value)}
                        />

                        <button type="submit">Submit</button>
                    </form>

                </div>

                <div className='addusers'>
                    <h3>Add Users</h3>
                    <form onSubmit={handleSubmit_add}>
                        Username:<input
                            placeholder='Enter Username'
                            type="text"
                            value={user_name}
                            onChange={(e) => setuser(e.target.value)}
                        />

                        Email:<input
                            placeholder='Enter email'
                            type="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                        />
                        Password:<input
                            placeholder='Enter pass'
                            type="password"
                            value={password}
                            onChange={(e) => setpass(e.target.value)}
                        />

                        <button type="submit">Submit</button>
                    </form>

                </div>

                <div className='userdata'>
                    <h3>Total Users<br></br>{loading ? initialisation.length : <div>Loading...</div>}</h3>
                </div>
                </div>
                

               
            </div>
        </div>
    )
}