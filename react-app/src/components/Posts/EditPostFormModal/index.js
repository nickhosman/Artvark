import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import "./EditPostFormModal.css";
import { fetchLoadPosts } from "../../../store/posts";

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
    const { closeModal } = useModal();

    const compareIds = (a, b) => {
        return a - b;
    };

    useEffect(() => {
        const imageIds = Object.keys(post.postImages).sort(compareIds);

        // console.log(imageIds)
        // console.log(post)
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

    // const handleClick = (e) => {
    //     // console.log(image1)
    //     console.log("New IMAGE1", newImage1);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);

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

        const images = [newImage1, newImage2, newImage3, newImage4]
        
    };

    return (
        <div id="edit-post-form-wrapper">
            <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                id="edit-post-form"
            >
                <h1>Edit Post</h1>
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
                                ) : null}
                            </div>
                        ) : (
                            <div id="edit-image-thumb">
                                {image1 ? (
                                    <img
                                        alt=""
                                        src={previewNewImage1}
                                        className="image-thumb"
                                    />
                                ) : null}
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleSelectNewImage1}
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
                                ) : null}
                            </div>
                        ) : (
                            <div id="edit-image-thumb">
                                {image2 ? (
                                    <img
                                        alt=""
                                        src={previewNewImage2}
                                        className="image-thumb"
                                    />
                                ) : null}
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleSelectNewImage2}
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
                                ) : null}
                            </div>
                        ) : (
                            <div id="edit-image-thumb">
                                {image3 ? (
                                    <img
                                        alt=""
                                        src={previewNewImage3}
                                        className="image-thumb"
                                    />
                                ) : null}
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleSelectNewImage3}
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
                                ) : null}
                            </div>
                        ) : (
                            <div id="edit-image-thumb">
                                {image4 ? (
                                    <img
                                        alt=""
                                        src={previewNewImage4}
                                        className="image-thumb"
                                    />
                                ) : null}
                            </div>
                        )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleSelectNewImage4}
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
                <button type="submit">Edit Post</button>
            </form>
        </div>
    );
}

export default EditPostFormModal;
