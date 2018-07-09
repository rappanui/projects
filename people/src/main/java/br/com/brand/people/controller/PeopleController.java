package br.com.brand.people.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.brand.people.model.People;
import br.com.brand.people.service.PeopleService;

/**
 * Controller class responsable for receive the http requests, validate input and call the service methods to persist data
 * @author Raphael Pereira da Silva
 */
@RestController
public class PeopleController {
	
	@Autowired
	PeopleService peopleService;
	
	/**
	 * Regex constant for email validation
	 */
	public static final Pattern VALID_EMAIL_ADDRESS_REGEX = 
		    Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

	/**
	 * Returns a list of all inserted people
	 * @return ResponseEntity<List<People>>
	 */
	@RequestMapping(value = "/people")
	public ResponseEntity<List<People>> listPeople() {
		return new ResponseEntity<List<People>>(new ArrayList<People>(peopleService.listPeople()), HttpStatus.OK);
	}
	
	/**
	 * Delete all inserted people
	 * @return message
	 */
	@RequestMapping(value = "/people", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteAllPeople() {
		peopleService.deleteAll();
		return new ResponseEntity<>("People deleted successfully", HttpStatus.OK);
	}
  
	/**
	 * Return a selected person by username
	 * @param username
	 * @return ResponseEntity
	 */
	@RequestMapping(value = "/people/{username}")
	public ResponseEntity<?> findPeopleByUser(@PathVariable("username") String username) {
		People people = null;
		
		if (peopleService.isExistingPeople(username)) {
			people = peopleService.findPeopleByUsername(username);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
       return new ResponseEntity<People>(people, HttpStatus.OK);
	}
	
	/**
	 * Insert a person with the inputed parameters
	 * @param people
	 * @return ResponseEntity
	 */
	@RequestMapping(value = "/people", method = RequestMethod.POST)
	public ResponseEntity<?> insertPeople(@RequestBody(required=false) People people) {
		
		if(people.getEmail() != null && !checkIsValidEmailFormat(people.getEmail())) {
			return new ResponseEntity<>("Invalid email format", HttpStatus.BAD_REQUEST);
		}
		
		if (!peopleService.isExistingPeople(people.getUsername())) {
			peopleService.insertPeople(people);
		} else {
			return new ResponseEntity<>("Username already in use!", HttpStatus.BAD_REQUEST);
		}
       return new ResponseEntity<>("Person inserted Sucessfully!", HttpStatus.OK);
	}
	
	/**
	 * Update the selected person data with the inputed data
	 * @param people
	 * @param username
	 * @return ResponseEntity
	 */
	@RequestMapping(value = "/people/{username}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateExistingPeopleData(@RequestBody People people, @PathVariable("username") String username) {
		
		if(people.getEmail() != null && !checkIsValidEmailFormat(people.getEmail())) {
			return new ResponseEntity<>("Invalid email format", HttpStatus.BAD_REQUEST);
		}
		
		if (peopleService.isExistingPeople(username)) {
			peopleService.updateExistingPeopleData(username, people);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
       return new ResponseEntity<>("Person updated successfully", HttpStatus.OK);
	}
	
	/**
	 * Delete a unique person by username
	 * @param username
	 * @return ResponseEntity
	 */
	@RequestMapping(value = "/people/{username}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deletePeopleByUser(@PathVariable("username") String username) {
		
		if (peopleService.isExistingPeople(username)) {
			peopleService.deletePeopleByUsername(username);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
       return new ResponseEntity<>("Person deleted successfully", HttpStatus.OK);
	}
	

	/**
	 * Check if the inputed email has a valid pattern
	 * @param email
	 * @return boolean
	 */
	public static boolean checkIsValidEmailFormat(String email) {
		if(email.isEmpty()) {
			return true;
		}
		Matcher matcher = VALID_EMAIL_ADDRESS_REGEX .matcher(email);
		return matcher.find();
	}

}