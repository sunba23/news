import Form from './components/Form'
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function SettingsPage(){
    return(
        <>
        <div className="flex min-h-screen w-full bg-gray-100">
        <Sidebar />
        <div className="flex flex-1 flex-col">
            <Header />
            <Form/>
        </div>
        </div>
        </>
    )
}