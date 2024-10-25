package com.cinema.spring_boot_cinema.repositories;

import com.cinema.spring_boot_cinema.entity.UpcomingMovies;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "upcomingMovies", path = "upcoming-movies")
public interface UpcomingMoviesRepository extends JpaRepository<UpcomingMovies, Long> {

    Page<UpcomingMovies> findAll(Pageable pageable);
}
