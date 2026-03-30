package com.musacreativa.musacreativa.service;

import com.musacreativa.musacreativa.model.Usuario;
import com.musacreativa.musacreativa.model.Usuario.Rol;
import com.musacreativa.musacreativa.repository.UsuarioRepository;
import com.musacreativa.musacreativa.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(JwtService jwtService, UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public record RegisterRequest(String nombre, String email, String password) {}

    public record LoginRequest(String email, String password) {}

    public record AuthResponse(String token,String nombre, String rol) {}


    public AuthResponse registrar(RegisterRequest request) {
        if (usuarioRepository.existsByEmail(request.email())){
            throw new IllegalArgumentException("Ya existe una cuenta con ese email");
        }

        Usuario usuario = new Usuario(
                request.email(),
                passwordEncoder.encode(request.password()),
                request.nombre(),
                Rol.ROLE_USER
        );
        usuarioRepository.save(usuario);

        String token = jwtService.generarToken(usuario.getEmail());
        return new AuthResponse(token,usuario.getNombre(),usuario.getRol().name());
    }

    public AuthResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByEmail(request.email())
                .orElseThrow(() -> new IllegalArgumentException("Credenciales inválidas"));

        if (!passwordEncoder.matches(request.password(), usuario.getPassword())){
            throw new IllegalArgumentException("Credenciales inválidas");
        }

        String token = jwtService.generarToken(usuario.getEmail());
        return new AuthResponse(token,usuario.getNombre(),usuario.getRol().name());
    }
}
