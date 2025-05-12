package de.tha_augsburg;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cafe {

    //Eigenschaften von Cafe. description und Link zu Webseite müssen nicht zwindgend angegeben werden

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description, webseiteLink;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private String mailadress;

    @Column(nullable = false)
    private boolean approved = false;

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

    public String getdescription() {
        return description;
    }

    public void setdescription(String description) {
        this.description = description;
    }

    public String getcategory() {
        return category;
    }

    public void setcategory(String category) {
        this.category = category;
    }

    public Double getlongitude() {
        return longitude;
    }

    public void setlongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getlatitude() {
        return latitude;
    }

    public void setlatitude(Double latitude) {
        this.latitude = latitude;
    }

    public String getMailadress() {
        return mailadress;
    }

    public void setMailadress(String mailadress) {
        this.mailadress = mailadress;
    }

    public String getWebseiteLink() {
        return webseiteLink;
    }

    public void setWebseiteLink(String webseiteLink) {
        this.webseiteLink = webseiteLink;
    }
}
