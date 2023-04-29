package com.vti.controller;

import org.springframework.social.connect.Connection;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.social.facebook.api.User;
import org.springframework.social.facebook.connect.FacebookConnectionFactory;
import org.springframework.social.oauth2.AccessGrant;
import org.springframework.social.oauth2.OAuth2Operations;
import org.springframework.social.oauth2.OAuth2Parameters;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class SocialFacebookController {
	private FacebookConnectionFactory factory = new FacebookConnectionFactory("939277063774570","90a53051630fa926d9d7a5d58bd683a6");

	
	@GetMapping(value = "/auth/facebook")
	public String loginFacebook() {

		OAuth2Operations operations = factory.getOAuthOperations();
		OAuth2Parameters params = new OAuth2Parameters();
		
		params.setRedirectUri("http://localhost:8080/callback");
		params.setScope("email,public_profile");

		String authenticate = operations.buildAuthenticateUrl(params);
		return "Redirect Url:" + authenticate;
	}
	
	@GetMapping(value = "/callback")
	public User callbackLogin(@RequestParam("code") String authorizationCode) {
		
		OAuth2Operations operations = factory.getOAuthOperations();
		
		// get access token
		AccessGrant accessToken = operations.exchangeForAccess(authorizationCode, "http://localhost:8080/callback",null);

		Connection<Facebook> connection = factory.createConnection(accessToken);
		Facebook facebook = connection.getApi();
		
		String[] fields = { "id", "email", "first_name", "last_name" };
		User userProfile = facebook.fetchObject("me", User.class, fields);
		return userProfile;
	}
}

