import { AppHeader } from "./AppHeader"
import { AppSideMenu } from "./AppSideMenu"

export const AppLayout = ({ children }) => {
    return <div className="flex flex-col bg-black h-screen">
        <AppHeader/>
        <div className="flex w-full h-full">
        <AppSideMenu/>
        <div className="m-5 w-full overflow-y-auto">
        {children}
        </div>
       
        </div>
        
    </div>


}