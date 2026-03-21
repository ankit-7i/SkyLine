package com.airlinereservation.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.airlinereservation.entity.Airplane;
import com.airlinereservation.entity.AirplaneSeatNo;
/**
 * @author Ankit Rout
 * @since2025 aug
 * {@summary:  Airline Reservation project}
 * @Mobile:7682949708
 */
@Repository
public interface AirplaneSeatNoDao extends JpaRepository<AirplaneSeatNo, Integer> {
	
	List<AirplaneSeatNo> findByAirplane(Airplane airplane);

}
