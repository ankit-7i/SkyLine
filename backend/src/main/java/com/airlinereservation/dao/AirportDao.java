package com.airlinereservation.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.airlinereservation.entity.Airport;
/**
 * @author Ankit Rout
 * @since2025 aug
 * {@summary:  Airline Reservation project}
 * @Mobile:7682949708
 */
@Repository
public interface AirportDao  extends JpaRepository<Airport, Integer>{

}
