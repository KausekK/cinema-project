package com.cinema.spring_boot_cinema.service;

import com.cinema.spring_boot_cinema.entity.Shows;
import com.cinema.spring_boot_cinema.repositories.ShowsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ShowService {

    @Autowired
    private ShowsRepository showsRepository;

    public boolean isPossibleToAddShow(Long hallId, String showTimeString, int movieDuration) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime newShowStart = LocalDateTime.parse(showTimeString, formatter);
        LocalDateTime newShowEnd = newShowStart.plusMinutes(movieDuration + 60);

        List<Shows> showsInHall = showsRepository.findByHallId(hallId);

        for (Shows show : showsInHall) {
            LocalDateTime startExistingShow = LocalDateTime.parse(show.getShowTime(), formatter);
            LocalDateTime endExistingShow = startExistingShow.plusMinutes(show.getMovie().getDuration() + 60);

            if (doTheShowsConflictWithEachOther(newShowStart, newShowEnd, startExistingShow, endExistingShow)) {
                return false;
            }
        }
        return true;
    }

    private boolean doTheShowsConflictWithEachOther(LocalDateTime start1, LocalDateTime end1, LocalDateTime start2, LocalDateTime end2) {
        return (start1.isBefore(end2) && end1.isAfter(start2));
    }

}


