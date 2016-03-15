package com.crell.core.dto;

import java.util.Map;
/**
 * 请求入参封装对象
 *
 * @Author crell
 * @Date 2015/12/7 10:57
 */
public class ParamsBody{

	private String token;//token令牌
	
	private Integer random;//随机数

	private Page page;//分页对象

	private Map<String,Object> body;//参数

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Integer getRandom() {
		return random;
	}

	public void setRandom(Integer random) {
		this.random = random;
	}

	public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}

	public Map<String, Object> getBody() {
		return body;
	}

	public void setBody(Map<String, Object> body) {
		this.body = body;
	}
}