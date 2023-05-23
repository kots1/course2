import React from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';

const CourseTestPage = () => {
    return (
        <Container>
            <h2>Course Test</h2>

            <Card>
                <Card.Body>
                    <Card.Title>Test Title</Card.Title>
                    <Card.Text>Test Description</Card.Text>

                    <Form>
                        <Form.Group controlId="question1">
                            <Form.Label>Question 1:</Form.Label>
                            <Form.Check type="radio" name="question1" label="Option 1" />
                            <Form.Check type="radio" name="question1" label="Option 2" />
                            <Form.Check type="radio" name="question1" label="Option 3" />
                        </Form.Group>

                        <Form.Group controlId="question2">
                            <Form.Label>Question 2:</Form.Label>
                            <Form.Check type="radio" name="question2" label="Option 1" />
                            <Form.Check type="radio" name="question2" label="Option 2" />
                            <Form.Check type="radio" name="question2" label="Option 3" />
                        </Form.Group>

                        <Form.Group controlId="question3">
                            <Form.Label>Question 3:</Form.Label>
                            <Form.Check type="radio" name="question3" label="Option 1" />
                            <Form.Check type="radio" name="question3" label="Option 2" />
                            <Form.Check type="radio" name="question3" label="Option 3" />
                        </Form.Group>

                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CourseTestPage;