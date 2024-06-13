package ibf.iss.nus.day39_backend.controllers;

import java.io.IOException;
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

@Controller
@RequestMapping("/api")
public class EmployeeController {

    @Autowired 
    private EmployeeService empSvc;

    @GetMapping(path="/employees")
    public ResponseEntity<String> getAllEmployee(){
        List<Employee> allEmployees = empSvc.getAllEmployee();

        JsonArrayBuilder jsonArrBuilder = Json.createArrayBuilder();

        for (Employee emp : allEmployees) {
            JsonObject jsonObj = convertJsonToStr(emp);
            jsonArrBuilder.add(jsonObj);
        }
        return ResponseEntity.status(HttpStatus.OK).body(jsonArrBuilder.build().toString());
    }


    @GetMapping(path="/employee/{emp_id}")
    public ResponseEntity<String> getEmployeeById(@PathVariable("emp_id") String id){
        Employee emp = empSvc.getEmployeeById(Integer.parseInt(id));
        JsonObject jsonObj = convertJsonToStr(emp);
        return ResponseEntity.status(HttpStatus.OK).body(jsonObj.toString());
    }


    @PostMapping(path="/add-employeeS3", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addEmployee(
        @RequestPart("firstName") String firstName, 
        @RequestPart("lastName") String lastName,
        @RequestPart("email") String email, 
        @RequestPart("file") MultipartFile picFile) throws IOException {

        System.out.println("picFile input stream >>> " + picFile.getInputStream().toString());
        System.out.println("picFile original filename >>> " + picFile.getOriginalFilename().toString());
        System.out.println("picFile size >>> " + picFile.getSize());

        Employee emp = new Employee();
        emp.setFirstName(firstName);
        emp.setLastName(lastName);
        emp.setEmail(email);
        
        Employee addedEmployee = empSvc.addEmployee(emp, picFile);

        // System.out.println(">>> addedEmployee: " + addedEmployee);

        return ResponseEntity.ok(addedEmployee.toJson().toString());
    }

    
    @PutMapping(path="/update/{emp_id}")
    public ResponseEntity<String> update(
        @PathVariable("emp_id") String id,
        @RequestBody Employee employee) {
            
        Boolean isUpdated = empSvc.updateEmployee(employee);
        return new ResponseEntity<String>(isUpdated.toString(), HttpStatus.OK);
    }

    @DeleteMapping(path="/delete/{emp_id}")
    public ResponseEntity<String> delete(
        @PathVariable("emp_id") String id) {

        Boolean isDeleted = empSvc.deleteEmployeeById(Integer.parseInt(id));
        return new ResponseEntity<String>(isDeleted.toString(), HttpStatus.OK);
    }

    public JsonObject convertJsonToStr(Employee emp) {
        JsonObject jsonObj = Json.createObjectBuilder()
            .add("emp_id", emp.getId())
            .add("firstName", emp.getFirstName())
            .add("lastName", emp.getLastName())
            .add("email", emp.getEmail())
            .add("profileURL", emp.getProfileUrl())
            .build();
        return jsonObj;
    }
}
