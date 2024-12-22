import Link from "next/link"
import LogoutForm from "./LogoutForm"
import { getSession } from "@/actions"
import { toggleNavMenu } from "../js/functions";

export default async function NavBar() {
    const session = await getSession();
    
    return (
            <nav className="mb-4 relative flex flex-row items-center justify-content space-x-4">
                <img id="button-nav-menu" onClick={toggleNavMenu} className="inline-block z-20 cursor-pointer rotate w-[40px] h-[40px] left-0 top-0"src="menu.png" alt="" />
                <div  id="nav-menu"  className="  relative left-[-100vw] flex flex-row items-center justify-center">
                    {session.isLoggedIn &&<Link className="inline-block w-[40px] h-[40px] p-0"href="/mon-univers"><img className="w-[40px] h-[40px]" src="home.png" alt="" /></Link>}
                    {!session.isLoggedIn &&<Link className="inline-block p-0"href="/connection">Connection</Link>}
                    {!session.isLoggedIn && <Link className="inline-block p-0"href="/inscription">S'inscrire</Link>}
                    {session.isLoggedIn && <LogoutForm  />}
                </div>
            </nav>

    )
}