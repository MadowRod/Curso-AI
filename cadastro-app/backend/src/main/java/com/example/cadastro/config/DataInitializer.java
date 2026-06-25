package com.example.cadastro.config;

import com.example.cadastro.entity.Role;
import com.example.cadastro.entity.Usuario;
import com.example.cadastro.entity.Veiculo;
import com.example.cadastro.repository.UsuarioRepository;
import com.example.cadastro.repository.VeiculoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(
            VeiculoRepository veiculoRepository,
            UsuarioRepository usuarioRepository,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            if (usuarioRepository.count() == 0) {
                Usuario admin = new Usuario();
                admin.setNome("Administrador");
                admin.setEmail("admin@admin.com");
                admin.setSenha(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                usuarioRepository.save(admin);
            }

            if (veiculoRepository.count() > 0) {
                return;
            }

            veiculoRepository.save(criarVeiculo("Toyota", "Corolla", 2022, "Prata", "89900.00", 35000, "Sedan"));
            veiculoRepository.save(criarVeiculo("Honda", "Civic", 2023, "Preto", "125000.00", 15000, "Sedan"));
            veiculoRepository.save(criarVeiculo("Jeep", "Compass", 2021, "Branco", "112500.00", 48000, "SUV"));
            veiculoRepository.save(criarVeiculo("Volkswagen", "Gol", 2020, "Vermelho", "54900.00", 62000, "Hatch"));
            veiculoRepository.save(criarVeiculo("Fiat", "Toro", 2024, "Cinza", "138900.00", 8000, "Pickup"));
        };
    }

    private Veiculo criarVeiculo(String marca, String modelo, int ano, String cor,
                                   String preco, int quilometragem, String categoria) {
        Veiculo veiculo = new Veiculo();
        veiculo.setMarca(marca);
        veiculo.setModelo(modelo);
        veiculo.setAno(ano);
        veiculo.setCor(cor);
        veiculo.setPreco(new BigDecimal(preco));
        veiculo.setQuilometragem(quilometragem);
        veiculo.setCategoria(categoria);
        return veiculo;
    }
}
