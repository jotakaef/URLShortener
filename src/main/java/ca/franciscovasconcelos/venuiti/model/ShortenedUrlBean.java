package ca.franciscovasconcelos.venuiti.model;

import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "shortened_urls", schema = "fvenuiti", catalog = "FvenuitiUrl")
@Data
public class ShortenedUrlBean {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "id_hash", unique = true, nullable = false)
    private Integer idHash;
    @Column(name = "owner_user", nullable = false)
    private String ownerUser;
    @Column(name = "date_creation", nullable = false)
    private Timestamp dateCreation;
    @Column(name = "original_url", nullable = false)
    private String originalUrl;
    @Column(name = "shortened_url", nullable = false)
    private String shortenedUrl;
    @Column(name = "is_private", nullable = false)
    private Boolean isPrivate;
    @Column(name = "date_valid", nullable = false)
    private Timestamp dateValid;

}
