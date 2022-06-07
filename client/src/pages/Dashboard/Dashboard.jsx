import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import DashboardRight from "../../components/Dashboard/DashboardRight";

// mutations/queries
import { GET_DASHBOARD } from "../../utils/queries";

const Dashboard = () => {
  const staticUserId = "6299eaa2b3b3eb625a753dd0";
  // Execute the query on component load
  const { loading, data, error } = useQuery(GET_DASHBOARD, {
    variables: {
      userId: staticUserId,
    },
  });
  const userData = data?.me || [];

  console.log(userData);

//   


  return (
    <>
      {/* LEFT */}
      {/* insert loading spinner */}
      {loading ? (
        <span>loading</span>
      ) : (
        <div>
          {/* MAIN */}
          <div className="main-section">
            <h1>MAIN SECTION</h1>
          </div>
          {/* RIGHT */}
          <DashboardRight />
          <div>
            {/* UPCOMING TRIPS*/}
            <h1>UPCOMING TRIPS</h1>
            {userData.futureTrips.map((trip) => {
              return <div key={trip._id}>{trip.tripName}</div>;
            })}
          </div>
          {/* MY POSTS */}
          <h1>MY TRIPS</h1>
        </div>
      )}
    </>
  );
};

export default Dashboard;
