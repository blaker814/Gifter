import React, { useState } from 'react';
import { Form, Input } from 'reactstrap';

const PostSearch = ({ onSearch }) => {
    const [searchTerms, setSearchTerms] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/post/search?q=${searchTerms}`)
            .then(res => res.json())
            .then(searchResults => onSearch(searchResults));
        setSearchTerms("");
    }

    return (
        <Form className="mt-4" onSubmit={handleSubmit}>
            <Input value={searchTerms} placeholder="Search by title or caption" onChange={e => setSearchTerms(e.target.value)} />
        </Form>
    );
};

export default PostSearch;