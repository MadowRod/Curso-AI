package com.example.cadastro.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public class VeiculoRequestDTO {

    @NotBlank
    @Size(max = 80)
    private String marca;

    @NotBlank
    @Size(max = 120)
    private String modelo;

    @NotNull
    @Min(1900)
    private Integer ano;

    @NotBlank
    @Size(max = 40)
    private String cor;

    @NotNull
    @Min(0)
    private BigDecimal preco;

    @NotNull
    @Min(0)
    private Integer quilometragem;

    @NotBlank
    @Size(max = 50)
    private String categoria;

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public Integer getQuilometragem() {
        return quilometragem;
    }

    public void setQuilometragem(Integer quilometragem) {
        this.quilometragem = quilometragem;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
}
