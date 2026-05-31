import { Outlet,useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import {BASE_URL} from "../utils/constants";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";
import {useEffect} from "react";


// =====================================
// Body Component
//
// Main layout component of the app.
// Renders Navbar, Footer and
// current page content.
// =====================================

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 // Fetch logged-in user data
 const fetchUser = async ()  => {
      try{ 
        const res = await axios.get(BASE_URL + "/profile/view",{
             withCredentials: true,
       });

       // Store user data in Redux
       dispatch(addUser(res.data));


      }catch(err){

        // Redirect to login if user
        // is not authenticated
        if(err.status == 401){
          navigate("/login");
        }
        
        console.log(err);
      }
 };

  // Run when component loads
  useEffect(() => {
    fetchUser();
  }, []);


  return (    
    <div>

        {/* Navigation Bar */}
        <NavBar />

        {/* Current Route Content */}
        <Outlet/>

        {/* Footer */}
       <Footer/>

    </div>
  );
};

export default Body