package ibf.nus.iss.day38_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import ibf.nus.iss.day38_backend.services.ImageService;

@SpringBootApplication
public class Day38BackendApplication implements CommandLineRunner {

	@Autowired
	private ImageService imgSvc;

	public static void main(String[] args) {
		SpringApplication.run(Day38BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		imgSvc.initDirectory();
	}

}
