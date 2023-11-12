package api.zenith;

import api.zenith.configs.AppConfig;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App
{
    public static void main( String[] args )
    {
        new AnnotationConfigApplicationContext(AppConfig.class);
    }
}
