export default function MainTheme({ children }){
    return (
         <div className=" animate-changing-page text-center h-[100vh] p-4 px-6 bg-black text-blanc overflow-hidden">
            <div className="h-full w-full lg:w-[70%] xl:w-[50%] mx-auto">
                {children}
            </div>
        </div>
    )

}