package de.tha_augsburg;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


//Controller kriegt Anfragen von Client und schickt die Antwort zurück
@CrossOrigin(origins = "http://localhost:3000") //Anfragen von einer anderen Domäne (React Server) erlauben
@RequestMapping("/api/cafes") //Abfragen von Front End entgegennehmen
@RestController
public class CafeController {

    private CafeService cafeService;

    public CafeController(CafeService cafeService) {
        this.cafeService = cafeService;
    }

    //Methode, die addCafe() in CafeService aufruft und dieses zurückgibt
    @PostMapping("/register")
    public Cafe addCafe(@RequestBody Cafe cafe) {
        return cafeService.addCafe(cafe);
    }

    //Methode, die gettAllCafes() in CafeService aufruft und diese in einer Liste zurückgibt
    @GetMapping("/all")
    public List<Cafe> getAllCafes() {
        return cafeService.getAllCafes();
    }
    
    //Methode, die nur genehmigte Cafes zurückgibt
    @GetMapping("/approved")
    public List<Cafe> getApprovedCafes() {
        return cafeService.getApprovedCafes();
    }    
    
    
}