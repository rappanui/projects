package br.com.brand.people.resource;

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
 
@SuppressWarnings("rawtypes")
@RestController
public class PeopleResource {
	
	@Autowired
	PeopleService peopleService;
	
	public static final Pattern VALID_EMAIL_ADDRESS_REGEX = 
		    Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

	@RequestMapping(value = "/people")
	public ResponseEntity<List<People>> listPeople() {
		return new ResponseEntity<List<People>>(new ArrayList<People>(peopleService.listPeople()), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/people", method = RequestMethod.DELETE)
	public ResponseEntity<List<People>> deleteAllPeople() {
		peopleService.deleteAll();
		return new ResponseEntity(HttpStatus.OK);
	}
  
	@RequestMapping(value = "/people/{user}")
	public ResponseEntity<?> findPeopleByUser(@PathVariable("user") String user) {
		People people = null;
		
		if (peopleService.isExistingPeople(user)) {
			people = peopleService.findPeopleByUser(user);
		} else {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
       return new ResponseEntity<People>(people, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/people", method = RequestMethod.POST)
	public ResponseEntity<?> insertPeople(@RequestBody People people) {
		
		if(!checkIsValidEmailFormat(people.getEmail())) {
			return new ResponseEntity("Invalid email format", HttpStatus.BAD_REQUEST);
		}
		
		if (!peopleService.isExistingPeople(people.getUser())) {
			peopleService.insertPeople(people);
		} else {
			return new ResponseEntity("Username already in use!", HttpStatus.BAD_REQUEST);
		}
       return new ResponseEntity("Person inserted Sucessfully!", HttpStatus.OK);
	}
	
	@RequestMapping(value = "/people", method = RequestMethod.PUT)
	public ResponseEntity<?> updateExistingPeopleData(@RequestBody People people, String user) {
		
		if(!checkIsValidEmailFormat(people.getEmail())) {
			return new ResponseEntity("Invalid email format", HttpStatus.BAD_REQUEST);
		}
		
		if (!peopleService.isExistingPeople(user)) {
			peopleService.updateExistingPeopleData(user, people);
		} else {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
       return new ResponseEntity(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/people/{user}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deletePeopleByUser(@PathVariable("user") String user) {
		
		if (peopleService.isExistingPeople(user)) {
			peopleService.deletePeopleByUser(user);
		} else {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
       return new ResponseEntity(HttpStatus.OK);
	}
	

	public static boolean checkIsValidEmailFormat(String email) {
	        Matcher matcher = VALID_EMAIL_ADDRESS_REGEX .matcher(email);
	        return matcher.find();
	}

}