package com.epiis.apitechsec.dto.response;

import com.epiis.apitechsec.generic.ResponseGeneric;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseUserLogin extends ResponseGeneric {
	private String access_token;
	private String refresh_token;
	private int expiresIn;
	private ItemUser user;

	@Getter
	@Setter
	public static class ItemUser {
		private Long id;
		private String username;
		private String name;
		private String document;
		private String phone;
		private String address;
		private String role;
	}
}
