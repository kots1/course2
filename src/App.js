import React from 'react';
import './App.css';
import Header from "./component/Header";
import TestPage from "./component/TestPage";
import CourseProgressPage from "./component/CourseProgressPage";
import MainPage from "./component/MainPage";
import Compiler from "./component/Compiler";


function App() {
    return (
        <div className="App">
            <Header/>
            {/*<CourseSelection  />*/}
            <Compiler/>
        </div>
    );
}

export default App;