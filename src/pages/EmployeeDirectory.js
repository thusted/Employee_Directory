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

  render() {
    const {employees} = this.state;
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
          <h1 className="text-center">Employee Directory</h1>

          <input
            value={this.state.search.toLowerCase()}
            name="search"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Type a name of an employee"
          />
        
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
            {employees.filter(employee => employee.name.toLowerCase().includes(this.state.search)).map(filteredEmployee => (
              <tbody>
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
