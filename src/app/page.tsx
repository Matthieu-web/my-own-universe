import Image from "next/image";
import AuthBar from "./components/AuthBar";
import { getSession, logout } from "@/actions";
import LogoutForm from "./components/LogoutForm";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="w-full h-full z-0 relative">
      <div className="z-10 relative h-[50%] flex flex-col items-center justify-center ">
        <div className=" w-4/5  rotate-[5deg] flex items-center bg-rose p-2 rounded-lg text-left ">
          <div className="w-[50px] h-[50px] flex-none bg-violet p-2 rounded-lg inline-block">
            <img src="/fillequiparle.png" alt="" />
          </div>
          <div className="inline-block w-[65%] h-full text-violet ml-4 my-auto flex items-center">
            <p className="">Salut tout le monde, j'ai une question ...</p>
          </div>
        </div>

        <div className="w-4/5 mb-2 rotate-[-3deg] flex items-center bg-saumon p-2 rounded-lg text-left">
          <div className=" w-[50px] h-[50px] flex-none bg-violet p-2 rounded-lg inline-block">
            <img src="/garconquiparle.png" alt="" />
          </div>
          <div className="inline-block text-violet ml-4 my-auto">
            <p>Appel dans 10 minutes ?</p>
          </div>
        </div>
      </div>

      <div className="h-[30%] flex flex-col items-center justify-center relative">
        <img
          className="z-0 w-[60px] sm:w-[110px] left-0 top-8 absolute"
          id="maison"
          src="maison2.png"
          alt=""
        />
        <img
          className="z-0 w-[50px] sm:w-[100px] right-0 bot-0 absolute"
          id="fleur"
          src="fleur.png"
          alt=""
        />
        <img
          className="z-0 w-[100px] sm:w-[200px] sm:top[-8rem]  right-[calc(25% - 60)] sm:right-[calc(50% -100)] top-[-4rem] absolute"
          id="arbre"
          src="arbre.png"
          alt=""
        />

        <h2 className="z-10 mb-4 [text-shadow:_0_0_4px_rgb(0_0_0);]">
          Crée ton propre Monde
        </h2>
        <p className="z-10 text-vert mb-8">
          Certaines rencontres peuvent changer une vie!
        </p>
      </div>

      <div className="fixed relative z-20 h-[20%] flex items-center justify-center w-full left-0">
        {!session.isLoggedIn && <AuthBar />}
        {session.isLoggedIn && <LogoutForm  />}
      </div>
    </div>
  );
}
