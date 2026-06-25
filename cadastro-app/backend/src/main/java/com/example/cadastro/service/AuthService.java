package com.example.cadastro.service;

import com.example.cadastro.dto.AuthResponseDTO;
import com.example.cadastro.dto.LoginRequestDTO;
import com.example.cadastro.dto.RegisterRequestDTO;
import com.example.cadastro.entity.Role;
import com.example.cadastro.entity.Usuario;
import com.example.cadastro.exception.BusinessException;
import com.example.cadastro.repository.UsuarioRepository;
import com.example.cadastro.security.JwtService;
import com.example.cadastro.security.UsuarioDetailsService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UsuarioDetailsService usuarioDetailsService;

    public AuthService(
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager,
            UsuarioDetailsService usuarioDetailsService
    ) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.usuarioDetailsService = usuarioDetailsService;
    }

    public AuthResponseDTO registrar(RegisterRequestDTO request) {
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("E-mail já cadastrado.");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        usuario.setRole(Role.USER);
        usuarioRepository.save(usuario);

        UserDetails userDetails = usuarioDetailsService.loadUserByUsername(usuario.getEmail());
        String token = jwtService.generateToken(userDetails);

        return new AuthResponseDTO(token, usuario.getNome(), usuario.getEmail());
    }

    public AuthResponseDTO login(LoginRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getSenha())
        );

        UserDetails userDetails = usuarioDetailsService.loadUserByUsername(request.getEmail());
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException("Usuário não encontrado."));

        String token = jwtService.generateToken(userDetails);
        return new AuthResponseDTO(token, usuario.getNome(), usuario.getEmail());
    }
}
