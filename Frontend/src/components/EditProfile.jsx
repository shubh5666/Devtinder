import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../utils/constants";

// =====================================
// Edit Profile Component
//
// Allows user to update profile details.
// =====================================

const EditProfile = () => {
  const [firstName, setFirstName] = useState("Rahul");
  const [lastName, setLastName] = useState("Sharma");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState("Male");
  const [about, setAbout] = useState("Backend Developer");

  // Save updated profile information
  const handleEditProfile = async () => {
    try {
      await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );

      // Show success message
      toast.success("Profile saved successfully!");
    } catch (err) {

  // Log backend error
  console.log(err.response?.data);

  // Show error message
  toast.error(err.response?.data || "Failed to save profile");
}
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-80 shadow-xl">
        <div className="card-body">

          {/* Form Heading */}
          <h2 className="card-title">Edit Profile</h2>

          {/* First Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              value={firstName}
              className="input"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
            />
          </fieldset>

          {/* Last Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              value={lastName}
              className="input"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
            />
          </fieldset>

          {/* Profile Photo URL */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="text"
              className="input"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Enter photo URL"
            />
          </fieldset>

          {/* Age */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="number"
              className="input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </fieldset>

          {/* Gender */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <input
              type="text"
              className="input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="Enter gender"
            />
          </fieldset>

          {/* About User */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <input
              type="text"
              className="input"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell something about yourself"
            />
          </fieldset>

          {/* Save Profile Button */}
          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary"
              onClick={handleEditProfile}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;