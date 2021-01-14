import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "./PostProvider";
import Post from "./Post";

const UserPosts = () => {
    const { getPostsByUserId } = useContext(PostContext);
    const [posts, setPosts] = useState([]);

    const { userId } = useParams();

    useEffect(() => {
        getPostsByUserId(userId)
            .then(setPosts);
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {posts.map(post => <Post key={post.id} post={post} />)}
                </div>
            </div>
        </div>
    );
};

export default UserPosts;