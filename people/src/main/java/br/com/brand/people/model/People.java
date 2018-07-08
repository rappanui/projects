package br.com.brand.people.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class People {

	@Id
	private String user;
	private String name;
	private String email;
	private Long phoneNumber;
	private Long whatsappNumber;
	
	public People() {}
	   
	public People(String user, String name, String email, Long phoneNumber, Long whatsappNumber) {
		super();
		this.user= user;
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.whatsappNumber = whatsappNumber;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(Long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Long getWhatsappNumber() {
		return whatsappNumber;
	}

	public void setWhatsappNumber(Long whatsappNumber) {
		this.whatsappNumber = whatsappNumber;
	}

	 
	@Override
	public String toString() {
		return "People [user=" + getUser() + ", name=" + name + ", email=" + email + ", phoneNumber=" + phoneNumber
				+ ", whatsappNumber=" + whatsappNumber + "]";
	}
	
}