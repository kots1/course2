import React, {Component} from 'react';
import Registration from "./Registration";

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}
function getToken() {
    const tokenString = sessionStorage.getItem('token');
    return JSON.parse(tokenString)
}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
            },
            message: null
        };
        if (getToken()){
            this.props.history.push('/');
            return
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let user = {...this.state.user};
        this.state.user[name] = value;

    }

    async loginUser(credentials) {
        return fetch('/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {user} = this.state;
        await fetch(`/login?username=${user.username}&password=${user.password}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(response => {
            if (response.status === 401) {
                this.state.message = 'Login or password error, please try again!';

                this.props.history.push('/login');

            } else {
                setToken(this.state.user.username);
                this.props.history.push("/");
            }
        });

    }

    render() {
        const message = this.state.message;
        const userName = this.state.user.username;
        return (
            <div className="login-wrapper container mt-5 w-50 ">
                <form onSubmit={this.handleSubmit}>

                    <h1>Please Log In</h1>
                    {
                        message === null ?
                            "" :
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>
                                    {message}
                                </strong>
                            </div>
                    }
                    <div className="form-outline mb-4">
                        <input type="username" id="username" className="form-control" name="username"
                               onChange={this.handleChange} required/>
                        <label className="form-label" htmlFor="username">Username</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" id="password" className="form-control" name="password"
                               onChange={this.handleChange} required/>
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

                    <div className="text-center">
                        <p>Not a member? <a href="/registration">Register</a></p>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login