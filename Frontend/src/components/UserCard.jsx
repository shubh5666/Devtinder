import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";


// =====================================
// UserCard Component
//
// Displays user information and
// allows sending connection requests.
// =====================================

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, about } = user;

  const dispatch = useDispatch();

  // Send connection request
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      // Remove user from feed after action
      dispatch(removeUserFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-72 shadow-2xl p-4">

      {/* User Profile Image */}
      <figure className="pt-4">
        <img
          src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
          alt="profile"
          className="rounded-xl h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body">

        {/* User Name */}
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>

        {/* User Age and Gender */}
        {age && gender && (
          <p>
            {age}, {gender}
          </p>
        )}

        {/* User Bio */}
        <p>{about}</p>

        {/* Connection Request Buttons */}
        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;