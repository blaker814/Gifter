import React, { useState } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const PostForm = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");

    // Use this hook to allow us to programatically redirect users
    const history = useHistory();

    const addPost = (post) => {
        return fetch('/api/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(post)
        })
            .then(res => res.json());
    }

    const submit = (e) => {
        const post = {
            imageUrl,
            title,
            caption,
            userProfileId: 1,
            dateCreated: new Date(Date.now()).toDateString()
        };

        addPost(post).then((p) => {
            // Navigate the user back to the home route
            history.push("/");
        });
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <h2>New Post</h2>
                        <hr />
                        <Form className="mt-4">
                            <FormGroup>
                                <Label for="imageUrl">Gif URL</Label>
                                <Input
                                    id="imageUrl"
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="URL for image"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="title" onChange={(e) => setTitle(e.target.value)} placeholder="Title for post" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="caption">Caption</Label>
                                <Input
                                    id="caption"
                                    onChange={(e) => setCaption(e.target.value)}
                                    placeholder="Caption for image"
                                />
                            </FormGroup>
                        </Form>
                        <Button color="info" onClick={submit}>SUBMIT</Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default PostForm;