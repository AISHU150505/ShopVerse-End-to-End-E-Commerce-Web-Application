package com.youtube.ecommerce.Service;

import com.youtube.ecommerce.Dao.RoleDao;
import com.youtube.ecommerce.Entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;

    public Role createNewRole(Role role) {

        return roleDao.save(role);
    }
}