package de.tha_augsburg;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CafeRepository extends JpaRepository<Cafe, Long> {

    //Methode zur Suche aller Cafes, die approved wurden
    public List<Cafe> findByApprovedTrue();

    //Methode zur Suche aller Cafes, die nicht approved wurden
    public List<Cafe> findByApprovedFalse();

}
