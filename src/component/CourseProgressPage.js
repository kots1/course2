import React from 'react';
import { Container, ProgressBar, Card, Button } from 'react-bootstrap';
import './css/CourseProgressPage.css';

const CourseProgressPage = () => {
    const course = {
        title: 'Java Programming',
        description: 'Learn Java from beginner to advanced level',
        progress: 75, // Відсоток проходження курсу
        lessons: [
            { id: 1, title: 'Introduction to Java', progress: 80 },
            { id: 2, title: 'Variables and Data Types', progress: 70 },
            { id: 3, title: 'Control Flow Statements', progress: 90 },
            // Додайте інші уроки курсу
        ],
    };

    return (
        <Container>
            <h1>Course Progress</h1>
            <div className="course-info">
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <ProgressBar variant="success"  now={course.progress} label={`${course.progress}%`} />
            </div>
            <div className="lessons">
                <h3>Lessons</h3>
                {course.lessons.map((lesson) => (
                    <Card key={lesson.id}>
                        <Card.Body>
                            <Card.Title>{lesson.title}</Card.Title>
                            <ProgressBar variant="success"  now={lesson.progress} label={`${lesson.progress}%`} />
                            <br/>
                            <Button variant="primary" href={`/lessons/${lesson.id}`}>Go to Lesson</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default CourseProgressPage;