package de.tha_augsburg;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Cafe {
    //Eigenschaften von Cafe
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;
    
    @Column(nullable = true)
    private String webseiteLink;
    
    @Column(nullable = false)
    @JsonProperty("type")
    private String category;

    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private boolean approved = false;

    public Cafe() {}

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
    
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebseiteLink() {
        return webseiteLink;
    }

    public void setWebseiteLink(String webseiteLink) {
        this.webseiteLink = webseiteLink;
    }

    public boolean isApproved() {
    return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }
}
