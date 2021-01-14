import React from "react";
import { Switch, Route } from "react-router-dom";
import PostList from "./PostList";
import PostForm from "./PostForm";
import PostDetails from "./PostDetails";
import UserPosts from "./UserPosts";
import { PostProvider } from "./PostProvider";

const ApplicationViews = () => {
    return (
        <Switch>
            <PostProvider>
                <Route exact path="/" >
                    <PostList />
                </Route>

                <Route path="/posts/add">
                    <PostForm />
                </Route>


                <Route path="/posts/:id(\d+)">
                    <PostDetails />
                </Route>


                <Route path="/users/:userId">
                    <UserPosts />
                </Route>
            </PostProvider>
        </Switch>
    );
};

export default ApplicationViews;