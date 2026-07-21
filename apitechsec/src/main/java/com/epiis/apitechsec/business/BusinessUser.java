package com.epiis.apitechsec.business;

import java.util.Date;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.epiis.apitechsec.dto.request.RequestUserInsert;
import com.epiis.apitechsec.dto.request.RequestUserLogin;
import com.epiis.apitechsec.dto.request.RequestUserRefresh;
import com.epiis.apitechsec.dto.response.ResponseUserGetAll;
import com.epiis.apitechsec.dto.response.ResponseUserInsert;
import com.epiis.apitechsec.dto.response.ResponseUserLogin;
import com.epiis.apitechsec.dto.response.ResponseUserRefresh;
import com.epiis.apitechsec.entity.EntityUser;
import com.epiis.apitechsec.repository.RepositoryUser;
import com.epiis.apitechsec.security.JwtUtil;

@Service
public class BusinessUser {
	private final RepositoryUser repositoryUser;
	private final PasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	public BusinessUser(RepositoryUser repositoryUser, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
		this.repositoryUser = repositoryUser;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
	}

	public ResponseUserLogin login(RequestUserLogin request) {
		ResponseUserLogin response = new ResponseUserLogin();

		Optional<EntityUser> optUser = repositoryUser.findByUsername(request.getUsername());

		if (optUser.isEmpty() || !passwordEncoder.matches(request.getPassword(), optUser.get().getPassword())) {
			response.listMessage.add("Credenciales incorrectas. Verifique su usuario y contraseña.");
			return response;
		}

		EntityUser user = optUser.get();

		String accessToken = jwtUtil.generateAccessToken(user.getId(), user.getUsername(), user.getRole());
		String refreshToken = jwtUtil.generateRefreshToken(user.getId(), user.getUsername(), user.getRole());

		ResponseUserLogin.ItemUser item = new ResponseUserLogin.ItemUser();
		item.setId(user.getId());
		item.setUsername(user.getUsername());
		item.setName(user.getName());
		item.setDocument(user.getDocument());
		item.setPhone(user.getPhone());
		item.setAddress(user.getAddress());
		item.setRole(user.getRole());

		response.setAccess_token(accessToken);
		response.setRefresh_token(refreshToken);
		response.setExpiresIn((int) jwtUtil.getAccessTokenExpirationSeconds());
		response.setUser(item);
		response.success();
		response.listMessage.add("Inicio de sesión correcto.");

		return response;
	}

	public ResponseUserRefresh refresh(RequestUserRefresh request) {
		ResponseUserRefresh response = new ResponseUserRefresh();

		String refreshToken = request.getRefresh_token();

		if (!jwtUtil.isTokenValid(refreshToken) || !jwtUtil.isRefreshToken(refreshToken)) {
			response.listMessage.add("Sesión expirada. Por favor, inicie sesión nuevamente.");
			return response;
		}

		Long userId = jwtUtil.getUserId(refreshToken);
		String username = jwtUtil.getUsername(refreshToken);
		String role = jwtUtil.getRole(refreshToken);

		String newAccessToken = jwtUtil.generateAccessToken(userId, username, role);
		String newRefreshToken = jwtUtil.generateRefreshToken(userId, username, role);

		response.setAccess_token(newAccessToken);
		response.setRefresh_token(newRefreshToken);
		response.setExpiresIn((int) jwtUtil.getAccessTokenExpirationSeconds());
		response.success();
		response.listMessage.add("Token renovado correctamente.");

		return response;
	}

	public ResponseUserInsert insert(RequestUserInsert request) {
		ResponseUserInsert response = new ResponseUserInsert();

		if (repositoryUser.findByUsername(request.getUsername()).isPresent()) {
			response.listMessage.add("Ya existe un usuario registrado con ese correo.");
			return response;
		}

		EntityUser entity = new EntityUser();
		entity.setUsername(request.getUsername());
		entity.setPassword(passwordEncoder.encode(request.getPassword()));
		entity.setName(request.getName());
		entity.setDocument(request.getDocument());
		entity.setPhone(request.getPhone());
		entity.setAddress(request.getAddress());
		entity.setRole("CLIENTE");
		entity.setCreatedAt(new Date());

		repositoryUser.save(entity);

		response.success();
		response.listMessage.add("Usuario registrado correctamente.");

		return response;
	}

	public ResponseUserGetAll getAll() {
		ResponseUserGetAll response = new ResponseUserGetAll();

		for (EntityUser item : repositoryUser.findAll()) {
			ResponseUserGetAll.ItemUser dto = new ResponseUserGetAll.ItemUser();
			dto.id = item.getId();
			dto.username = item.getUsername();
			dto.name = item.getName();
			dto.document = item.getDocument();
			dto.phone = item.getPhone();
			dto.address = item.getAddress();
			dto.role = item.getRole();
			response.listUser.add(dto);
		}

		response.success();
		return response;
	}
}
