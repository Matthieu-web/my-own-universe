import InscriptionForm from "../components/InscriptionForm"
export default function inscription(){
    return   (
    <div className="z-0 relative p-4 w-full h-full flex flex-col items-center justify-center">
        
        <div className="z-10">
            <h1 className="my-6 z-10">Inscription</h1>
            <div className="">           
                <InscriptionForm></InscriptionForm>
            </div>
        </div>
      
  </div>)
}