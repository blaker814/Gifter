import React, { useEffect, useState, useContext } from 'react';
import Post from './Post';
import { Input } from "reactstrap";
import { PostContext } from './PostProvider';
import PostSearch from './PostSearch';

const PostList = () => {
    const { getPosts } = useContext(PostContext);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        getPosts()
            .then(setFiltered);
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