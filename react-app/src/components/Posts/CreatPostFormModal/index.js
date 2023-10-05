import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { fetchCreatePost } from "../../../store/posts";
import "./CreatePostFormModal.css"

function CreatePostFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [title, setTitle] = useState("");
    const [imagesLoading, setImagesLoading] = useState(false);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);

        // const imageFormData = new FormData();
        // imageFormData.append("image1", image1);
        // imageFormData.append("image2", image2);
        // imageFormData.append("image3", image3);
        // imageFormData.append("image4", image4);
        const images = [image1, image2, image3, image4]
        const imageData = []
        for (let image of images) {
            if (image) {
                imageData.push(image)
            }
        }

        console.log(imageData)
        await dispatch(fetchCreatePost(formData, imageData));

        setImagesLoading(true);
        closeModal();
        history.push("/posts");
    };

    return (
        <div id="create-post-form-wrapper">
            <h1>Create Post</h1>
            <form encType="multipart/form-data" onSubmit={handleSubmit} id="create-post-form">
                <div id="create-post-img-wrapper">
                    <label>
                        Image #1
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage1(e.target.files[0])}
                        />
                    </label>
                    <label>
                        Image #2
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage2(e.target.files[0])}
                        />
                    </label>
                    <label>
                        Image #3
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage3(e.target.files[0])}
                        />
                    </label>
                    <label>
                        Image #4
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage4(e.target.files[0])}
                        />
                    </label>
                </div>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <button type="submit">Create Post</button>
                {imagesLoading && <p>Loading...</p>}
            </form>
        </div>
    );
}

export default CreatePostFormModal;
