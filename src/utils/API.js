import axios from "axios";

// Export an object containing methods we'll use for accessing the Random User API

export default {
  getEmployees: function() {
    return axios.get("https://randomuser.me/api?results=20")
      .then((res) => {
        const employees = res.data.results;
        return employees.map((employee) => {
          return {
            image: employee.picture.thumbnail,
            name: employee.name.first + " " + employee.name.last,
            country: employee.location.country,
            phone: employee.cell,
            email: employee.email
          };
        });
      });
  }
};
