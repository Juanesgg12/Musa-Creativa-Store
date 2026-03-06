package com.musacreativa.musacreativa.repository;

import com.musacreativa.musacreativa.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
}
