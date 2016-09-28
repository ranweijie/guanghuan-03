package com.hna.brightness.entity;

import java.awt.image.BufferedImage;

public class ValidationCode {
    private BufferedImage bufferedImage;
    private String code;

    public BufferedImage getBufferedImage() {
        return bufferedImage;
    }

    public void setBufferedImage(BufferedImage bufferedImage) {
        this.bufferedImage = bufferedImage;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
