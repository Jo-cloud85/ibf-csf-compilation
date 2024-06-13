package ibf.iss.nus.day39_backend.respositories;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import ibf.iss.nus.day39_backend.models.Employee;

@Repository
public class EmployeeRepo implements Queries {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Create
    public Integer addEmployee(Employee empData) {
        
        jdbcTemplate.update(
            SQL_ADD_EMPLOYEE, 
            empData.getFirstName(),
            empData.getLastName(),
            empData.getEmail(),
            empData.getProfileUrl()
        );
        return jdbcTemplate.queryForObject(SQL_GET_ID, Integer.class);
    }

    // Read - Read All
    public List<Employee> getAllEmployees() {
        return jdbcTemplate.query(SQL_GET_ALL_EMPLOYEES, new EmployeeRowMapper());
    }

    /* In this case, since you want to return all the fields of Employee*/
    // Read - Read single
    public Employee getEmployeeById(Integer id) {
        return jdbcTemplate.queryForObject(
                SQL_GET_EMPLOYEE_BY_ID,
                BeanPropertyRowMapper.newInstance(Employee.class));
    }


    // Update
    public boolean updateEmployee(Employee emp) {
        return jdbcTemplate.update(
            SQL_UPDATE_EMPLOYEE, 
            emp.getId(),
            emp.getFirstName(),
            emp.getLastName(),
            emp.getEmail(),
            emp.getProfileUrl()
        ) > 0 ? true : false;
    }

    // Delete
    public boolean deleteEmployeeById(Integer id) {
        return jdbcTemplate.update(SQL_DELETE_EMPLOYEE, id)> 0 ? true : false;
    }

    private class EmployeeRowMapper implements RowMapper<Employee> {
        @SuppressWarnings("null")
        @Override
        public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
            Employee emp = new Employee();
            emp.setId(rs.getInt("id"));
            emp.setFirstName(rs.getString("first_name"));
            emp.setLastName(rs.getString("last_name"));
            emp.setEmail(rs.getString("email"));
            emp.setProfileUrl(rs.getString("profile_url"));
            return emp;
        }
    }
}
