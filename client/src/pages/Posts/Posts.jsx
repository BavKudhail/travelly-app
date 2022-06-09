import React from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { GET_POSTS } from '../../utils/queries';

const Posts = () => {
  // Execute the query on component load
  const { loading, data, error } = useQuery(GET_POSTS, {});

  console.log(data);

  const postData = data || [];

  console.log(postData);

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
          <div>
            {/* POSTS*/}
            <h1>POSTS</h1>
            {postData.getAllPosts.map((post) => {
              return (
                <div key={post._id}>
                  {post.postText}

                  <div>Posted by user: {post.postedBy.username}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Posts;
