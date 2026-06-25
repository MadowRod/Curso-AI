package com.example.cadastro.service;

import com.example.cadastro.dto.VeiculoRequestDTO;
import com.example.cadastro.dto.VeiculoResponseDTO;
import com.example.cadastro.entity.Veiculo;
import com.example.cadastro.exception.ResourceNotFoundException;
import com.example.cadastro.repository.VeiculoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class VeiculoService {

    private final VeiculoRepository veiculoRepository;

    public VeiculoService(VeiculoRepository veiculoRepository) {
        this.veiculoRepository = veiculoRepository;
    }

    @Transactional(readOnly = true)
    public List<VeiculoResponseDTO> listarTodos() {
        return veiculoRepository.findAll().stream()
                .map(VeiculoResponseDTO::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public VeiculoResponseDTO buscarPorId(Long id) {
        return VeiculoResponseDTO.fromEntity(buscarEntidadePorId(id));
    }

    @Transactional(readOnly = true)
    public List<VeiculoResponseDTO> buscar(String termo) {
        if (termo == null || termo.isBlank()) {
            return listarTodos();
        }

        String termoNormalizado = termo.trim();

        try {
            Long id = Long.parseLong(termoNormalizado);
            return veiculoRepository.findById(id)
                    .map(veiculo -> List.of(VeiculoResponseDTO.fromEntity(veiculo)))
                    .orElseGet(() -> buscarPorTexto(termoNormalizado));
        } catch (NumberFormatException ex) {
            return buscarPorTexto(termoNormalizado);
        }
    }

    private List<VeiculoResponseDTO> buscarPorTexto(String termo) {
        return veiculoRepository.findByMarcaContainingIgnoreCaseOrModeloContainingIgnoreCase(termo, termo).stream()
                .map(VeiculoResponseDTO::fromEntity)
                .toList();
    }

    public VeiculoResponseDTO criar(VeiculoRequestDTO request) {
        Veiculo veiculo = toEntity(request);
        return VeiculoResponseDTO.fromEntity(veiculoRepository.save(veiculo));
    }

    public VeiculoResponseDTO atualizar(Long id, VeiculoRequestDTO request) {
        Veiculo existente = buscarEntidadePorId(id);
        existente.setMarca(request.getMarca());
        existente.setModelo(request.getModelo());
        existente.setAno(request.getAno());
        existente.setCor(request.getCor());
        existente.setPreco(request.getPreco());
        existente.setQuilometragem(request.getQuilometragem());
        existente.setCategoria(request.getCategoria());
        return VeiculoResponseDTO.fromEntity(veiculoRepository.save(existente));
    }

    public void excluir(Long id) {
        Veiculo existente = buscarEntidadePorId(id);
        veiculoRepository.delete(existente);
    }

    private Veiculo buscarEntidadePorId(Long id) {
        return veiculoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Veículo não encontrado com id: " + id));
    }

    private Veiculo toEntity(VeiculoRequestDTO request) {
        Veiculo veiculo = new Veiculo();
        veiculo.setMarca(request.getMarca());
        veiculo.setModelo(request.getModelo());
        veiculo.setAno(request.getAno());
        veiculo.setCor(request.getCor());
        veiculo.setPreco(request.getPreco());
        veiculo.setQuilometragem(request.getQuilometragem());
        veiculo.setCategoria(request.getCategoria());
        return veiculo;
    }
}
