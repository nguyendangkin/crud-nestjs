import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    requestDeleteUser,
    requestFindAllUsers,
    requestUpdateUser,
} from "../../../redux/requestApi/usersCRUD/usersCRUD";
import EditUserModal from "../../modal/EditUserModal";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { updateUserInfo } from "../../../redux/reducer/userSlice";
import CreateUserModal from "../../modal/CreateUserModal";

const ManagerUser = () => {
    const data = useSelector((state) => state.userCRUD?.listUsers?.data);
    const accessToken = useSelector(
        (state) => state.user?.userInfo?.accessToken
    );
    const decodedToken = accessToken ? jwtDecode(accessToken) : null;

    const userPermissions = decodedToken?.role?.[0]?.permissions || [];

    const dispatch = useDispatch();
    const [showEditModal, setShowEditModal] = useState(false); // For Edit User Modal control
    const [showCreateModal, setShowCreateModal] = useState(false); // For Create User Modal control
    const [selectedUser, setSelectedUser] = useState(null); // To hold selected user info

    useEffect(() => {
        dispatch(requestFindAllUsers());
    }, [dispatch]);

    const handleEdit = (user) => {
        setShowEditModal(true);
        setSelectedUser({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    };

    const handleUpdateUser = () => {
        setShowEditModal(false);
    };

    const handleDelete = async (id) => {
        if (userPermissions.includes("delete")) {
            await dispatch(requestDeleteUser(id));
            await dispatch(requestFindAllUsers());
        } else {
            toast.error("You don't have permission to delete");
        }
    };

    const handleCreate = () => {
        if (userPermissions.includes("create")) {
            setShowCreateModal(true); // Open the Create User modal
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
            <CreateUserModal
                show={showCreateModal}
                handleClose={() => setShowCreateModal(false)}
            />
        </div>
    );
};

export default ManagerUser;
