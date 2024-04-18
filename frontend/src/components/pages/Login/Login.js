import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        alert("hello");
        setSubmitted(true);
        console.log("Login Attempt:", email, password);
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
        >
            <Row>
                <Col md={12} className="mx-auto">
                    <Form
                        className="p-4 border rounded-3 bg-light"
                        onSubmit={handleSubmit}
                    >
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
                                Please enter a valid email address.
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
