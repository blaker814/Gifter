import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import { UserProfileContext } from "../providers/UserProfileProvider"

const PostDetails = () => {
    const { getToken } = useContext(UserProfileContext);
    const [post, setPost] = useState();
    const { id } = useParams();

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/post/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(setPost));
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