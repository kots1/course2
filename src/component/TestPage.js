import React, {useState} from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import './css/TestPage.css'; // Імпортуємо CSS стилі

const TestPage = () => {
    const questions = [
        {
            id: 1,
            question: 'What is the difference between JavaScript and Java?',
            options: ['JavaScript is a scripting language, while Java is a programming language', 'JavaScript is used for front-end web development, while Java is used for server-side development', 'Java is a statically typed language, while JavaScript is dynamically typed', 'All of the above'],
            correctAnswer: 'All of the above',
        },
        {
            id: 2,
            question: 'What is the purpose of CSS in web development?',
            options: ['To define the structure and layout of a web page', 'To add interactivity and dynamic behavior to a web page', 'To style the visual presentation of a web page', 'To handle server-side logic and database operations'],
            correctAnswer: 'To style the visual presentation of a web page',
        },
        {
            id: 3,
            question: 'Which data structure is used to implement a Last-In-First-Out (LIFO) behavior?',
            options: ['Queue', 'Stack', 'Tree', 'Graph'],
            correctAnswer: 'Stack',
        },
        // Додайте більше питань
    ];
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const handleAnswerSelect = (questionId, answer) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };
    return (
        <Container>
            <h1 className="my-4">Test Page</h1>
            {questions.map((question) => (
                <Card key={question.id} className="mb-4">
                    <Card.Body>
                        <Card.Title>Question {question.id}</Card.Title>
                        <Card.Text>{question.question}</Card.Text>
                        <div className="options-wrapper">
                            <Form.Group>
                                {question.options.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`option ${selectedAnswers[question.id] === option ? 'selected' : ''}`}
                                        onClick={() => handleAnswerSelect(question.id, option)}
                                    >
                                        <Form.Check
                                            type="radio"
                                            name={`question-${question.id}`}
                                            id={`question-${question.id}-${index}`}
                                            checked={selectedAnswers[question.id] === option}
                                        />
                                        <span>{option}</span>
                                    </div>
                                ))}
                            </Form.Group>
                        </div>
                        <Button variant="primary">Submit Answer</Button>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};

export default TestPage;