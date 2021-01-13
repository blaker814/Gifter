import React, { useEffect, useState, useHistory, useContext } from 'react';
import Post from './Post';
import { Button, Input } from "reactstrap";
import PostForm from './PostForm';
import { PostContext } from './PostProvider';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerms, setSearchTerms] = useState("");
    const [filtered, setFiltered] = useState([]);
    // const history = useHistory();

    useEffect(() => {
        fetch("/api/post")
            .then(res => res.json())
            .then(setPosts);
    }, []);

    useEffect(() => {
        if (searchTerms !== "") {
            // If the search field is not blank, display matching friends
            const subset = posts.filter(post => {
                return post.title.toLowerCase().includes(searchTerms.trim().toLowerCase())
            })
            setFiltered(subset)
        } else {
            // If the search field is blank, display all user friends
            setFiltered(posts)
        }
    }, [searchTerms, posts])

    return (
        <>
            <div className="row justify-content-center">
                <Input type="text"
                    className="w-25"
                    id="postSearch"
                    onKeyUp={
                        (keyEvent) => setSearchTerms(keyEvent.target.value)
                    }
                    placeholder="Search for a post" />
            </div>
            <div className="container">
                <div className="row justify-content-center">
                    {/* <Button color="secondary" block onClick={() => history.push("/animals/create")}>Add Animal</Button> */}
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