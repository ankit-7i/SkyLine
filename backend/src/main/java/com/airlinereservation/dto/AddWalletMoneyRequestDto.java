package com.airlinereservation.dto;

import java.math.BigDecimal;

import lombok.Data;
/**
 * @author Ankit Rout
 * @since2025 aug
 * {@summary:  Airline Reservation project}
 * @Mobile:7682949708
 */
@Data
public class AddWalletMoneyRequestDto {
	
	private int userId;
	
	private double  walletAmount;

}
