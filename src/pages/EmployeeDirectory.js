import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
// import Row from "../components/Row";

class EmployeeDirectory extends Component {
  state = {
    search: "",
    employees: [],
    results: []
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    API.getEmployees()
      .then((employees) => {
        this.setState({ 
        employees: employees
      });
      
    });
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    let value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  // sort() {
  //   const {employees} = this.state;

  //   console.log(employees);
  // }

  render() {
    const {employees} = this.state;

    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
          <h1 className="text-center">Employee Directory</h1>
          <h6 className="text-center">Filter employees by typing in a name or use the dropdown to alphebetically sort employees by category</h6>
          <br></br>
          <div className="row text-center">
            <div className="col">
              <input
                value={this.state.search.toLowerCase()}
                name="search"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Employee Name"
              />
            </div>
            
            <div className="col">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Sort By
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button className="dropdown-item" onClick={this.sort()}>Name</button>
                  <button className="dropdown-item" onClick={this.sort()}>Country</button>
                  <button className="dropdown-item" onClick={this.sort()}>Email</button>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Country</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
              </tr>
            </thead>

            {employees.filter(employee => employee.name.toLowerCase().includes(this.state.search)).map((filteredEmployee, i) => (
              <tbody key={i}>
                <tr>
                  <th scope="row"><img alt="employeeImg" src={filteredEmployee.image}/></th>
                  <td>{filteredEmployee.name}</td>
                  <td>{filteredEmployee.country}</td>
                  <td>{filteredEmployee.phone}</td>
                  <td>{filteredEmployee.email}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </Container>
      </div>
    );
  }
}

export default EmployeeDirectory;
