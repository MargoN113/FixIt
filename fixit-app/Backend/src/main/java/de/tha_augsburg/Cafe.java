package de.tha_augsburg;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cafe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name, beschreibung, kategorie;
    private Double laengenGradKoord, breitenGradKoord;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    
    public String getBeschreibung() {
        return beschreibung;
    }

    public void setBeschreibung(String beschreibung) {
        this.beschreibung = beschreibung;
    }

    
    public String getKategorie() {
        return kategorie;
    }

    public void setKategorie(String kategorie) {
        this.kategorie = kategorie;
    }

    public Double getLaengenGradKoord() {
        return laengenGradKoord;
    }

    public void setLaengenGradKoord(Double laengenGradKoord) {
        this.laengenGradKoord = laengenGradKoord;
    }

    public Double getBreitenGradKoord() {
        return breitenGradKoord;
    }

    public void setBreitenGradKoord(Double breitenGradKoord) {
        this.breitenGradKoord = breitenGradKoord;
    }
}
