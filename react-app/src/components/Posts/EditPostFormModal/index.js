import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "./EditPostFormModal.css";
// import { fetchUpdatePost } from "../../../store/posts";

function EditPostFormModal(post) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [title, setTitle] = useState("");
    const [imagesLoading, setImagesLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);

        const imageFormData = new FormData();
        imageFormData.append("image1", image1);
        imageFormData.append("image2", image2);
        imageFormData.append("image3", image3);
        imageFormData.append("image4", image4);

        // await dispatch(fetchCreatePost(formData, imageFormData));
        console.log("POST:", post);

        setImagesLoading(true);
        closeModal();
        history.push("/posts");
    };

    return (
        <div id="edit-post-form-wrapper">
            <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                id="edit-post-form"
            >
                <h1>Edit Post</h1>
                <div id="file-upload-wrapper">
                    <label className="post-image-upload">
                        <FaPlus />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage1(e.target.files[0])}
                        />
                    </label>
                    <label className="post-image-upload">
                        <FaPlus />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage2(e.target.files[0])}
                        />
                    </label>
                    <label className="post-image-upload">
                        <FaPlus />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage3(e.target.files[0])}
                        />
                    </label>
                    <label className="post-image-upload">
                        <FaPlus />
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

export default EditPostFormModal;
