import React, { useEffect, useState, useContext } from 'react';
import Post from './Post';
import PostSearch from './PostSearch';
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostList = () => {
    const { getToken } = useContext(UserProfileContext);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        getToken().then((token) =>
            fetch("/api/post", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(setFiltered));
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    <PostSearch onSearch={setFiltered} />
                    {filtered.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostList;