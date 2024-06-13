package ibf.iss.nus.day39_backend.services;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import ibf.iss.nus.day39_backend.exceptions.DeleteFileException;
import ibf.iss.nus.day39_backend.models.Employee;
import ibf.iss.nus.day39_backend.respositories.EmployeeRepo;
import ibf.iss.nus.day39_backend.respositories.S3Repo;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo empRepo;

    @Autowired
    private S3Repo s3Repo;


    public Employee addEmployee(Employee employee, MultipartFile picFile) throws IOException {
        String url = s3Repo.saveToS3(picFile, employee.getEmail());
        employee.setProfileUrl(url);

        int empId = empRepo.addEmployee(employee);
        employee.setId(empId);

        return employee;
    }


    public List<Employee> getAllEmployee() {
        return empRepo.getAllEmployees();
    }


    public Employee getEmployeeById(Integer id) {
        return empRepo.getEmployeeById(id).get();
    }
    
    @Transactional(rollbackFor = DeleteFileException.class)
    public boolean updateEmployee(Employee employee, String prevFileUrl, MultipartFile newPicFile) {

        s3Repo.deleteFileFrS3(prevFileUrl);

        String url = s3Repo.saveToS3(newPicFile, employee.getEmail());
        employee.setProfileUrl(url);

        // System.out.println("FROM BACKEND EMPLOYEE SERVICE... " + employee.toString());
        return empRepo.updateEmployee(employee);
    }


    public boolean deleteEmployeeById(Integer id) {
        return empRepo.deleteEmployeeById(id);
    }
}
