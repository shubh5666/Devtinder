import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import appStore from "./utils/appStore";

import Body from "./components/Body";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Chat from "./components/Chat";



// =====================================
// App Component
//
// Root component of the application.
//
// Responsibilities:
// - Configure Redux Store
// - Configure Routing
// - Configure Toast Notifications
// =====================================

function App() {
  return (
    <>
    {/* Redux Provider */}
    <Provider store={appStore}>

     {/* Toast Notifications */}
     <Toaster position="top-center" />

    {/* Application Routing */}
    <BrowserRouter basename="/">
    <Routes>

       {/* Main Layout Route */}
       <Route path="/" element = { <Body />} >

          {/* Login Page */}
          <Route path="/Login" element = { <Login />} />

          {/* Feed Page */}
          <Route path="/feed" element = { <Feed />} />

          {/* Profile Page */}
          <Route path="/Profile" element = { <Profile />} />

          {/* Connections Page */}
          <Route path="/connections" element = { <Connections />} />

             <Route path="/Chat/:targetUserId" element = { <Chat/>} /> 

          {/* Requests Page */}
          <Route path="/Requests" element = { <Requests />} /> 

          {/* Edit Profile Page */}
          <Route 
             path="editProfile"
             element={<EditProfile/>}
          />
          
       </Route>

    </Routes>
    </BrowserRouter>

    </Provider>
    
   
    </>
  );
}

export default App;