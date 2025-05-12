package de.tha_augsburg;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

//Controller kriegt Anfragen von Client und schickt die Antwort zurück
@RestController
public class CafeController {

    private CafeService cafeService;

    public CafeController(CafeService cafeService) {
        this.cafeService = cafeService;
    }

    //Methode, die addCafe() in CafeService aufruft und dieses zurückgibt
    @PostMapping
    public Cafe addCafe(@RequestBody Cafe cafe) {
        return cafeService.addCafe(cafe);
    }

    //Methode, die gettAllCafes() in CafeService aufruft und diese in einer Liste zurückgibt
    @GetMapping
    public List<Cafe> getAllCafes() {
        return cafeService.getAllCafes();
    }

    @GetMapping
    public List<Cafe> getApprovedCafes() {
        return cafeService.getApprovedCafes();
    }
}
