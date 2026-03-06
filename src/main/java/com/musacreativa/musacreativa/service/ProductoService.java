package com.musacreativa.musacreativa.service;

import org.springframework.stereotype.Service;

import java.util.Optional;

import com.musacreativa.musacreativa.repository.ProductoRepository;
import com.musacreativa.musacreativa.model.Producto;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoService(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    public Optional<Producto> obtenerPorId(Long id) {
        return productoRepository.findById(id);
    }
}
