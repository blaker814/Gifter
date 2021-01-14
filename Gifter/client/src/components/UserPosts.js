import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "./PostProvider";
import Post from "./Post";

const UserPosts = () => {
    const { posts, getPostsByUserId } = useContext(PostContext);

    const { userId } = useParams();

    useEffect(() => {
        getPostsByUserId(userId)
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