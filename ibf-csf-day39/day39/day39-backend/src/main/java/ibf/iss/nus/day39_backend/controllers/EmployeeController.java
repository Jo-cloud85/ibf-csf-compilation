package ibf.iss.nus.day39_backend.controllers;

import java.io.IOException;
import java.io.StringWriter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import ibf.iss.nus.day39_backend.models.Employee;
import ibf.iss.nus.day39_backend.services.EmployeeService;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonWriter;

@Controller
@RequestMapping("/api")
public class EmployeeController {

    @Autowired 
    private EmployeeService empSvc;

    @GetMapping(path="/employees")
    public ResponseEntity<String> getAllEmployee(){
        List<Employee> allEmployees = empSvc.getAllEmployee();

        JsonArrayBuilder jsonArr = Json.createArrayBuilder();

        for (Employee emp : allEmployees) {
            JsonObject jsonObj = convertJsonToStr(emp);
            jsonArr.add(jsonObj);
        }
        
        StringWriter stringWriter = new StringWriter();
        try (JsonWriter jsonWriter = Json.createWriter(stringWriter)) {
            jsonWriter.writeArray(jsonArr.build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(stringWriter.toString());
    }

    @GetMapping(path="/employee/{emp_id}")
    public ResponseEntity<String> getEmployeeById(@PathVariable("emp_id") String id){
        Employee emp = empSvc.getEmployeeById(id);

        JsonObject jsonObj = convertJsonToStr(emp);

        StringWriter stringWriter = new StringWriter();
        try (JsonWriter jsonWriter = Json.createWriter(stringWriter)) {
            jsonWriter.writeObject(jsonObj);
        }
        return ResponseEntity.status(HttpStatus.OK).body(stringWriter.toString());
    }

    @PostMapping(path="/add-employee")
    public ResponseEntity<String> save(@RequestBody Employee employee) {
        Boolean bSaved = empSvc.addNewEmployee(employee);
        return new ResponseEntity<String>(bSaved.toString(), HttpStatus.OK);
    }

    @PostMapping(path = "/add-employeeS3", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Boolean> postEmployeeWithFileToS3(
        @RequestPart MultipartFile myfile, 
        @RequestPart String firstName,
        @RequestPart String lastName, 
        @RequestPart String email) throws IOException {

        Employee newEmployee = new Employee();
        newEmployee.setFirstName(firstName);
        newEmployee.setLastName(lastName);
        newEmployee.setEmail(email);

        Boolean result = empSvc.saveWithS3(newEmployee, myfile);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PutMapping(path="/update/{emp_id}")
    public ResponseEntity<String> update(
        @PathVariable("emp_id") String id,
        @RequestBody Employee employee) {
            
        String empId = employee.getEmp_id();
        Boolean isUpdated = empSvc.updateEmployeeById(empId);
        return new ResponseEntity<String>(isUpdated.toString(), HttpStatus.OK);
    }

    @DeleteMapping(path="/delete/{emp_id}")
    public ResponseEntity<String> delete(@PathVariable("emp_id") String id) {
        Boolean isDeleted = empSvc.deleteEmployeeById(id);
        return new ResponseEntity<String>(isDeleted.toString(), HttpStatus.OK);
    }

    public JsonObject convertJsonToStr(Employee emp) {
        JsonObject jsonObj = Json.createObjectBuilder()
            .add("emp_id", emp.getEmp_id())
            .add("firstName", emp.getFirstName())
            .add("lastName", emp.getLastName())
            .add("email", emp.getEmail())
            .add("profileURL", emp.getProfileURL())
            .build();
        return jsonObj;
    }
}
