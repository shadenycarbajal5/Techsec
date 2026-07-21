package com.epiis.apitechsec.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.access-token-expiration-ms}")
	private long accessTokenExpirationMs;

	@Value("${jwt.refresh-token-expiration-ms}")
	private long refreshTokenExpirationMs;

	private SecretKey getSigningKey() {
		return Keys.hmacShaKeyFor(secret.getBytes());
	}

	public String generateAccessToken(Long userId, String username, String role) {
		return buildToken(userId, username, role, accessTokenExpirationMs, "access");
	}

	public String generateRefreshToken(Long userId, String username, String role) {
		return buildToken(userId, username, role, refreshTokenExpirationMs, "refresh");
	}

	private String buildToken(Long userId, String username, String role, long expirationMs, String tokenType) {
		Date now = new Date();
		Date expiry = new Date(now.getTime() + expirationMs);

		return Jwts.builder()
				.subject(username)
				.claim("userId", userId)
				.claim("role", role)
				.claim("tokenType", tokenType)
				.issuedAt(now)
				.expiration(expiry)
				.signWith(getSigningKey())
				.compact();
	}

	public Claims extractClaims(String token) {
		return Jwts.parser()
				.verifyWith(getSigningKey())
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}

	public boolean isTokenValid(String token) {
		try {
			extractClaims(token);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public boolean isRefreshToken(String token) {
		try {
			return "refresh".equals(extractClaims(token).get("tokenType", String.class));
		} catch (Exception e) {
			return false;
		}
	}

	public String getUsername(String token) {
		return extractClaims(token).getSubject();
	}

	public Long getUserId(String token) {
		return extractClaims(token).get("userId", Long.class);
	}

	public String getRole(String token) {
		return extractClaims(token).get("role", String.class);
	}

	public long getAccessTokenExpirationSeconds() {
		return accessTokenExpirationMs / 1000;
	}
}
