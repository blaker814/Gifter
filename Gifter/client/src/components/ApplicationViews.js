import React from "react";
import { Switch, Route } from "react-router-dom";
import PostList from "./PostList";
import PostForm from "./PostForm";
import PostDetails from "./PostDetails";
import UserPosts from "./UserPosts";
import Login from "./Login";
import Register from "./Register";
import { UserProfileProvider } from "../providers/UserProfileProvider";

const ApplicationViews = () => {
    return (
        <Switch>
            <UserProfileProvider>
                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

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
            </UserProfileProvider>
        </Switch>
    );
};

export default ApplicationViews;