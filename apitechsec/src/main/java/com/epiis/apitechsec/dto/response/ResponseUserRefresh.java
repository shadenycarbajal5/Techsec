package com.epiis.apitechsec.dto.response;

import com.epiis.apitechsec.generic.ResponseGeneric;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseUserRefresh extends ResponseGeneric {
	private String access_token;
	private String refresh_token;
	private int expiresIn;
}
