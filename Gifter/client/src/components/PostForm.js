import React, { useContext, useState } from "react";
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
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostForm = () => {
    const { getToken } = useContext(UserProfileContext);
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [caption, setCaption] = useState("");

    const user = JSON.parse(localStorage.getItem('userProfile'));
    // Use this hook to allow us to programatically redirect users
    const history = useHistory();

    const submit = (e) => {
        const post = {
            imageUrl,
            title,
            caption,
            userProfileId: user.id
        };

        getToken().then((token) =>
            fetch("/api/post", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            }).then((p) => {
                // Navigate the user back to the home route
                history.push("/");
            }));
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