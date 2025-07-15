package com.youtube.ecommerce.Dao;

import com.youtube.ecommerce.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


@Repository
public interface ProductDao extends CrudRepository<Product,Integer>{
    List<Product> findAll(Pageable pageable);
List<Product> findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(
            String key1,String key2,Pageable pageable
    );
}
//@Repository
//public interface ProductDao extends CrudRepository<Product, Integer> {
//
//
//}
