import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import "./EditPostFormModal.css";
import { fetchLoadPosts } from "../../../store/posts";

function EditPostFormModal({post}) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [image1, setImage1] = useState(null);
    // const [image2, setImage2] = useState(null);
    // const [image3, setImage3] = useState(null);
    // const [image4, setImage4] = useState(null);
    const [title, setTitle] = useState("");
    const { closeModal } = useModal();

    useEffect(() => {
      setTitle(post.title)
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);

        // const imageFormData = new FormData();
        // imageFormData.append("image1", image1);
        // imageFormData.append("image2", image2);
        // imageFormData.append("image3", image3);
        // imageFormData.append("image4", image4);

        const response = await fetch(`/api/posts/${post.id}`, {
            method: "PUT",
            body: formData,
        });
        // console.log("POST:", post);
        if (response.ok) {
            await dispatch(fetchLoadPosts());
            closeModal();
            history.push("/posts");
        } else {
            console.log(response.errors);
        }
    };

    return (
        <div id="edit-post-form-wrapper">
            <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                id="edit-post-form"
            >
                <h1>Edit Post</h1>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <button type="submit">Edit Post</button>
            </form>
        </div>
    );
}

export default EditPostFormModal;
