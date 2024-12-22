import LoginForm from '../components/LoginForm';
export default function inscription(){
    return   (
    <div className="z-0 relative p-4 w-full h-full flex flex-col items-center justify-center">
         <div className="relative flex flex-row items-center justify-center">
          
            <img
                className="relative left-[1rem] z-0 w-[150px] sm:w-[200px] m-auto"
                id="book-smiley"
                src="smileybook.png"
                alt=""
                />
        </div>
        <div className="z-10">
            <h1 className="my-6 z-10">Connection</h1>
            <div className="relative ">           
                <LoginForm></LoginForm> 
            </div>
        </div>
      
  </div>)
}