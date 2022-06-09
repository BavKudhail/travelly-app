import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { GET_POSTS } from '../../utils/queries';
import { ADD_POST } from '../../utils/mutations';

// static user for testing - this needs to come from the loggedin user
const user = {
  _id: '6299eaa2b3b3eb625a753dd0',
  username: 'Max Kanat-Alexander',
  email: 'mkanatalexander@techfriends.dev',
};

const Posts = () => {
  // Execute the query on component load
  const { loading, data, error } = useQuery(GET_POSTS, {});

  const postData = data || [];

  const [addPost] = useMutation(ADD_POST);

  const [postText, setPostText] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { data } = await addPost({
      variables: {
        userId: user._id,
        postText: postText,
      },
    });
  };

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
          <div>
            <h1>ADD POST</h1>
            <form>
              <textarea name="postTextArea" type="text" value={postText} onChange={(e) => setPostText(e.target.value)}></textarea>
              <button type="submit" onClick={handleFormSubmit}>
                Submit
              </button>
            </form>
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
