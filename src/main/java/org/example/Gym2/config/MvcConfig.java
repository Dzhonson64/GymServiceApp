package org.example.Gym2.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class MvcConfig implements WebMvcConfigurer {



    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/");

        registry.addResourceHandler("/fonts/**")
                .addResourceLocations("classpath:/fonts/");

        registry.addResourceHandler("/scripts/**")
                .addResourceLocations("classpath:/scripts/");

        registry.addResourceHandler("/img/**")
                .addResourceLocations("classpath:/img/");

        registry.addResourceHandler("/uploads/profile/**")
                .addResourceLocations("file:/" + uploadPath + "/");

    }


    @Value("${upload.path}")
    private String uploadPath;
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("login");
        registry.addViewController("/").setViewName("greeting");
    }
}
