import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import { PostContext } from "./PostProvider";

const PostDetails = () => {
    const { getPostById } = useContext(PostContext);
    const [post, setPost] = useState();
    const { id } = useParams();

    useEffect(() => {
        getPostById(id)
            .then(setPost);
    }, []);

    if (!post) {
        return null;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <Post post={post} />
            </div>
        </div>
    );
};

export default PostDetails;