package com.dinei84.portifolio;

import org.springframework.boot.SpringApplication;

public class TestPortifolioApplication {

	public static void main(String[] args) {
		SpringApplication.from(PortifolioApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
