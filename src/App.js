import React, {Component} from 'react';
import './App.css';
import EmployeeList from "./EmployeeList";
import {BrowserRouter as Router, Route} from "react-router-dom";

import EmployeeEdit from "./EmployeeEdit";
import Login from "./Login";
import Registration from "./Registration";
import Employee from "./Employee";




class App extends Component {

    state = {
        username: ''
    }

    render() {
        return (
            <Router>

                <Route path='/login' component={Login}/>
                <Route path='/' exact={true} component={EmployeeList}/>
                <Route path='/employee/:id' component={Employee}/>
                <Route path='/edit/:id' component={EmployeeEdit}/>
                <Route path='/registration' component={Registration}/>

            </Router>

        )

    }
}

export default App;