import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestLogin } from "../../../redux/requestApi/auth/userAuth";
import { unwrapResult } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const Login = () => {
    const { userInfo } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo && userInfo.accessToken) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    const validFrom = () => {
        let valid = true;

        if (email.trim() === "") {
            return false;
        }
        if (password.trim() === "") {
            return false;
        }

        return valid;
    };

    const handleSubmit = async () => {
        setSubmitted(true);
        if (validFrom()) {
            const data = {
                email,
                password,
            };
            try {
                const actionResult = await dispatch(requestLogin(data));
                const result = unwrapResult(actionResult);
                if (result.statusCode === 200) {
                    navigate("/");
                }
            } catch (error) {}
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <Row>
                <Col md={12} className="mx-auto">
                    <Form className="p-4 border rounded-3 bg-light">
                        <h3 className="text-center mb-3">Login</h3>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                isInvalid={submitted && !email}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a email address.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="formBasicPassword"
                        >
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                isInvalid={submitted && !password}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter your password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-grid">
                            <Button
                                variant="primary"
                                onClick={() => handleSubmit()}
                                type="button"
                                size="lg"
                            >
                                Login
                            </Button>
                        </div>
                        <div className="mt-3">
                            <Link to={"/register"}>
                                Do you have account? Go to Register now!
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
