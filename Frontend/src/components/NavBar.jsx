import { useSelector,useDispatch} from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";


// =====================================
// NavBar Component
//
// Displays navigation bar and
// user menu options.
// =====================================

const NavBar = () => {
      // Get logged-in user from Redux store
      const user = useSelector(store=> store.user);

      const dispatch = useDispatch();

      const navigate = useNavigate();

     // Logout current user
     const handleLogout = async() => {

      try {

       await axios.post(BASE_URL + "/logout",
        {},
        {withCredentials:true}
      );

    // Remove user from Redux store
    dispatch(removeUser());

    // Redirect to login page
    navigate("/login");


      }
      catch(err){
         console.error(err);
      }
     };


  return (
  <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">

          {/* Application Logo */}
          <a className="btn btn-ghost text-xl">🧑‍💻DevTinder</a>
        </div>

    {user && (
    <div className="flex items-center">

        {/* Welcome Message */}
        <p className="mr-3 font-semibold">
          Welcome, {user?.firstName}
        </p>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mr-5"
            >

              {/* User Avatar */}
              <div className="w-10 rounded-full">
                <img
                  alt="user photo"
                  src="https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>

                   {/* Navigate to Profile Page */}
                   <a onClick={() => navigate("/profile")}> Profile</a>
                </li>

          <li>

               {/* Navigate to Connections Page */}
               <a onClick={() => navigate("/connections")}>
                    Connections
                 </a>
              </li>

              <li>

               {/* Navigate to Connection Requests Page */}
               <a onClick={() => navigate("/requests")}>
                    Connection Requests
                 </a>
              </li>

              {/* Logout User */}
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>

    )}
    
        </div>

  



  )
}

export default NavBar


// rafce