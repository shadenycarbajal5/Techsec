package com.epiis.apitechsec.dto.response;

import java.util.ArrayList;
import java.util.List;

import com.epiis.apitechsec.generic.ResponseGeneric;
import lombok.Getter;
import lombok.Setter;

public class ResponseUserGetAll extends ResponseGeneric {
	public List<ItemUser> listUser = new ArrayList<>();

	@Getter
	@Setter
	public static class ItemUser {
		public Long id;
		public String username;
		public String name;
		public String document;
		public String phone;
		public String address;
		public String role;
	}
}
