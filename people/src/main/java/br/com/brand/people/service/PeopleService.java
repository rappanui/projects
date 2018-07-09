package br.com.brand.people.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import br.com.brand.people.model.People;
import br.com.brand.people.repository.PeopleRepository;

/**
 * Contains the methods to Create, Read, Update and Delete people data 
 * @author Raphael Pereira da Silva
 */
@Service
public class PeopleService {

	@Autowired
	JdbcTemplate jdbcTemplate;
	
	@Autowired
	PeopleRepository peopleRepository;
	
	public List<People> listPeople(){
		List<People> people = new ArrayList<People>();
		peopleRepository.findAll().forEach(people::add);
		return people;
	}
	
	public People findPeopleByUsername(String username) {
		return peopleRepository.findOne(username);
	}

	public void insertPeople(People people) {
		peopleRepository.save(people);
	}
	
	public void updateExistingPeopleData(String username, People people) {
		peopleRepository.save(people);
	}
	
	public void deletePeopleByUsername(String username) {
		peopleRepository.delete(username);
	}

	public boolean isExistingPeople(String username) {
		return peopleRepository.exists(username);
	}
	
	public void deleteAll() {
		peopleRepository.deleteAll();
	}
}
