import { Outlet, Route , Routes , useNavigate } from "react-router-dom";
import Makeblog from "./makeblog";

const Protect = () => {
    const navigate = useNavigate()
    const token = sessionStorage.getItem('username')
    return (token ? (<Outlet />) : (navigate('/login')));
}
 
export default Protect;