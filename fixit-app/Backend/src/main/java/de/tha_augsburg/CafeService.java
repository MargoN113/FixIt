package de.tha_augsburg;

import java.util.List;
import org.springframework.stereotype.Service;

import java.util.Optional;

//Klasse zur Verwaltung von der Datenbank
@Service
public class CafeService {

    private CafeRepository cafeRepository;

    public CafeService (CafeRepository cafeRepository) {
        this.cafeRepository = cafeRepository;
    }

    //Ein Cafe in die DB hinzufügen und zurückgeben
    public Cafe addCafe(Cafe cafe) {
        return cafeRepository.save(cafe);
    }

    //Nicht genehmigte Cafes zurückgeben
    public List<Cafe> getNotApprovedCafes() {
        return cafeRepository.findByApprovedFalse();
    }

    //Genehmigte Cafes zurückgeben
    public List<Cafe> getApprovedCafes() {
        return cafeRepository.findByApprovedTrue();
    }

    //Ein Cafe genehmigen
    public Optional<Cafe> approveCafe(Long id) {
        Optional<Cafe> cafeOpt = cafeRepository.findById(id);
        cafeOpt.ifPresent(cafe -> {
            cafe.setApproved(true);
            cafeRepository.save(cafe);   
        });
        return cafeOpt;
    }


}
