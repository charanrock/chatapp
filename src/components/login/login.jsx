import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../lib/firebase'
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";


const login = () => {

    const [avatar, setAvatar] = useState({
        file: null,
        url: ""

    });

    const [loading, setLoading] = useState(false)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const handleAvatar = e => {
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        try{

            const res = await createUserWithEmailAndPassword(auth, email, password);

            const imgUrl = await upload(avatar.file)

            await setDoc(doc(db, "users", res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                Blocked: [],
            });
            await setDoc(doc(db, "userchats", res.user.uid), {
                chats: [],
            });


            toast.success("Account created! you can login now!")  
        }
        catch (err) {
            console.log(err.code)

        }
        finally{
            setLoading(false);
        }
    }
    const handleLogin =async (e) => {
        e.preventDefault();
        setLoading(true)
        try{
            await signInWithEmailAndPassword(auth,email,password);

        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
        finally{
            setLoading(false)
        }
    }


    return (
        <div className="login">
            <div className="items">
                <h2>Welcome back,</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" onChange={ev=>setEmail(ev.target.value)}/>
                    <input type="password" placeholder="Password" name="password"  onChange={ev=>setPassword(ev.target.value)}/>
                    <button disable ={loading}> {loading ? "Loading":"Sign In"}</button>
                </form>
            </div>
            <div className="seperator"></div>
            <div className="items">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="" style={{ width: '60px', borderRadius: '50%' }} />
                        Upload an image</label>
                    <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />
                    <input type="text" placeholder="Username" name="username" onChange={ev => setUsername(ev.target.value)} />
                    <input type="text" placeholder="Email" name="email" onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder="Password" name="password" onChange={ev => setPassword(ev.target.value)} />
                    <button disable ={loading}>{loading ? "Loading":"Sign Up"}</button>
                </form>
            </div>
        </div>
    );
};
export default login