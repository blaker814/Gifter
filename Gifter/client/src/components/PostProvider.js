import React, { useState, createContext } from "react"

export const PostContext = createContext()

export const PostProvider = (props) => {
    const [posts, setPosts] = useState([])

    const getPosts = () => {
        return fetch(`/api/post`)
            .then(res => res.json())
            .then(setPosts)
    }

    const addPost = post => {
        return fetch('/api/post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
            .then(getPosts)
    }

    const deletePost = id => {
        return fetch(`/api/post/${id}`, {
            method: "DELETE"
        })
    }

    const updatePost = post => {
        return fetch(`/api/post/${post.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
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