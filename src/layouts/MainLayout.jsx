import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const MainLayout = ({isAuthed, onLogout}) => {
    return (
        <>
            <Header isAuthed={isAuthed} onLogout={onLogout} />
            <Outlet />
        </>
    )
}

export default MainLayout;
