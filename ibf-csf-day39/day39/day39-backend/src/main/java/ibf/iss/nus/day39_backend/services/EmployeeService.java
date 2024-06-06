package ibf.iss.nus.day39_backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ibf.iss.nus.day39_backend.models.Employee;
import ibf.iss.nus.day39_backend.respositories.EmployeeRepo;
import ibf.iss.nus.day39_backend.respositories.S3Repo;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo empRepo;

    @Autowired
    private S3Repo s3Repo;

    public boolean addNewEmployee(Employee emp) {
        return empRepo.addNewEmployee(emp);
    }

    public Boolean saveWithS3(Employee employee, MultipartFile file) {
        String s3FileId = s3Repo.saveToS3(file, employee.getFirstName());
        employee.setProfileURL("https://day39s3.sgp1.digitaloceanspaces.com/"+ s3FileId );
        Boolean isEmployeeSaved = empRepo.addNewEmployee(employee);
        return isEmployeeSaved;
    }

    public List<Employee> getAllEmployee() {
        return empRepo.getAllEmployee();
    }

    public Employee getEmployeeById(String id) {
        return empRepo.getEmployeeById(id);
    }
    
    public boolean updateEmployeeById(String id) {
        return empRepo.updateEmployeeById(id);
    }

    public boolean deleteEmployeeById(String id) {
        return empRepo.deleteEmployeeById(id);
    }
}
