package de.tha_augsburg;

import java.util.List;
import org.springframework.stereotype.Service;

//Klasse zur Verwaltung von der Datenbank
@Service
public class CafeService {

    private CafeRepository cafeRepository;

    public CafeService(CafeRepository cafeRepository) {
        this.cafeRepository = cafeRepository;
    }

    //Ein Cafe in die DB hinzufügen und zurückgeben
    public Cafe addCafe(Cafe cafe) {
        return cafeRepository.save(cafe);
    }

    //Alle Cafes zurückgeben
    public List<Cafe> getAllCafes() {
        return cafeRepository.findAll();
    }

    //Nur genehmigte Cafes zurückgeben
    public List<Cafe> getApprovedCafes() {
        return cafeRepository.findByApprovedTrue();
    }
}
