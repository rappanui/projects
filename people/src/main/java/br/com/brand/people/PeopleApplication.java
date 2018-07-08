package br.com.brand.people;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestTemplate;

import br.com.brand.people.model.People;

@SpringBootApplication
public class PeopleApplication {
 
  public static void main(String[] args) throws Exception {
	SpringApplication.run(PeopleApplication.class, args);
  }
 
}
