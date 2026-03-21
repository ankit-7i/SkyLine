package com.airlinereservation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.airlinereservation.entity.Airport;
import com.airlinereservation.entity.Flight;
/**
 * @author Ankit Rout
 * @since2025 aug
 * {@summary:  Airline Reservation project}
 * @Mobile:7682949708
 */
@Repository
public interface FlightDao extends JpaRepository<Flight, Integer> {

	List<Flight> findByDepartureTimeGreaterThanEqualAndStatusNotIn(String departureTime, List<String> status);

	List<Flight> findByDepartureAirportAndArrivalAirportAndDepartureTimeBetweenAndStatusNotIn(
			Airport departureAirport, Airport arrivalAirport, String startTime, String endTime, List<String> status);

}
