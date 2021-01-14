import React, { useState, createContext } from "react"

export const PostContext = createContext();

export const PostProvider = (props) => {

    const getPosts = () => {
        return fetch(`/api/post`)
            .then(res => res.json())
    }

    const getPostById = id => {
        return fetch(`/api/post/${id}`)
            .then(res => res.json())
    }

    const getPostsByUserId = id => {
        return fetch(`/api/post/getbyuser/${id}`)
            .then(res => res.json())
    }

    const addPost = post => {
        return fetch('/api/post', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
        })
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
            getPosts, getPostById, getPostsByUserId, addPost, deletePost, updatePost
        }}>
            {props.children}
        </PostContext.Provider>
    )
}