package ibf.iss.nus.day39_backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    private String emp_id;
    private String firstName;
    private String lastName;
    private String email;
    private String profileURL;
}
