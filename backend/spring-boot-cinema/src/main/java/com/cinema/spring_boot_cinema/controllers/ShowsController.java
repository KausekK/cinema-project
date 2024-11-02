package com.cinema.spring_boot_cinema.controllers;

import com.cinema.spring_boot_cinema.dto.AddShow;
import com.cinema.spring_boot_cinema.entity.City;
import com.cinema.spring_boot_cinema.entity.Hall;
import com.cinema.spring_boot_cinema.entity.Movie;
import com.cinema.spring_boot_cinema.repositories.CityRepository;
import com.cinema.spring_boot_cinema.repositories.HallRepository;
import com.cinema.spring_boot_cinema.repositories.MovieRepository;
import com.cinema.spring_boot_cinema.repositories.ShowsRepository;
import com.cinema.spring_boot_cinema.entity.Shows;
import com.cinema.spring_boot_cinema.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/shows")
public class ShowsController {

    @Autowired
    private ShowsRepository showsRepository;

    @Autowired
    private ShowService showService;

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private HallRepository hallRepository;

    @GetMapping()
    public List<Shows> getShowsByCityAndDayOfWeek(@RequestParam("cityName") String cityName,
                                                  @RequestParam("dayOfWeek") String dayOfWeek) {
        return showsRepository.findAllShowsByCityAndDayOfWeek(cityName, dayOfWeek);
    }

    @GetMapping("/date")
    public List<Shows> getShowsByCityTitleAndDate(@RequestParam("cityName") String cityName,
                                                  @RequestParam("title") String title,
                                                  @RequestParam("showDate") String showDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(showDate, formatter);
        return showsRepository.findShowsByCityTitleAndDate(cityName, title, date);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteShowById(@PathVariable Long id) {
        showsRepository.deleteById(id);
    }

    @PostMapping("/addShow")
    public ResponseEntity<String> addShow(@RequestBody AddShow addShowDTO) {

        if (addShowDTO.getMovieId() == null || addShowDTO.getHallId() == null ||
                addShowDTO.getCityId() == null || addShowDTO.getShowTime() == null ||
                addShowDTO.getDayOfWeek() == null || addShowDTO.getDuration() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        Shows show = new Shows();
        show.setShowTime(addShowDTO.getShowTime());

        Movie movie = movieRepository.findById(addShowDTO.getMovieId())
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono filmu o podanym ID"));
        show.setMovie(movie);

        City city = cityRepository.findById(addShowDTO.getCityId())
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono miasta o podanym ID"));
        show.setCity(city);

        Hall hall = hallRepository.findById(addShowDTO.getHallId())
                .orElseThrow(() -> new IllegalArgumentException("Nie znaleziono sali o podanym ID"));
        show.setHall(hall);

        show.setDayOfWeek(addShowDTO.getDayOfWeek());

        Integer duration = addShowDTO.getDuration();
        if (duration == null || duration <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        boolean canAdd = showService.isPossibleToAddShow(show.getHall().getId(), show.getShowTime(), duration);

        if (!canAdd) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        showsRepository.save(show);

        return ResponseEntity.ok().build();
    }


}

