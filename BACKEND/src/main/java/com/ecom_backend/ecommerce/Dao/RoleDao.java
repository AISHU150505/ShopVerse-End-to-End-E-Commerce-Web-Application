package com.youtube.ecommerce.Dao;

import com.youtube.ecommerce.Entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleDao extends CrudRepository<Role, String> {

    Optional<Role> findByRoleName(String roleName); // Correct return type
}
