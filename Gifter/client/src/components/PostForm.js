import React, { useEffect, useRef } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const PostForm = () => {
    const title = useRef(null);
    const imageUrl = useRef(null);
    const caption = useRef(null);

    useEffect(() => {
        fetch("/api/post");
    }, [])

    const handleNewPost = event => {
        event.preventDefault();
        console.log(event);
        console.log(title);
        console.log(imageUrl);
        console.log(caption);

        const newPost = {
            title: title.current.value,
            imageUrl: imageUrl.current.value,
            caption: caption.current.value,
            userProfileId: 1,
            dateCreated: new Date(Date.now()).toDateString("en-US")
        }

        fetch("/api/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        })
    }

    return (
        <Form className="container p-5 text-left w-50">
            <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" innerRef={title} id="titleField" placeholder="Title of post" required autoFocus />
            </FormGroup>
            <FormGroup>
                <Label for="imageUrl">Image Url</Label>
                <Input type="url" name="imageUrl" innerRef={imageUrl} id="imageUrlField" placeholder="URL for image" required />
            </FormGroup>
            <FormGroup>
                <Label for="caption">Caption</Label>
                <Input type="text" name="caption" innerRef={caption} id="captionField" placeholder="Caption for image" />
            </FormGroup>
            <Button color="primary" onClick={handleNewPost}>Add Post</Button>
        </Form>
    );
};

export default PostForm;