package net.codejava.sprint_boot_cadastrar_usuario.dto;

import java.io.Serializable;

public class LoginDTO implements Serializable {

    private String email;
    private String senha;

    public LoginDTO() {
    }

    public LoginDTO(String senha, String email) {
        this.senha = senha;
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
