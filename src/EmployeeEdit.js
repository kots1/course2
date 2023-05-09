import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';

    function getToken() {
    const tokenString = sessionStorage.getItem('token');
    return JSON.parse(tokenString)
}


class EmployeeEdit extends Component {


    emptyItem = {
        name: '',
        active: '',
        department: {
            name: '',
        }
    }


    constructor(props) {
        super(props);
        this.state = {
            departments: [],
            item: this.emptyItem
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    async componentDidMount() {
        if (!getToken()){
            this.props.history.push('/login');
            return;
        }
        if (this.props.match.params.id !== 'new') {
            const client = await (await fetch(`/v1/company/employee/${this.props.match.params.id}`)).json();
            this.setState({item: client});
        }
        const department = await (await fetch(`/v1/company/department`)).json();
        this.setState({departments: department});
    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        if (name === 'active') {
            item[name] = value !== 'true';
        } else if (name === 'department') {
            item.department.id = value;
        } else {
            item[name] = value;
        }
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        console.log(item)
        await fetch('/v1/company/employee' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/');
    }

    render() {

        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Client' : 'Add Client'}</h2>;
        const department = this.state.departments;
        const departmentList = department.map(department => {
            return <option key={department.id} value={department.id}
                           selected={department.id === item.department.id ? 'selected' : ''}>{department.name}</option>
        });
        return <div className={"container pt-5"}>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <div className={"w-50 p-3"}>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={item.name || ''}
                                   onChange={this.handleChange} autoComplete="name" required/>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className={"w-50 p-3"}>
                            <Label for="email">Active</Label>
                            <Input type="checkbox" name="active" id="active" value={item.active || ''}
                                   checked={item.active}
                                   onChange={this.handleChange} autoComplete="active"/>
                        </div>
                    </FormGroup>
                    <div className={"w-50 p-3"}>
                        <select name="department" onChange={this.handleChange} required>
                            <option hidden disabled selected value> -- select an department --</option>
                            {departmentList}
                        </select>
                    </div>
                    <FormGroup>

                        <Button className={"m-3"} color="primary" type="submit">Save</Button>{' '}
                        <Button className={"m-3"} color="secondary" href="/">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(EmployeeEdit)