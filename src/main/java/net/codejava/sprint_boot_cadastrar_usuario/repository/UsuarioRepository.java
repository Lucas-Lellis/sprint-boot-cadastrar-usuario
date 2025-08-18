package net.codejava.sprint_boot_cadastrar_usuario.repository;

import net.codejava.sprint_boot_cadastrar_usuario.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
