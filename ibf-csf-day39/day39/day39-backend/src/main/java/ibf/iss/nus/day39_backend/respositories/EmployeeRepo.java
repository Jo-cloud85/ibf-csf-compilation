package ibf.iss.nus.day39_backend.respositories;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import ibf.iss.nus.day39_backend.models.Employee;
import ibf.iss.nus.day39_backend.utils.EmpQueries;

@Repository
public class EmployeeRepo implements EmpQueries {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Employee> getAllEmployee(){
        List<Employee> result =new LinkedList<Employee>();
        result = jdbcTemplate.query(
                SQL_GET_ALL_EMPLOYEES, 
                BeanPropertyRowMapper.newInstance(Employee.class));
        return result;
    }

    /* In this case, since you want to return all the fields of Employee*/

    public Employee getEmployeeById(String id) {
        Employee result = new Employee();
        result = jdbcTemplate.queryForObject(
                GET_EMPLOYEE_BY_ID, 
                BeanPropertyRowMapper.newInstance(Employee.class));
        return result;
    }

    public boolean addNewEmployee(Employee empData) {
        int insertResult = 0;
        insertResult = jdbcTemplate.update(
            SQL_INSERT_EMPLOYEE, 
            empData.getEmp_id(),
            empData.getFirstName(),
            empData.getLastName(),
            empData.getEmail(),
            empData.getProfileURL()
        );
        return insertResult > 0 ? true : false;
    }

    public boolean updateEmployeeById(String id) {
        Employee emp = getEmployeeById(id);
        int insertResult = 0;
        insertResult = jdbcTemplate.update(
            SQL_UPDATE_EMPLOYEE_BY_ID, 
            emp.getEmp_id(),
            emp.getFirstName(),
            emp.getLastName(),
            emp.getEmail(),
            emp.getProfileURL()
        );
        return insertResult > 0 ? true : false;
    }

    public boolean deleteEmployeeById(String id) {
        int result = 0;
        Employee emp = getEmployeeById(id);
        result = jdbcTemplate.update(SQL_DELETE_EMPLOYEE_BY_ID, emp);
        return result > 0 ? true : false;
    }
}
