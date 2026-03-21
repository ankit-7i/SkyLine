package com.airlinereservation.dto;

import java.util.ArrayList;
import java.util.List;

import com.airlinereservation.entity.Airplane;

import lombok.Data;
/**
 * @author Ankit Rout
 * @since2024 aug
 * {@summary:  Airline Reservation project}
 * 
 */
@Data
public class AirplaneResponseDto extends CommonApiResponse {
	
	private List<Airplane> airplanes = new ArrayList<>();

}
