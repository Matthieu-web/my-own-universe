"use client";


export default function AuthBar() {

  function exitPage(){
    let mainPage = document.getElementsByClassName('animate-changing-page');
    if (mainPage){
        console.log(mainPage[0]);
        mainPage[0].classList.add('animate-exit-page');
        setTimeout(function(){
        location.href='http://localhost:3000/connection'
        },500)   
    }
    
  }

  return (
    <div className="hover:cursor-pointer bg-white anim-btn flex items-center relative border-2 rounded-lg mx-2 bg-white">  
      <button onClick={exitPage} className=" p-2">
        <img src="/fleche.png" alt="" width="40px" />
      </button>
    </div>
  );
}
