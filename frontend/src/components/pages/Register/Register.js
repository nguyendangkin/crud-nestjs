import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { requestRegister } from "../../../redux/requestApi/userAccount/userAccount";
import { unwrapResult } from "@reduxjs/toolkit";

const Register = () => {
    const { loading } = useSelector((state) => state.user);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [yourName, setYourName] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [yourNameError, setYourNameError] = useState("");

    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleChange = (setter, errorSetter, value) => {
        setter(value);
        if (submitted) {
            errorSetter("");
        }
    };

    const validForm = () => {
        let valid = true;

        if (!email.trim()) {
            setEmailError("Email is required.");
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setEmailError("Invalid email format.");
            valid = false;
        } else {
            const enhancedEmailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]+$/;
            if (!enhancedEmailRegex.test(email.trim())) {
                setEmailError("Invalid email format.");
                valid = false;
            } else {
                setEmailError("");
            }
        }

        if (!password.trim()) {
            setPasswordError("Password is required.");
            valid = false;
        } else {
            setPasswordError("");
        }

        if (!confirmPassword.trim()) {
            setConfirmPasswordError("Confirm password is required.");
            valid = false;
        } else if (password.trim() !== confirmPassword.trim()) {
            setConfirmPasswordError("Passwords do not match.");
            valid = false;
        } else {
            setConfirmPasswordError("");
        }

        if (!yourName.trim()) {
            setYourNameError("Name is required.");
            valid = false;
        } else {
            setYourNameError("");
        }

        return valid;
    };

    const handleSubmit = async () => {
        setSubmitted(true);
        if (validForm()) {
            const data = {
                email: email.trim(),
                password: password.trim(),
                confirmPassword: confirmPassword.trim(),
                name: yourName.trim(),
            };
            try {
                const actionResult = await dispatch(requestRegister(data));
                const result = unwrapResult(actionResult);
                if (result.statusCode === 201) {
                    navigate("/login");
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
                        <h3 className="text-center mb-3">Register</h3>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) =>
                                    handleChange(
                                        setEmail,
                                        setEmailError,
                                        e.target.value
                                    )
                                }
                                isInvalid={submitted && emailError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {emailError ||
                                    "Please enter a valid email address."}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control
                                type="text"
                                placeholder="Your name"
                                value={yourName}
                                onChange={(e) =>
                                    handleChange(
                                        setYourName,
                                        setYourNameError,
                                        e.target.value
                                    )
                                }
                                isInvalid={submitted && yourNameError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {yourNameError || "Please enter your name."}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    handleChange(
                                        setPassword,
                                        setPasswordError,
                                        e.target.value
                                    )
                                }
                                isInvalid={submitted && passwordError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {passwordError || "Please enter your password."}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    handleChange(
                                        setConfirmPassword,
                                        setConfirmPasswordError,
                                        e.target.value
                                    )
                                }
                                isInvalid={submitted && confirmPasswordError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {confirmPasswordError ||
                                    "Please confirm your password."}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div className="d-grid">
                            <Button
                                variant="success"
                                onClick={handleSubmit}
                                type="button"
                                size="lg"
                                disabled={loading}
                            >
                                {loading ? "Is Loading..." : "Register!"}
                            </Button>
                        </div>
                        <div className="mt-3">
                            <Link to={"/login"}>
                                Do you have an account? Now login!
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
