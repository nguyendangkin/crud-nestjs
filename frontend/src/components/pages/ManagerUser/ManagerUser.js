import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";

const ManagerUser = () => {
    const [users, setUsers] = useState([
        { id: 1, email: "john.doe@example.com", name: "John Doe" },
        { id: 2, email: "jane.doe@example.com", name: "Jane Doe" },
    ]);

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleEdit = (user) => {
        // Làm logic để chỉnh sửa user
        // Thường là mở một form với dữ liệu đã được điền trước
        console.log("Edit:", user);
    };

    const handleCreate = () => {
        // Thêm logic để tạo user mới
        // Thường là mở một form rỗng để điền thông tin
        const newUser = { id: users.length + 1, email: "", name: "" };
        setUsers([...users, newUser]);
        console.log("Create new user");
    };
    return (
        <div>
            <Button onClick={handleCreate} className="mb-3">
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
                    {users.map((user) => (
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
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManagerUser;
