import React, {Component} from 'react';

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    return JSON.parse(tokenString)
}

class Registration extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                id:0,
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
            },
            message: [],
        };
        if (getToken()) {
            this.props.history.push('/');
            return
        }
        this.handleChange = this.handleChange.bind(this);
        this.registrationUser = this.registrationUser.bind(this);
        this.registrationUser = this.registrationUser.bind(this);
        this.validateForm = this.validateForm.bind(this);

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.state.user[name] = value;

    }

    validateForm() {
        let message = {...this.state.message};
        message = []
        const {user} = this.state;
        let password = user.password
        let confirmPassword = user.confirmPassword
        if (password.length < 6) {
            message.push("Password should be longer then 6");
        }
        if (password !== confirmPassword) {
            message.push("Two passwords are not equals");
        }
        this.setState({message});

    }

    async registrationUser(event) {
        event.preventDefault();

        const {user} = this.state;
        this.validateForm()
        if (this.state.message.length === 0) {
            await fetch('/v1/company/registration', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(response => {
                if (response.status === 400) {
                    let message = []
                    message.push('User with this name already exist');
                    this.setState({message});


                } else {
                    this.props.history.push("/login");
                }
            });
        }
    }


    render() {
        const message = this.state.message
        const messageList = this.state.message.map(message => {
            return <li>
                {message}
            </li>
        });
        return (
            <div className="login-wrapper container mt-5 w-50 ">
                <form data-toggle="validator" onSubmit={this.registrationUser}>

                    <h1>Registration</h1>
                    {
                        message.length === 0 ?
                            "" :
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <ul>
                                    {messageList}
                                </ul>
                            </div>
                    }
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input type="username" id="username" className="form-control" name="username"
                               onChange={this.handleChange} required/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input type="email" id="email" className="form-control" name="email"
                               onChange={this.handleChange} required/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" id="password" className="form-control" name="password"
                               onChange={this.handleChange} required/>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="confirmPassword">Password</label>
                        <input type="password" id="confirmPassword" className="form-control" name="confirmPassword"
                               onChange={this.handleChange} required/>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>

                    <div className="text-center">
                        <p>Has account? <a href="/login">Login</a></p>
                    </div>
                </form>
            </div>
        )
    }
}

export default Registration