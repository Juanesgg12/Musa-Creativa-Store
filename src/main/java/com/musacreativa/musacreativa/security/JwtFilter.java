package com.musacreativa.musacreativa.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.musacreativa.musacreativa.model.Usuario;
import com.musacreativa.musacreativa.repository.UsuarioRepository;

import java.io.IOException;
import java.util.List;
@Component
public class JwtFilter  extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    public JwtFilter(JwtService jwtService, UsuarioRepository usuarioRepository) {
        this.jwtService = jwtService;
        this.usuarioRepository = usuarioRepository;
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null || !authHeader.startsWith("Bearer ")) {
            chain.doFilter(request,response);
            return;
    }

    String token = authHeader.substring(7);
    if (!jwtService.esTokenValido(token)) {
        chain.doFilter(request,response);
        return;
    }

    String email = jwtService.extraerEmail(token);
    Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);
    if (usuario == null) {
        chain.doFilter(request,response);
        return;
    }

    UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(usuario.getEmail(),null, List.of(new SimpleGrantedAuthority(usuario.getRol().name())));

   auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

   SecurityContextHolder.getContext().setAuthentication(auth);

   chain.doFilter(request,response);
    }
}
