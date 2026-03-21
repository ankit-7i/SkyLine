package com.airlinereservation.service;

import java.util.List;

import com.airlinereservation.entity.Airplane;
/**
 * @author Manoranjan Sahoo
 * @since2024 aug
 * {@summary:  Airline Reservation project}
 * @Mobile:8658664378
 */
public interface AirplaneService {
	
	Airplane add(Airplane airplane);
	Airplane getById(int id);
	List<Airplane> getAll();
	
}
