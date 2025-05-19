package de.tha_augsburg;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class CafeDataLoader implements CommandLineRunner {

    private CafeRepository cafeRepository;

    public CafeDataLoader(CafeRepository cafeRepository) {
        this.cafeRepository = cafeRepository;
    }

    //Wird einmal automatisch ausgeführt
    @Override
    public void run(String... args) throws Exception {
        ObjectMapper mapper = new ObjectMapper(); //Zur Umwandlung der JSON-Data in Java-Objekte
        InputStream is = getClass().getResourceAsStream("/cafes.json");

        List<Cafe> cafes = Arrays.asList(mapper.readValue(is, Cafe[].class)); //Daten auslesen, umwandeln, in einer Liste speichern
        if (cafeRepository.count() == 0) {
            cafeRepository.saveAll(cafes);
        }
    }
}
