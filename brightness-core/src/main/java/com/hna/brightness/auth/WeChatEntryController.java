package com.hna.brightness.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hna.brightness.http.HttpClient;
import com.hna.brightness.security.WeChatTokenGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@RequestMapping("/wechat")
public class WeChatEntryController {

    @Value("${wechat_client_id}")
    private String clientId;

    @Value("${wechat_client_secret}")
    private String clientSecret;

    @Value("${wechat_mid}")
    private String mid;

    @Value("${wechat_exchage_token_uri}")
    private String exchangeTokenUri;

    @Value("${wechat_auth_url}")
    private String externalAuthUrl;

    @Value("${wechat_domain}")
    private String domain;

    private static final Logger LOGGER = LoggerFactory.getLogger(WeChatEntryController.class);

    @Autowired
    private WeChatTokenGenerator weChatTokenGenerator;

    @RequestMapping(value = "/entry", method = RequestMethod.GET)
    public String generateClientToken() {
        long time = weChatTokenGenerator.getTime();
        String redirectUrl = domain + exchangeTokenUri + "/" + time;
        String clientToken = weChatTokenGenerator.generateToken(time);

        String authorizationUrl = generateEntryUrl(clientId, clientToken, mid, time, redirectUrl);
        LOGGER.info("Start to get authorization via URL: {}", authorizationUrl);
        return "redirect:" + authorizationUrl;
    }

    @RequestMapping(value = "/exchangetoken/{time}", method = RequestMethod.GET)
    public String exchangeToken(@PathVariable("time") long time, @RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException {
        String clientToken = weChatTokenGenerator.generateToken(time);
        String path = externalAuthUrl + "?mid=" + mid + "&client_id=" + clientId + "&client_token=" + clientToken + "&time=" + time + "&code=" + code + "&grant_type=authorization_code&d=0";
        LOGGER.info("Start to get access token via {}", path);
        HttpClient httpClient = new HttpClient(path, "GET");
        String tokenStr = httpClient.get().getMessage();
        ObjectMapper objectMapper = new ObjectMapper();
        WeChatAccessToken weChatAccessToken = objectMapper.readValue(tokenStr, WeChatAccessToken.class);
        String openId = weChatAccessToken.getOpenId();
        saveOpenIdToCookie(response, openId);
        String callbackUrl = domain + "/#/wechat-login";
        LOGGER.info("Start to redirect to url: {}", callbackUrl);
        return "redirect:" + callbackUrl;
    }

    private void saveOpenIdToCookie(HttpServletResponse response, String openId) {
        Cookie cookie = new Cookie("openid", openId);
        cookie.setPath("/");
        cookie.setMaxAge(15 * 24 * 3600);
        response.addCookie(cookie);
    }

    private static String generateEntryUrl(String clientId, String clientToken, String mid, long time, String redirectUrl) {
        return "http://wx.itable.com.cn/api/oauth2/authorize.php?mid=" + mid
                + "&client_id=" + clientId + "&client_token=" + clientToken + "&time=" + time
                + "&redirect_uri=" + redirectUrl + "&response_type=code&scope=snsapi_base&state=BASE#wechat_redirect";
    }
}
