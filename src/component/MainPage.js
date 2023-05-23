import React, { useState } from 'react';
import { Card, Button, ProgressBar } from 'react-bootstrap';
import './css/HomePage.css';

const CourseList = ({ courses }) => {
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleCourseClick = (course) => {
        if (selectedCourse === course.id) {
            setSelectedCourse(null);
        } else {
            setSelectedCourse(course.id);
        }
    };

    return (
        <div>
            {courses.map((course) => (
                <Card key={course.id} className="course-card">
                    <Card.Header>
                        <Button
                            variant="link"
                            onClick={() => handleCourseClick(course)}
                            aria-expanded={selectedCourse === course.id}
                        >
                            {course.title}
                        </Button>
                    </Card.Header>
                    {selectedCourse === course.id && (
                        <Card.Body>
                            <div className="course-progress">
                                <h6>Progress: {course.progress}%</h6>
                                <ProgressBar variant="success" now={course.progress} label={`${course.progress}%`} />
                            </div>
                            <h6>Lessons:</h6>
                            <ul className="lesson-list">
                                {course.lessons.map((lesson) => (
                                    <li key={lesson.id}>{lesson.title}</li>
                                ))}
                            </ul>
                            <Button variant="primary">Go to Course</Button>
                        </Card.Body>
                    )}
                </Card>
            ))}
        </div>
    );
};

const HomePage = () => {
    const courses = [
        {
            id: 1,
            title: 'Java Programming',
            progress: 50,
            lessons: [
                { id: 1, title: 'Introduction to Java' },
                { id: 2, title: 'Variables and Data Types' },
                // Додайте інші уроки
            ],
        },
        {
            id: 2,
            title: 'Python Programming',
            progress: 75,
            lessons: [
                { id: 1, title: 'Getting Started with Python' },
                { id: 2, title: 'Conditional Statements' },
                // Додайте інші уроки
            ],
        },
        // Додайте інші курси
    ];

    return (
        <div className="homepage">
            <h1 className="homepage-title">Course Selection</h1>
            <CourseList courses={courses} />
        </div>
    );
};

export default HomePage;