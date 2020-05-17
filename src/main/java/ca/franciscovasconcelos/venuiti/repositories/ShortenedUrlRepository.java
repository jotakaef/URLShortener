package ca.franciscovasconcelos.venuiti.repositories;

import ca.franciscovasconcelos.venuiti.model.ShortenedUrlBean;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShortenedUrlRepository extends CrudRepository<ShortenedUrlBean, Long>, JpaSpecificationExecutor<ShortenedUrlBean> {
    // Used to get a new number to seed the Hash. In real world would be better to use a specific sequence though.
    @Query(value = "Select last_value from fvenuiti.shortened_urls_id_seq", nativeQuery = true)
    Integer currentShortnedUrlId();

    // It is needed because I'm using the sequence to seed the id_hash and when it is not initiate yet it will return 1 two times.
    @Query(value = "Select nextval('fvenuiti.shortened_urls_id_seq')", nativeQuery = true)
    Integer initShortnedUrlIdSequence();

    Optional<ShortenedUrlBean> findByIdHash(Integer idHash);

    List<ShortenedUrlBean> findByOwnerUserOrderByIdDesc(String ownerUser);
}
