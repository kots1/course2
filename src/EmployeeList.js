import React, {Component} from 'react'
import {Link, withRouter} from "react-router-dom";
import {Button, ButtonGroup, Container, Form, FormGroup, Input, Label, Table} from "reactstrap";

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    return JSON.parse(tokenString)
}

class EmployeeList extends Component {


    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            size: 10,
            page: 1,
            totalPages: 0,
            pattern: '',
        };

        let size = Number(new URLSearchParams(this.props.location.search).get("size"));
        if (size !== 0) {
            this.state.size = size
        }
        let page = Number(new URLSearchParams(this.props.location.search).get("page"));
        if (page !== 0) {
            this.state.page = page
        }
        this.state.page = new URLSearchParams(this.props.location.search).get("pattern")
        this.handleSizeChange = this.handleSizeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePatternChange = this.handlePatternChange.bind(this);
        this.logout = this.logout.bind(this);


    }

    handleSizeChange(event) {
        const target = event.target;
        const value = Number(target.value);
        let size = {...this.state.size};
        size = value;
        this.setState({size});

    }

    handlePatternChange(event) {
        const target = event.target;
        const value = target.value;
        let pattern = {...this.state.pattern};
        pattern = value;
        this.setState({pattern});

    }

    async logout(event) {
        event.preventDefault();
        await fetch(`/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            sessionStorage.removeItem("token")
        });
        this.props.history.push('/login');
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.state.page = 1
        await this.getEmployee()
        this.props.history.push('/?' + new URLSearchParams({
            size: this.state.size,
            page: this.state.page,
            pattern: this.state.pattern,
        }));
    }

    async handlePageChange(value) {
        this.state.page = value
        await this.getEmployee();
        this.props.history.push('/?' + new URLSearchParams({
            size: this.state.size,
            page: this.state.page,
        }));
    }

    async componentDidMount() {
        if (!getToken()){
            this.props.history.push('/login');
            return;
        }
        await this.getEmployee()

    }

    async getEmployee() {
        let currentPage = this.state.page - 1;
        const response = await fetch('/v1/company/employee?' + new URLSearchParams({
            size: this.state.size,
            page: currentPage,
            pattern: this.state.pattern,
        }));
        const body = await response.json();
        this.setState({employees: body.content, totalPages: body.totalPages});
    }

    async remove(id) {
        await fetch(`/v1/company/employee/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedEmployees = [...this.state.employees].filter(i => i.id !== id);
            this.setState({employees: updatedEmployees});
        });
    }


    render() {

        const current = this.state.page;
        const totalPages = this.state.totalPages;
        const token = getToken();

        const employeeList = this.state.employees.map(employee => {
            let isActive;
            if (employee.active) {
                isActive = "Yes";
            } else {
                isActive = "No";
            }
            return <tr key={employee.id}>
                <td><Button size="sm" color="primary" className={"mx-1"} tag={Link} to={"/employee/" + employee.id}> View</Button></td>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{isActive}</td>
                <td>{employee.department.name}</td>
                <td>
                    <ButtonGroup >
                        <Button size="sm" color="primary" className={"mx-1"} tag={Link} to={"/edit/" + employee.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(employee.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });
        return (
            <div className={"container pt-5"}>

                <Container fluid>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <div className="container-fluid">
                            <a className="navbar-brand">Employee</a>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item mx-2">
                                        <Button  className="navbar-brand " color="primary" aria-current="page"  tag={Link} to={"/edit/new"}>Add Employee</Button>
                                    </li>
                                    <li className="nav-item">
                                        <Button className="navbar-brand" color="primary" aria-current="page" onClick={this.logout}>Logout</Button>
                                    </li>
                                    <li className="nav-item">
                                        <Button className="navbar-brand disabled" color="primary"  >{token}</Button>
                                    </li>
                                </ul>

                                <form className="d-flex" onSubmit={this.handleSubmit}>
                                    <Input type="text" name="pattern" id="pattern" value={this.state.pattern || ''}
                                           onChange={this.handlePatternChange} autoComplete="pattern"/>
                                    <Button color="primary" className="navbar-brand" type="submit">Search</Button>{' '}
                                </form>
                            </div>
                        </div>
                    </nav>

                    <Table className="m-6">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Active</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {employeeList}
                        </tbody>
                    </Table>
                    <nav aria-label="Countries Pagination">
                        {totalPages > 1 ?
                            <ul className="pagination">
                                <li className={`page-item`}>
                                    <a className="page-link" href="#" onClick={() => this.handlePageChange(1)}>First</a>
                                </li>
                                {current - 2 > 0 ?
                                    <li className={`page-item`}>
                                        <a className="page-link" href="#"
                                           onClick={() => this.handlePageChange(current - 2)}>{current - 2}</a>
                                    </li> : ""
                                }
                                {current - 1 > 0 ?
                                    <li className={`page-item`}>
                                        <a className="page-link" href="#"
                                           onClick={() => this.handlePageChange(current - 1)}>{current - 1}</a>
                                    </li> : ""
                                }
                                <li className={`page-item active`}>
                                    <a className="page-link" href="#"
                                       onClick={() => this.handlePageChange(current)}>{current}</a>
                                </li>
                                {current + 1 <= totalPages ?
                                    <li className={`page-item`}>
                                        <a className="page-link" href="#"
                                           onClick={() => this.handlePageChange(current + 1)}>{current + 1}</a>
                                    </li> : ""
                                }
                                {current + 2 <= totalPages ?
                                    <li className={`page-item`}>
                                        <a className="page-link" href="#"
                                           onClick={() => this.handlePageChange(current + 2)}>{current + 2}</a>
                                    </li> : ""
                                }
                                <li className={`page-item `}>
                                    <a className="page-link" href="#"
                                       onClick={() => this.handlePageChange(totalPages)}>Last</a>
                                </li>
                            </ul> : ""
                        }
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <div className={"w-25 p-3"}>
                                    <Label for="size">Count on page</Label>
                                    <Input type="number" name="size" id="size" value={this.state.size || ''}
                                           onChange={this.handleSizeChange} autoComplete="size" required/>
                                </div>
                            </FormGroup>
                            <Button color="primary" type="submit">Show</Button>{' '}
                        </Form>
                    </nav>
                </Container>
            </div>
        );
    }
}

export default withRouter(EmployeeList)