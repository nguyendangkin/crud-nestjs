import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    requestFindAllUsers,
    requestUpdateUser,
} from "../../../redux/requestApi/usersCRUD/usersCRUD";
import EditUserModal from "../../modal/EditUserModal";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { updateUserInfo } from "../../../redux/reducer/userSlice";

const ManagerUser = () => {
    const data = useSelector((state) => state.userCRUD?.listUsers?.data);
    const accessToken = useSelector(
        (state) => state.user?.userInfo?.accessToken
    );
    const decodedToken = accessToken ? jwtDecode(accessToken) : null;

    const userPermissions = decodedToken?.role?.[0]?.permissions || [];

    const dispatch = useDispatch();
    const [showEditModal, setShowEditModal] = useState(false); // Để kiểm soát modal
    const [selectedUser, setSelectedUser] = useState(null); // Lưu thông tin người dùng được chọn

    useEffect(() => {
        dispatch(requestFindAllUsers());
    }, []);

    const handleEdit = (user) => {
        setShowEditModal(true); // Mở modal
        setSelectedUser({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    };

    const handleUpdateUser = () => {
        setShowEditModal(false);
    };

    const handleDelete = (id) => {
        if (userPermissions.includes("delete")) {
            // Xử lý xóa người dùng
            alert("deleted");
        } else {
            toast.error("You don't have permission to delete");
        }
    };

    const handleCreate = () => {
        if (userPermissions.includes("create")) {
            // Xử lý tạo mới
            alert("created");
        } else {
            toast.error("You don't have permission to create");
        }
    };

    return (
        <div>
            <Button
                disabled={!userPermissions.includes("create")}
                onClick={() => handleCreate()}
                className="mb-3"
            >
                Create New User
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.name}</td>
                            <td>
                                <Button
                                    variant="info"
                                    onClick={() => handleEdit(user)}
                                >
                                    Edit
                                </Button>{" "}
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(user.id)}
                                    disabled={
                                        !userPermissions.includes("delete")
                                    }
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditUserModal
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                user={selectedUser}
                handleUpdate={handleUpdateUser}
            />
        </div>
    );
};

export default ManagerUser;
