"use client"
import { logout } from "@/actions";

export default function LogoutForm(){

    return (
        <form action={logout} className="inline-block">
            <button className=" text-violetclair">
                <img src="exit.png" alt="" className="w-[40px] h-[40px]" />
            </button>
        </form>
    )
}