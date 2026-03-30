package com.musacreativa.musacreativa.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

// Separamos el PasswordEncoder en su propia clase de configuración.
//
// ¿Por qué? Porque si lo dejamos en SecurityConfig, Spring entra en un ciclo:
//   AuthService necesita PasswordEncoder
//   → PasswordEncoder está en SecurityConfig
//   → SecurityConfig necesita JwtFilter
//   → JwtFilter necesita UsuarioRepository
//   → todo esto ocurre mientras Spring todavía está inicializando SecurityConfig
//
// Al ponerlo en una clase independiente, Spring lo crea primero sin conflictos
// y luego lo inyecta tranquilamente en AuthService y donde más se necesite.
@Configuration
public class PasswordEncoderConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // BCrypt aplica hashing con sal aleatoria — estándar de la industria para contraseñas.
        // El número entre paréntesis es la "fuerza" (por defecto 10).
        // A mayor número, más seguro pero más lento al hacer login.
        return new BCryptPasswordEncoder();
    }
}