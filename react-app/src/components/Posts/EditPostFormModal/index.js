import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { fetchLoadPosts } from "../../../store/posts";
import "./EditPostFormModal.css";

function EditPostFormModal({ post }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [image1, setImage1] = useState(null);
    const [newImage1, setNewImage1] = useState(null);
    const [previewNewImage1, setPreviewNewImage1] = useState("");
    const [image2, setImage2] = useState(null);
    const [newImage2, setNewImage2] = useState(null);
    const [previewNewImage2, setPreviewNewImage2] = useState("");
    const [image3, setImage3] = useState(null);
    const [newImage3, setNewImage3] = useState(null);
    const [previewNewImage3, setPreviewNewImage3] = useState("");
    const [image4, setImage4] = useState(null);
    const [newImage4, setNewImage4] = useState(null);
    const [previewNewImage4, setPreviewNewImage4] = useState("");
    const [title, setTitle] = useState("");
    const [loadingImages, setLoadingImages] = useState(false);
    const { closeModal } = useModal();
    const [formErrors, setFormErrors] = useState({});

    const compareIds = (a, b) => {
        return a - b;
    };

    useEffect(() => {
        const imageIds = Object.keys(post.postImages).sort(compareIds);

        if (imageIds.length > 0) {
            setImage1(post.postImages[imageIds[0]]);
        }
        if (imageIds[1]) {
            setImage2(post.postImages[imageIds[1]]);
        }
        if (imageIds[2]) {
            setImage3(post.postImages[imageIds[2]]);
        }
        if (imageIds[3]) {
            setImage4(post.postImages[imageIds[3]]);
        }
        setTitle(post.title);
    }, [post]);

    useEffect(() => {
        let imageUrl1;
        let imageUrl2;
        let imageUrl3;
        let imageUrl4;

        if (newImage1) {
            imageUrl1 = URL.createObjectURL(newImage1);
            setPreviewNewImage1(imageUrl1);
        }
        if (newImage2) {
            imageUrl2 = URL.createObjectURL(newImage2);
            setPreviewNewImage2(imageUrl2);
        }
        if (newImage3) {
            imageUrl3 = URL.createObjectURL(newImage3);
            setPreviewNewImage3(imageUrl3);
        }
        if (newImage4) {
            imageUrl4 = URL.createObjectURL(newImage4);
            setPreviewNewImage4(imageUrl4);
        }

        return () => {
            URL.revokeObjectURL(imageUrl1);
            URL.revokeObjectURL(imageUrl2);
            URL.revokeObjectURL(imageUrl3);
            URL.revokeObjectURL(imageUrl4);
        };
    }, [newImage1, newImage2, newImage3, newImage4]);

    const handleSelectNewImage1 = (e) => {
        setNewImage1(e.target.files[0]);
    };
    const handleSelectNewImage2 = (e) => {
        setNewImage2(e.target.files[0]);
    };
    const handleSelectNewImage3 = (e) => {
        setNewImage3(e.target.files[0]);
    };
    const handleSelectNewImage4 = (e) => {
        setNewImage4(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingImages(true);

        const formData = new FormData();
        formData.append("title", title);

        const response = await fetch(`/api/posts/${post.id}`, {
            method: "PUT",
            body: formData,
        });

        if (response.ok) {
            let imageFormData;
            let imageOk = true;
            if (newImage1) {
                if (image1) {
                    imageFormData = new FormData();
                    imageFormData.append("image", newImage1);
                    const image1Response = await fetch(
                        `/api/images/${image1.id}`,
                        {
                            method: "PUT",
                            body: imageFormData,
                        }
                    );

                    if (!image1Response.ok) {
                        const errors = await image1Response.json();
                        imageOk = false;
                        setFormErrors(errors.errors);
                    }
                }
            }
            if (newImage2) {
                if (image2) {
                    imageFormData = new FormData();
                    imageFormData.append("image", newImage2);
                    const image2Response = await fetch(
                        `/api/images/${image2.id}`,
                        {
                            method: "PUT",
                            body: imageFormData,
                        }
                    );

                    if (!image2Response.ok) {
                        const errors = await image2Response.json();
                        imageOk = false;
                        setFormErrors(errors.errors);
                    }
                } else {
                    imageFormData = new FormData();
                    imageFormData.append("image", newImage2);
                    const image2Response = await fetch(
                        `/api/posts/${post.id}/images`,
                        {
                            method: "POST",
                            body: imageFormData,
                        }
                    );

                    if (!image2Response.ok) {
                        const errors = await image2Response.json();
                        imageOk = false;
                        setFormErrors(errors.errors);
                    }
                }
            }
            if (newImage3) {
                if (image3) {
                    imageFormData = new FormData();
                    imageFormData.append("image", newImage3);
                    const image3Response = await fetch(
                        `/api/images/${image3.id}`,
                        {
                            method: "PUT",
                            body: imageFormData,
                        }
                    );

                    if (!image3Response.ok) {
                        const errors = await image3Response.json();
                        imageOk = false;
                        setFormErrors(errors.errors);
                    }
                } else {
                    imageFormData = new FormData();
                    imageFormData.append("image", newImage3);
                    const image3Response = await fetch(
                        `/api/posts/${post.id}/images`,
                        {
                            method: "POST",
                            body: imageFormData,
                        }
                    );

                    if (!image3Response.ok) {
                        const errors = await image3Response.json();
                        imageOk = false;
                        setFormErrors(errors.errors);
                    }
                }
            }
            if (newImage4) {
                if (image4) {
                    imageFormData = new FormData();
                    imageFormData.append("image", newImage4);
                    const image4Response = await fetch(
                        `/api/images/${image4.id}`,
                        {
                            method: "PUT",
                            body: imageFormData,
                        }
                    );

                    if (!image4Response.ok) {
                        const errors = await image4Response.json();
                        imageOk = false;
                        setFormErrors(errors.errors);
                    }
                } else {
                    imageFormData = new FormData();
                    imageFormData.append("image", newImage4);
                    const image4Response = await fetch(
                        `/api/posts/${post.id}/images`,
                        {
                            method: "POST",
                            body: imageFormData,
                        }
                    );

                    if (!image4Response.ok) {
                        const errors = await image4Response.json();
                        imageOk = false;
                        setFormErrors(errors.errors);
                    }
                }
            }
            if (imageOk) {
                await dispatch(fetchLoadPosts());
                closeModal();
                history.push("/posts");
            }
        } else {
            const errors = await response.json();
            setFormErrors(errors.errors);
        }
        setLoadingImages(false);
    };

    return (
        <div id="edit-post-form-wrapper">
            <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                id="edit-post-form"
            >
                <h1>Edit Post</h1>
                <p id="image-label">Change or Add Artwork</p>
                <div id="file-picker-wrapper">
                    <label id="edit-image">
                        {!previewNewImage1 ? (
                            <div id="edit-image-thumb">
                                {image1 ? (
                                    <img
                                        alt=""
                                        src={image1.url}
                                        className="image-thumb"
                                    />
                                ) : (
                                    <FaPlus />
                                )}
                            </div>
                        ) : (
                            <div id="edit-image-thumb">
                                <img
                                    alt=""
                                    src={previewNewImage1}
                                    className="image-thumb"
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleSelectNewImage1}
                            className="file-input"
                        />
                    </label>
                    <label id="edit-image">
                        {!previewNewImage2 ? (
                            <div id="edit-image-thumb">
                                {image2 ? (
                                    <img
                                        alt=""
                                        src={image2.url}
                                        className="image-thumb"
                                    />
                                ) : (
                                    <FaPlus />
                                )}
                            </div>
                        ) : (
                            <div id="edit-image-thumb">
                                <img
                                    alt=""
                                    src={previewNewImage2}
                                    className="image-thumb"
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleSelectNewImage2}
                            className="file-input"
                        />
                    </label>
                    <label id="edit-image">
                        {!previewNewImage3 ? (
                            <div id="edit-image-thumb">
                                {image3 ? (
                                    <img
                                        alt=""
                                        src={image3.url}
                                        className="image-thumb"
                                    />
                                ) : (
                                    <FaPlus />
                                )}
                            </div>
                        ) : (
                            <div id="edit-image-thumb">
                                <img
                                    alt=""
                                    src={previewNewImage3}
                                    className="image-thumb"
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleSelectNewImage3}
                            className="file-input"
                        />
                    </label>
                    <label id="edit-image">
                        {!previewNewImage4 ? (
                            <div id="edit-image-thumb">
                                {image4 ? (
                                    <img
                                        alt=""
                                        src={image4.url}
                                        className="image-thumb"
                                    />
                                ) : (
                                    <FaPlus />
                                )}
                            </div>
                        ) : (
                            <div id="edit-image-thumb">
                                <img
                                    alt=""
                                    src={previewNewImage4}
                                    className="image-thumb"
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleSelectNewImage4}
                            className="file-input"
                        />
                    </label>
                </div>
                {Object.keys(formErrors).length > 0 ? (
                    <p className="errors">{formErrors.image}</p>
                ) : null}
                <label id="title-label">
                    <p id="title-label-text">Change the Title</p>
                    <input
                        id="title-input"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {Object.keys(formErrors).length > 0 ? (
                        <p className="errors">{formErrors.title}</p>
                    ) : null}
                </label>
                {!loadingImages ? (
                    <button type="submit">Edit Post</button>
                ) : (
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default EditPostFormModal;
