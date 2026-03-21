package com.airlinereservation.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
/**
 * @author Ankit Rout 
 * @since2025 aug
 * {@summary:  Airline Reservation project}
 */
@Configuration
public class SwaggerConfig {

	// for swagger UI use --> http://localhost:8080/swagger-ui/index.html

		@Bean
		public OpenAPI springShopOpenAPI() {
			return new OpenAPI()
					.info(new Info().title("Airline Reservation System")
					.description("Airline Reservation System using Spring Boot 3")
					.version("v0.0.1")
					.license(new License()
					.name("Apache 2.0")
					.url("http://springdoc.org")))
					.externalDocs(new ExternalDocumentation().description("Cool Coder")
					.url("https://google.com"));
		}

}
