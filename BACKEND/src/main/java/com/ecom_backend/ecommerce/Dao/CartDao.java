package com.youtube.ecommerce.Dao;

import com.youtube.ecommerce.Entity.Cart;
import com.youtube.ecommerce.Entity.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.criteria.CriteriaBuilder;
import javax.sql.rowset.CachedRowSet;
import java.util.List;

@Repository
public interface CartDao extends CrudRepository<Cart, Integer> {
    @Query("SELECT c FROM Cart c WHERE c.user = :user")
    List<Cart> findByUser(@Param("user") User user);
}

