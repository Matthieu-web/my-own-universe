"use client"
import { useState } from "react"
import { login } from "@/actions";
import { useRouter } from 'next/navigation'

export default function LoginForm(){
    const router = useRouter();
    const [passwordWarning, setPasswordWarning] = useState("")
    const [emailWarning, setEmailWarning] = useState("")

    const [inputData, setInputData] = useState({
        email: "",
        password: ""
        
    })

     function handleTyping(e : any){
     const {type, name, value} = e.target;
        setInputData((prev) => ({
            ...prev,
            [name]: value
        })) 
    }
    async function handleSubmit(e: any){
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const formSubmit = await login(formData);

        if (formSubmit?.wrongPassword){
            setEmailWarning("");
            setPasswordWarning(formSubmit?.message);
        }
        if (formSubmit?.wrongUser){
            setPasswordWarning("")
            setEmailWarning(formSubmit?.message)
        }
        if (formSubmit?.goodAuth){
            setPasswordWarning("")
            setEmailWarning("");
        }
    }
    

    return (
        <div className="relative z-10 p-4 my-4 flex flex-col items-center text-black items-center justify-center ">    
            
            <form onSubmit={handleSubmit}  className="text-center">
                     <input 
                        name="email"
                        type="email"
                        placeholder="Votre Email..."
                        value={inputData.email || ""}
                        onChange={handleTyping}
                        className=" block border-2 p-2 mx-auto rounded-lg mb-4"
                     />
                     <div className="text-orange-600 mb-4 ">{emailWarning}</div>
                     <input 
                        name="password"
                        type="string"
                        placeholder="Votre Mot de Passe..."
                        value={inputData.password || ""}
                        onChange={handleTyping}
                        className=" block border-2 p-2 mx-auto rounded-lg mb-4"
                     />
                     <div className="text-orange-600 mb-4 ">{passwordWarning}</div>
                    <button 
                        type="submit"
                        className="btn inline-block border-2 px-4 py-2 rounded-lg text-vert border-vert hover:bg-vert hover:text-black hover:border-black"
                    >Se connecter</button>
                    <a href="/inscription" className=" ml-2 text-vert  text-sm">S'inscrire</a>            
            </form>
        </div>
    )
}