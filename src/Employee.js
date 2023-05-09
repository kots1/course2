import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {Button, ButtonGroup} from "reactstrap";

function getToken() {
    const tokenString = sessionStorage.getItem('token');
    return JSON.parse(tokenString)
}


class Employee extends Component {


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
            item: this.emptyItem
        };

    }

    async componentDidMount() {
        if (!getToken()) {
            this.props.history.push('/login');
            return;
        }
        const employee = await (await fetch(`/v1/company/employee/${this.props.match.params.id}`)).json();
        this.setState({item: employee});
    }


    render() {

        const {item} = this.state;
        let isActive = item.active ? 'Yes' : 'No'
        return <div className={"container pt-5"}>
            <h2>Employee view</h2>

            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Id</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">{item.id}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Name</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">{item.name}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Active</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">{isActive}</p>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-3">
                            <p className="mb-0">Department</p>
                        </div>
                        <div className="col-sm-9">
                            <p className="text-muted mb-0">{item.department.name} (id: {item.department.id} )</p>
                        </div>
                    </div>

                </div>

            </div>
            <ButtonGroup >
                <Button size="sm" color="primary" className={"mx-1"} tag={Link} to={"/edit/" + item.id}>Edit</Button>
                <Button size="sm" color="danger" tag={Link} to={"/"}>Back</Button>
            </ButtonGroup>
        </div>
    }
}

export default withRouter(Employee)