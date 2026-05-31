import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

// =====================================
// Connections Component
//
// Displays all accepted connections
// of the logged-in user.
// =====================================

const Connections = () => {
  const dispatch = useDispatch();

  // Get connections from Redux store
  const connections = useSelector(
    (store) => store.connections
  );

  // Fetch connections from backend
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/connections",
        {
          withCredentials: true,
        }
      );

      console.log("API Response =", res.data);

      // Store connections in Redux
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  // Run when component loads
  useEffect(() => {
    fetchConnections();
  }, []);

  console.log("Redux Connections =", connections);

  // Show loading state
  if (!connections) {
    return (
      <h1 className="text-center text-3xl my-10">
        Loading Connections...
      </h1>
    );
  }

  // Show message if no connections exist
  if (connections.length === 0) {
    return (
      <h1 className="text-center text-3xl my-10">
        No Connections Found
      </h1>
    );
  }

  return (
    <div>

      {/* Page Heading */}
      <h1 className="text-center text-3xl my-10">
        Connections
      </h1>

      {/* Render all connections */}
      {connections.map((connection, index) => {
        console.log("Connection =", connection);

        return (
          <div
            key={connection?._id || index}
            className="flex items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto shadow-lg"
          >

            {/* User Profile Image */}
            <img
              alt="profile"
              src={
                connection?.photoUrl ||
               "https://randomuser.me/api/portraits/women/44.jpg"
              }
          
            />

            {/* User Details */}
            <div className="ml-4">
              <h2 className="font-bold text-xl">
                {connection?.firstName}{" "}
                {connection?.lastName}
              </h2>

              <p>
                {connection?.age} {connection?.gender}
              </p>

              <p>{connection?.about}</p>
             
            </div>
            
            <Link to={"/chat/" + connection._id}>
               <button className="btn btn-primary">
    Chat
                  </button>
                     </Link>
            
          </div>
        );
      })}
    </div>
  );
};

export default Connections;