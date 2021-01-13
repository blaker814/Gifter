import React, { useEffect, useState, useHistory } from 'react';
import Post from './Post';
import { Button } from "reactstrap";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    // const history = useHistory();

    useEffect(() => {
        fetch('/api/post')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {/* <Button color="secondary" block onClick={() => history.push("/animals/create")}>Add Animal</Button> */}
                <div className="cards-column">
                    {posts.map((post) => (
                        <Post key={post.id} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostList;