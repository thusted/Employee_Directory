import React, { Component } from "react";
import API from "../utils/API";
import Container from "../components/Container";

class EmployeeDirectory extends Component {
  state = {
    search: "",
    employees: []
  };

  // When the component mounts, get a list of all available employees and update employees state
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

  sort = event => {
    const value = event.target.value;
    
    //Sort employees by name
    if(value === "name"){
      const {employees} = this.state;
      this.setState({
        employees: employees.sort(function(a,b) {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if(nameA < nameB) {
            return -1
          }
          if (nameA > nameB) {
            return 1;
          }
        
          // names must be equal
          return 0;
        })
      })
    };

    //Sort employees by country
    if(value === "country"){
      const {employees} = this.state;

      this.setState({
        employees: employees.sort(function(a,b) {
          const countryA = a.country.toLowerCase();
          const countryB = b.country.toLowerCase();
          if(countryA < countryB) {
            return -1
          }
          if (countryA > countryB) {
            return 1;
          }
        
          // names must be equal
          return 0;
        })
      })
    };

    //Sort employees by email
    if(value === "email"){
      const {employees} = this.state;

      this.setState({
        employees: employees.sort(function(a,b) {
          const emailA = a.email.toLowerCase();
          const emailB = b.email.toLowerCase();
          if(emailA < emailB) {
            return -1
          }
          if (emailA > emailB) {
            return 1;
          }
        
          // names must be equal
          return 0;
        })
      })
    }
  };

  render() {
    const {employees} = this.state;

    return (
      <div class="content">
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
                  <button value="name" onClick={this.sort} className="dropdown-item">Name</button>
                  <button value="country" onClick={this.sort} className="dropdown-item">Country</button>
                  <button value="email" onClick={this.sort} className="dropdown-item">Email</button>
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
