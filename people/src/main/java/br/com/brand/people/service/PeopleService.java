package br.com.brand.people.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.brand.people.model.People;
import br.com.brand.people.repository.PeopleRepository;

@Service
public class PeopleService {
	
	@Autowired
	PeopleRepository peopleRepository;
	
	public List<People> listPeople(){
		List<People> people = new ArrayList<People>();
		peopleRepository.findAll().forEach(people::add);
		return people;
	}
	
	public People findPeopleByUser(String user) {
		return peopleRepository.findOne(user);
	}

	public void insertPeople(People people) {
		peopleRepository.save(people);
	}
	
	public void updateExistingPeopleData(String user, People people) {
		peopleRepository.save(people);
	}
	
	public void deletePeopleByUser(String user) {
		peopleRepository.delete(user);
	}

	public boolean isExistingPeople(String user) {
		return peopleRepository.exists(user);
	}
}
