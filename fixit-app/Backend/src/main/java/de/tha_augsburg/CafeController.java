package de.tha_augsburg;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


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
    public Cafe addCafe(@Valid @RequestBody Cafe cafe) {
        return cafeService.addCafe(cafe);
    }

    //Methode, die getNotApprovedCafes() in CafeService aufruft und diese in einer Liste zurückgibt
    @GetMapping("/notApproved")
    public List<Cafe> getNotApprovedCafes() {
        return cafeService.getNotApprovedCafes();
    }
    
    //Methode, die nur genehmigte Cafes zurückgibt
    @GetMapping("/approved")
    public List<Cafe> getApprovedCafes() {
        return cafeService.getApprovedCafes();
    }    
    
    //Methode zur Genehmigung eines Cafes mit Hilfe von ID
    @PutMapping("/approve/{id}")
    public ResponseEntity<Cafe> approveCafe(@PathVariable Long id) {
        return cafeService.approveCafe(id)
            .map(cafe -> ResponseEntity.ok(cafe)) 
            .orElse(ResponseEntity.notFound().build());
    }

    //PUT-Anfrage im Terminal: curl -X PUT http://localhost:8080/api/cafes/approve/{id}

}