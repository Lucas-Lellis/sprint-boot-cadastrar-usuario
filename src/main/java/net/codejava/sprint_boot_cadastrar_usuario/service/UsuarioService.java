package net.codejava.sprint_boot_cadastrar_usuario.service;

import net.codejava.sprint_boot_cadastrar_usuario.dto.LoginDTO;
import net.codejava.sprint_boot_cadastrar_usuario.dto.UsuarioDTO;
import net.codejava.sprint_boot_cadastrar_usuario.exception.ResourceNotFoundException;
import net.codejava.sprint_boot_cadastrar_usuario.model.UsuarioModel;
import net.codejava.sprint_boot_cadastrar_usuario.repository.UsuarioRepository;
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

    public UsuarioDTO CadastrarUsuario(UsuarioDTO usuarioDTO) {
        if (usuarioRepository.existsByEmail(usuarioDTO.getEmail())) {
            throw new IllegalArgumentException("Este email já está cadastrado.");
        }
        UsuarioModel usuario = new UsuarioModel();
        usuario.setNome(usuarioDTO.getNome());
        usuario.setEmail(usuarioDTO.getEmail());
        usuario.setSenha(passwordEncoder.encode(usuarioDTO.getSenha()));

        UsuarioModel usuarioCadastrado = usuarioRepository.save(usuario);
        return new UsuarioDTO(usuarioCadastrado.getId(), usuarioCadastrado.getNome(), usuarioCadastrado.getEmail()
                , usuarioCadastrado.getSenha());
    }

    public List<UsuarioDTO> buscarTodosUsuarios() {
        List<UsuarioModel> usuarios = usuarioRepository.findAll();
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
        UsuarioModel usuarioExistente = usuarioRepository.findById(id)
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

        UsuarioModel usuarioAtualizado = usuarioRepository.save(usuarioExistente);
        return new UsuarioDTO(usuarioAtualizado.getId(), usuarioAtualizado.getNome(), usuarioAtualizado.getEmail()
                , usuarioAtualizado.getSenha());
    }

    public UsuarioDTO loginUsuario(LoginDTO loginDTO) {
        Optional<UsuarioModel> usuarioModelOptional = usuarioRepository.findByEmail(loginDTO.getEmail());

        if (usuarioModelOptional.isEmpty()) {
            throw new IllegalArgumentException("Email ou senha inválidos.");
        }
        UsuarioModel usuarioLogin = usuarioModelOptional.get();
        if (!passwordEncoder.matches(loginDTO.getSenha(), usuarioLogin.getSenha())) {
            throw new IllegalArgumentException("Email ou senha inválidos.");
        }
        return new UsuarioDTO(usuarioLogin.getId(), usuarioLogin.getNome(), usuarioLogin.getEmail()
                , usuarioLogin.getSenha());
    }

}
