import React, { useEffect, useState, useHistory, useContext } from 'react';
import Post from './Post';
import { Button, Input } from "reactstrap";
import PostForm from './PostForm';
import { PostContext } from './PostProvider';

const PostList = () => {
    const { posts, getPosts } = useContext(PostContext);
    const [searchTerms, setSearchTerms] = useState("");
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        if (searchTerms !== "") {
            const subset = posts.filter(post => {
                return post.title.toLowerCase().includes(searchTerms.trim().toLowerCase())
            })
            setFiltered(subset)
        } else {
            setFiltered(posts)
        }
    }, [searchTerms, posts])

    return (
        <>
            <div className="row justify-content-center">
                <Input type="text"
                    className="w-25 mt-4"
                    id="postSearch"
                    onKeyUp={
                        (keyEvent) => setSearchTerms(keyEvent.target.value)
                    }
                    placeholder="Search for a post" />
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">
                        {filtered.map((post) => (
                            <Post key={post.id} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostList;