import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { fetchCreatePost } from "../../../store/posts";
import "./CreatePostFormModal.css";

function CreatePostFormModal() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [image1, setImage1] = useState(null);
    const [previewImage1, setPreviewImage1] = useState("");
    const [image2, setImage2] = useState(null);
    const [previewImage2, setPreviewImage2] = useState("");
    const [image3, setImage3] = useState(null);
    const [previewImage3, setPreviewImage3] = useState("");
    const [image4, setImage4] = useState(null);
    const [previewImage4, setPreviewImage4] = useState("");
    const [title, setTitle] = useState("");
    const [imagesLoading, setImagesLoading] = useState(false);
    const { closeModal } = useModal();

    useEffect(() => {
        let imageUrl1;
        let imageUrl2;
        let imageUrl3;
        let imageUrl4;

        if (image1) {
            imageUrl1 = URL.createObjectURL(image1);
            setPreviewImage1(imageUrl1);
        }
        if (image2) {
            imageUrl2 = URL.createObjectURL(image2);
            setPreviewImage2(imageUrl2);
        }
        if (image3) {
            imageUrl3 = URL.createObjectURL(image3);
            setPreviewImage3(imageUrl3);
        }
        if (image4) {
            imageUrl4 = URL.createObjectURL(image4);
            setPreviewImage4(imageUrl4);
        }

        return () => {
            URL.revokeObjectURL(imageUrl1);
            URL.revokeObjectURL(imageUrl2);
            URL.revokeObjectURL(imageUrl3);
            URL.revokeObjectURL(imageUrl4);
        };
    }, [image1, image2, image3, image4]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);

        // const imageFormData = new FormData();
        // imageFormData.append("image1", image1);
        // imageFormData.append("image2", image2);
        // imageFormData.append("image3", image3);
        // imageFormData.append("image4", image4);
        const images = [image1, image2, image3, image4];
        const imageData = [];
        for (let image of images) {
            if (image) {
                imageData.push(image);
            }
        }

        console.log(imageData);
        await dispatch(fetchCreatePost(formData, imageData));

        setImagesLoading(true);
        closeModal();
        history.push("/posts");
    };

    return (
        <div id="create-post-form-wrapper">
            <h1>Create Post</h1>
            <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                id="create-post-form"
            >
                <div id="create-post-img-wrapper">
                    <label className="create-post-image">
                        {!previewImage1 ? (
                            <div className="create-post-thumb">
                            </div>
                        ) : (
                            <div className="create-post-thumb">
                                <img
                                    alt=""
                                    src={previewImage1}
                                    className="image-thumb"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage1(e.target.files[0])}
                        />
                    </label>
                    <label className="create-post-image">
                        {!previewImage2 ? (
                            <div className="create-post-thumb"></div>
                        ) : (
                            <div className="create-post-thumb">
                                <img
                                    alt=""
                                    src={previewImage2}
                                    className="image-thumb"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage2(e.target.files[0])}
                        />
                    </label>
                    <label className="create-post-image">
                        {!previewImage3 ? (
                            <div className="create-post-thumb"></div>
                        ) : (
                            <div className="create-post-thumb">
                                <img
                                    alt=""
                                    src={previewImage3}
                                    className="image-thumb"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage3(e.target.files[0])}
                        />
                    </label>
                    <label className="create-post-image">
                        {!previewImage4 ? (
                            <div className="create-post-thumb"></div>
                        ) : (
                            <div className="create-post-thumb">
                                <img
                                    alt=""
                                    src={previewImage4}
                                    className="image-thumb"
                                />
                            </div>
                        )}
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
