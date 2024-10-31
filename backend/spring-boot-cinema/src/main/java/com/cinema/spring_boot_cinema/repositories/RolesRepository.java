package com.cinema.spring_boot_cinema.repositories;

import com.cinema.spring_boot_cinema.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolesRepository extends JpaRepository<Roles, Long> {
    Roles findByRoleName(String roleName);

}
