import EditForm from "../components/EditProfile/EditForm"
import HomeNavBar from "../components/HomeNavBar"
import NewsPappers from "../components/NewsPappers/NewsPappersSection"
export default async function chezmoi(){
    
    
    return (
        <div className="w-full h-full  relative">
            <div>
                <h1>Mon univers.</h1>
                <HomeNavBar></HomeNavBar>
                <div>
                    <EditForm></EditForm>
                    <NewsPappers></NewsPappers>
                </div>
            </div>
        </div>
    )
}