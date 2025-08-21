package net.codejava.sprint_boot_cadastrar_usuario.service;

import net.codejava.sprint_boot_cadastrar_usuario.dto.UsuarioDTO;
import net.codejava.sprint_boot_cadastrar_usuario.exception.ResourceNotFoundException;
import net.codejava.sprint_boot_cadastrar_usuario.model.Usuario;
import net.codejava.sprint_boot_cadastrar_usuario.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UsuarioDTO inserirUsuario(UsuarioDTO usuarioDTO) {
        Usuario usuario = new Usuario();
        usuario.setNome(usuarioDTO.getNome());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setSenha(passwordEncoder.encode(usuarioDTO.getSenha()));

        Usuario usuarioInserido = usuarioRepository.save(usuario);
        return new UsuarioDTO(usuarioInserido.getId(), usuarioInserido.getNome(), usuarioInserido.getEmail()
                , usuarioInserido.getSenha());
    }

    public List<UsuarioDTO> buscarTodosUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarios.stream()
                .map(usuario -> new UsuarioDTO(usuario.getId(), usuario.getNome(), usuario.getEmail()
                        , usuario.getSenha()))
                .collect(Collectors.toList());
    }

    public Optional<UsuarioDTO> buscarUsuarioId(Long id) {
        return usuarioRepository.findById(id)
                .map(usuario -> new UsuarioDTO(usuario.getId(), usuario.getNome(), usuario.getEmail()
                        , usuario.getSenha()));
    }

    public void deletarUsuario(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw  new ResourceNotFoundException("Usuario com o ID " + id + " não encontrado");
        }
        usuarioRepository.deleteById(id);
    }

    public UsuarioDTO atualizarUsuario(Long id, UsuarioDTO usuarioDTO) {
        Usuario usuarioExistente = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario com o ID " + id + " não encontrado"));

        if (usuarioDTO.getNome() != null) {
            usuarioExistente.setNome(usuarioDTO.getNome());
        }
        if (usuarioDTO.getEmail() != null) {
            usuarioExistente.setEmail(usuarioDTO.getEmail());
        }
        if (usuarioDTO.getSenha() != null && !usuarioDTO.getSenha().isEmpty()) {
            usuarioExistente.setSenha(passwordEncoder.encode(usuarioDTO.getSenha()));
        }

        Usuario usuarioAtualizado = usuarioRepository.save(usuarioExistente);
        return new UsuarioDTO(usuarioAtualizado.getId(), usuarioAtualizado.getNome(), usuarioAtualizado.getEmail()
                , usuarioAtualizado.getSenha());
    }

}
