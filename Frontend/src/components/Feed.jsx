import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";


// =====================================
// Feed Component
//
// Displays users available in the feed.
// =====================================

const Feed = () => {

    // Get feed data from Redux store
    const feed = useSelector((store) =>store.feed);

     const dispatch = useDispatch();

  // Fetch feed users from backend
  const getFeed = async () => {

    try {

      const res = await axios.get(
        BASE_URL + "/feed",
       
        {
          withCredentials: true,
        }
      );

      // Store feed data in Redux
       dispatch(addFeed(res.data));



    } catch (err) {

      console.error(err);

    }
  };

  // Fetch feed when component loads
  useEffect(() => {
    getFeed();
  }, []);

  // Show loading state
  if (!feed) {
  return <h1>Loading...</h1>;
}

  // Show message if feed is empty
  if (feed.length === 0) {
    return <h1>No New Users Found</h1>;
  }


  return (
    feed && (
  <div className="flex justify-center my-10">

    {/* Display first user from feed */}
    <UserCard user= {feed[0]}/>

  </div>
    )
);
};

export default Feed;