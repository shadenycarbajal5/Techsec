package com.epiis.apitechsec.helper;

import java.math.BigDecimal;

public class GenericHelper {
	private GenericHelper() {}

	public static boolean isBlank(String value) {
		return value == null || value.trim().isEmpty();
	}

	public static BigDecimal orZero(BigDecimal value) {
		return value == null ? BigDecimal.ZERO : value;
	}
}
