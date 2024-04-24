import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
    requestCreateUser,
    requestFindAllUsers,
    requestGetAllRole,
} from "../../redux/requestApi/usersCRUD/usersCRUD";

const CreateUserModal = ({ show, handleClose }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                // const response = await dispatch(requestFindAllRoles());
                // setRoles(response.payload); // Cập nhật danh sách roles
            } catch (error) {
                console.error("Lỗi khi fetch roles:", error);
            }
        };

        fetchRoles(); // Lấy danh sách roles khi component được mount
    }, [dispatch]);

    const handleSave = async () => {
        const newUser = {
            name,
            email,
        };

        try {
            await dispatch(requestCreateUser(newUser));
            await dispatch(requestFindAllUsers());
            handleClose(); // Đóng modal sau khi tạo thành công
        } catch (error) {
            console.error("Lỗi khi tạo người dùng mới:", error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tạo người dùng mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formUserName">
                        <Form.Label>Tên</Form.Label>
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
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Tạo người dùng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateUserModal;
