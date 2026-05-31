import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addRequests } from "../utils/requestsSlice";


// =====================================
// Requests Component
//
// Displays all received connection
// requests for the logged-in user.
// =====================================

const Requests = () => {
  const dispatch = useDispatch();

  // Get requests from Redux store
  const requests = useSelector(
    (store) => store.requests
  );

  console.log(requests);

  // Accept or reject a connection request
  const reviewRequest = async (
    status,
    requestId
  ) => {
    try {
      const res = await axios.post(
        BASE_URL +
          "/request/review/" +
          status +
          "/" +
          requestId,
        {},
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      // Refresh requests after action
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch received requests from backend
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/user/request/received",
        {
          withCredentials: true,
        }
      );

      // Store requests in Redux
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  // Run when component loads
  useEffect(() => {
    fetchRequests();
  }, []);

  // Show loading state
  if (!requests) {
    return (
      <h1 className="text-center text-3xl my-10">
        Loading Requests...
      </h1>
    );
  }

  // Show message if no requests exist
  if (requests.length === 0) {
    return (
      <h1 className="text-center text-3xl my-10">
        No Requests Found
      </h1>
    );
  }

  return (
    <div>

      {/* Page Heading */}
      <h1 className="text-center text-3xl my-10">
        Requests
      </h1>

      {/* Render all requests */}
      {requests.map((request) => {
        const {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        } = request.fromUserId;

        return (
          <div
            key={request._id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-[500px] mx-auto"
          >
            <div className="flex items-center">

              {/* User Profile Image */}
              <img
                alt="profile"
                src={
                  photoUrl ||
                  "https://randomuser.me/api/portraits/women/44.jpg"
                }
                className="w-14 h-14 rounded-full object-cover"
              />

              {/* User Details */}
              <div className="ml-4">
                <h2 className="font-bold text-lg">
                  {firstName} {lastName}
                </h2>

                <p>
                  {age}, {gender}
                </p>

                <p>{about}</p>
              </div>
            </div>

            {/* Accept and Reject Buttons */}
            <div className="flex gap-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  reviewRequest(
                    "rejected",
                    request._id
                  )
                }
              >
                Reject
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() =>
                  reviewRequest(
                    "accepted",
                    request._id
                  )
                }
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;