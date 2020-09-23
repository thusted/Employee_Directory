import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";

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
    this.setState({ search: event.target.value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.getEmployees(this.state.search)
      .then((employees) => {
        this.setState({
          employees: employees
        });
      })
      .catch(err => this.setState({ error: err.message }));
  };
  render() {
    const {employees} = this.state;
    return (
      <div>
        <Container style={{ minHeight: "80%" }}>
          <h1 className="text-center">Employee Directory</h1>
          <SearchForm
            handleFormSubmit={this.handleFormSubmit}
            handleInputChange={this.handleInputChange}
            name={this.state.results}
          />
          <SearchResults results={this.state.results} />
          <div>
            {employees.map((employee) => (
              <ul>
                <img alt="employeeImg" src={employee.image}/>
                <li>Name: {employee.name}</li>
                <li>Country: {employee.country}</li>
                <li>Phone: {employee.phone}</li>
                <li>Email: {employee.email}</li>
              </ul>
            ))}
          </div>
        </Container>
      </div>
    );
  }
}

export default EmployeeDirectory;
