package br.com.brand.people.repository;

import org.springframework.data.repository.CrudRepository;

import br.com.brand.people.model.People;

public interface PeopleRepository extends CrudRepository<People, String> {

}
