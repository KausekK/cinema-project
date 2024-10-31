package com.cinema.spring_boot_cinema.repositories;

import com.cinema.spring_boot_cinema.dto.AdminInfo;
import com.cinema.spring_boot_cinema.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("SELECT new com.cinema.spring_boot_cinema.dto.AdminInfo(u.id, u.firstName, u.lastName, u.email) " +
            "FROM User u WHERE u.role.roleName = 'ADMIN'")
    List<AdminInfo> findAdmins();

    @Query("SELECT u.id ,u.email FROM User u " +
            "WHERE u.email LIKE %:email% AND u.role.roleName NOT LIKE 'ADMIN'")
    List<Object[]> findEmailsByPartialMatch(@Param("email") String email);
}
