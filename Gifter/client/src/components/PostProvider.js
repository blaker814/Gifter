import React, { useState, createContext } from "react"

export const PostContext = createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        return fetch(`http://localhost:8088/Posts?_sort=date&_order=desc`)
            .then(res => res.json())
            .then(setPosts)
    }

    const addPost = Post => {
        return fetch("http://localhost:8088/Posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Post)
        })
            .then(getPosts)
    }

    const deletePost = id => {
        return fetch(`http://localhost:8088/Posts/${id}`, {
            method: "DELETE"
        })
    }

    const updatePost = Post => {
        return fetch(`http://localhost:8088/Posts/${Post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(Post)
        })
            .then(getPosts)
    }

    return (
        <PostContext.Provider value={{
            posts, getPosts, addPost, deletePost, updatePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}