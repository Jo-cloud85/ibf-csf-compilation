package ibf.nus.iss.csf.day39workshopbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class Day39workshopBackendApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(Day39workshopBackendApplication.class, args);
	}
}
