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
          <p>
            Your search is {this.state.search.toLowerCase()}
          </p>
          <input
            value={this.state.search.toLowerCase()}
            name="search"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Type a name of an employee"
          />
        
          {employees.filter(employee => employee.name.toLowerCase().includes(this.state.search)).map(filteredEmployee => (
            <ul>
              <img alt="employeeImg" src={filteredEmployee.image}/>
              <li>Name: {filteredEmployee.name}</li>
              <li>Country: {filteredEmployee.country}</li>
              <li>Phone: {filteredEmployee.phone}</li>
              <li>Email: {filteredEmployee.email}</li>
            </ul>
          ))}

        </Container>
      </div>
    );
  }
}

export default EmployeeDirectory;
