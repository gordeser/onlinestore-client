import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = ({isAuthed, onLogout, price}) => {
    return (
        <>
            <Header isAuthed={isAuthed} onLogout={onLogout} price={price}/>
            <Outlet />
        </>
    )
}

export default MainLayout;
