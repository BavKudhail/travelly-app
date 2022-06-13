import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Link, useParams } from "react-router-dom";

// mutations/queries
import { GET_USER } from "../../utils/queries";

function UserProfile() {
  // user ID
  const staticUserId = "6299eaa2b3b3eb625a753dd0";

  // get id from params
  const { id } = useParams();

  // Execute the query on component load
  const { loading, data, error } = useQuery(GET_USER, {
    variables: {
      userId: id,
    },
  });
  console.log(data);
  const userData = data?.getUser || [];
  return <div>UserProfile</div>;
}

export default UserProfile;
