package net.codejava.sprint_boot_cadastrar_usuario.dto;

public class LoginResponse {

    private String mensagem;

    public LoginResponse(String mensagem) {
        this.mensagem = mensagem;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
}
