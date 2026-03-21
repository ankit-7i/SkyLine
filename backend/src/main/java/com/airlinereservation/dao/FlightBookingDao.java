package com.airlinereservation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.airlinereservation.entity.Flight;
import com.airlinereservation.entity.FlightBooking;
import com.airlinereservation.entity.User;
/**
 * @author Ankit Rout
 * @since2025 aug
 * {@summary:  Airline Reservation project}
 * @Mobile:7682949708
 */
@Repository
public interface FlightBookingDao extends JpaRepository<FlightBooking, Integer> {
	
	List<FlightBooking> findByPassenger(User user);
	List<FlightBooking> findByFlight(Flight flight);
	List<FlightBooking> findByFlightAndStatus(Flight flight, String status);
	List<FlightBooking> findByFlightAndStatusNotIn(Flight flight, List<String> status);
	List<FlightBooking> findByFlightAndStatusAndFlightClass(Flight flight, String status, String flightClass);
	List<FlightBooking> findByFlightAndStatusNotInAndFlightClass(Flight flight, List<String> status, String flightClass);
	List<FlightBooking> findByFlightAndFlightClass(Flight flight, String flightClass);
	List<FlightBooking> findByIdAndStatus(int id, String status);
	List<FlightBooking> findByStatusIn(List<String> statuses);
	List<FlightBooking> findByBookingId(String bookingId);

}
