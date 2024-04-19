import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestLogout } from "../../../redux/requestApi/auth/userAuth";
import { toast } from "react-toastify";
import { logoutUser } from "../../../redux/reducer/userSlice";
import Button from "react-bootstrap/esm/Button";
import classNames from "classnames/bind";
import styles from "./MainHeader.module.scss";
import Nav from "react-bootstrap/Nav";

const cx = classNames.bind(styles);

function MainHeader() {
    const { userInfo } = useSelector((state) => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        dispatch(logoutUser());
        dispatch(requestLogout());
        toast.success("Logout Success!");
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
            <Nav.Item>
                <Nav.Link as={Link} to={"/user-profile"}>
                    User Profile
                </Nav.Link>
            </Nav.Item>
            <div className="ms-auto">
                {userInfo && userInfo.accessToken ? (
                    <>
                        Xin Chào{" "}
                        <span className="fw-bold">
                            {userInfo.userProfile.name}
                        </span>
                        <Button
                            className="btn-sm ms-4"
                            onClick={() => handleLogout()}
                        >
                            Đăng xuất
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="success"
                        onClick={() => handleLogin()}
                        className="btn-sm ms-4"
                    >
                        Đăng nhập
                    </Button>
                )}
            </div>
        </Nav>
    );
}

export default MainHeader;
