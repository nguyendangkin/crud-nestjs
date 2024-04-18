import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from "./MainHeader.module.scss";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";

const cx = classNames.bind(styles);

function MainHeader() {
    const userInfo = useSelector((state) => state.user.userInfo);

    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <Nav className={cx("align-items-center")}>
            <Nav.Item>
                <Nav.Link as={Link} to={"/"}>
                    CRUD With Nestjs
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link as={Link} to={"/manager-user"}>
                    Manager User
                </Nav.Link>
            </Nav.Item>
            <div className="ms-auto">
                {/* Xin Chào <span className="fw-bold">An</span> */}
                {/* <Button className="btn-sm ms-4">Đăng xuất</Button> */}
                <Button onClick={() => handleLogin()} className="btn-sm ms-4">
                    Đăng nhập
                </Button>
            </div>
        </Nav>
    );
}

export default MainHeader;
