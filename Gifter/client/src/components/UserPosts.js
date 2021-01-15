import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import { UserProfileContext } from "../providers/UserProfileProvider";

const UserPosts = () => {
    const { getToken } = useContext(UserProfileContext);
    const [posts, setPosts] = useState([]);

    const { userId } = useParams();

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/post/getbyuser/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(setPosts));
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