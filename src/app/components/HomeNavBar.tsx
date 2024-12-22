"use client"
import { toggleEditForm, toggleNewsPapersSection } from "../js/functions";


export default function HomeNavBar(){
    return (
        <div className="text-left">
            <nav>
                <button 
                className="mx-2" 
                onClick={toggleEditForm}>
                    <img 
                    src="edituser.png" 
                    alt=""
                    className="w-[30px] h-[30px]" 
                    />
                </button>

                 <button 
                 className="mx-2" 
                 onClick={toggleNewsPapersSection}>
                    <img 
                    src="profil.png" 
                    alt=""
                    className="w-[30px] h-[30px]" 
                    />
                </button>
            </nav>
        </div>
    )
}