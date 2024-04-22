import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
    requestFindAllUsers,
    requestUpdateUser,
} from "../../redux/requestApi/usersCRUD/usersCRUD";
import { updateUserInfo } from "../../redux/reducer/userSlice";

const EditUserModal = ({ show, handleClose, user, handleUpdate }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const dispatch = useDispatch();

    const handleSave = async () => {
        handleClose();
        const buildData = {
            id: user.id,
            name: name,
            email: email,
        };
        dispatch(updateUserInfo({ name }));

        try {
            await dispatch(requestUpdateUser(buildData));
            await dispatch(requestFindAllUsers());
            handleClose();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formUserName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formUserEmail" className="mt-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserModal;
