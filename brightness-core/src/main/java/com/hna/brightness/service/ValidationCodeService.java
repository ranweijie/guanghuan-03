package com.hna.brightness.service;

import com.hna.brightness.entity.ValidationCode;
import com.hna.brightness.exception.ValidationCodeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
public class ValidationCodeService {
//    private static final Logger LOGGER = LoggerFactory.getLogger(ValidationCodeService.class);

    private static final int WIDTH = 120;
    private static final int HEIGHT = 40;
    private static final int CODE_COUNT = 4;
    private static final int LINE_COUNT = 80;

    private static final char[] CODE_SEQUENCE = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};

    @Value("${validation_code_expires_min:5}")
    private int validationCodeExpireInMin;

    @Value("${checkValidationCode:true}")
    private boolean checkValidationCode;

    @Autowired
    private RedisTemplate<String, String> validationCodeTemplate;


    public ValidationCode create() {
        int x, fontHeight, codeY, red, green, blue;
        ValidationCode validationCode = new ValidationCode();

        x = WIDTH / (CODE_COUNT + 2);//每个字符的宽度
        fontHeight = HEIGHT - 2;//字体的高度
        codeY = HEIGHT - 4;

        BufferedImage buffImg = new BufferedImage(WIDTH, HEIGHT, BufferedImage.TYPE_INT_RGB);
        Graphics2D graphics = buffImg.createGraphics();
        Random random = new Random();

        // 将图像填充为白色
        graphics.setColor(Color.WHITE);
        graphics.fillRect(0, 0, WIDTH, HEIGHT);

        // 创建字体
        graphics.setFont(new Font("Times New Roman", Font.PLAIN, fontHeight));

        for (int i = 0; i < LINE_COUNT; i++) {
            int xs = random.nextInt(WIDTH);
            int ys = random.nextInt(HEIGHT);
            int xe = xs + random.nextInt(WIDTH / 8);
            int ye = ys + random.nextInt(HEIGHT / 8);
            red = random.nextInt(255);
            green = random.nextInt(255);
            blue = random.nextInt(255);
            graphics.setColor(new Color(red, green, blue));
            graphics.drawLine(xs, ys, xe, ye);
        }

        // randomCode记录随机产生的验证码
        StringBuffer randomCode = new StringBuffer();
        for (int i = 0; i < CODE_COUNT; i++) {
            String strRand = String.valueOf(CODE_SEQUENCE[random.nextInt(CODE_SEQUENCE.length)]);
            red = random.nextInt(255);
            green = random.nextInt(255);
            blue = random.nextInt(255);
            graphics.setColor(new Color(red, green, blue));
            graphics.drawString(strRand, (i + 1) * x, codeY);
            randomCode.append(strRand);
        }

        validationCode.setCode(randomCode.toString());
        validationCode.setBufferedImage(buffImg);

        return validationCode;
    }

    public String createValidationCodeToken(String code) {
        ValueOperations<String, String> validationCodeOps = this.validationCodeTemplate.opsForValue();
        String token = String.valueOf(UUID.randomUUID());
        validationCodeOps.set(token, code, validationCodeExpireInMin, TimeUnit.MINUTES);
        return token;
    }

    public void validate(String token, String code) throws ValidationCodeException {
        if (!checkValidationCode) {
            return;
        }
        if (StringUtils.isEmpty(token)) {
            throw new ValidationCodeException("invalid_validationCode");
        }

        String existCode = getCode(token);
        if (StringUtils.isEmpty(code) || !code.equals(existCode)) {
            throw new ValidationCodeException("invalid_validationCode");
        }
    }

    public String getCode(String token) {
        ValueOperations<String, String> validationCodeOps = this.validationCodeTemplate.opsForValue();
        return validationCodeOps.get(token);
    }
}
