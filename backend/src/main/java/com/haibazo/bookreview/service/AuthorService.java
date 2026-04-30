package com.haibazo.bookreview.service;

import com.haibazo.bookreview.dto.AuthorDTO;
import com.haibazo.bookreview.model.Author;
import com.haibazo.bookreview.repository.AuthorRepository;
import com.haibazo.bookreview.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthorService {
    private final AuthorRepository authorRepository;
    private final BookRepository bookRepository;

    @Autowired
    public AuthorService(AuthorRepository authorRepository, BookRepository bookRepository) {
        this.authorRepository = authorRepository;
        this.bookRepository = bookRepository;
    }

    public List<AuthorDTO> getAllAuthors() {
        return authorRepository.findAll().stream().map(author -> {
            long bookCount = bookRepository.countByAuthorId(author.getId());
            return new AuthorDTO(author.getId(), author.getName(), bookCount);
        }).collect(Collectors.toList());
    }

    public AuthorDTO getAuthorById(Long id) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Author not found"));
        long bookCount = bookRepository.countByAuthorId(author.getId());
        return new AuthorDTO(author.getId(), author.getName(), bookCount);
    }

    public AuthorDTO createAuthor(AuthorDTO authorDTO) {
        Author author = new Author(null, authorDTO.getName());
        Author savedAuthor = authorRepository.save(author);
        return new AuthorDTO(savedAuthor.getId(), savedAuthor.getName(), 0L);
    }

    public AuthorDTO updateAuthor(Long id, AuthorDTO authorDTO) {
        Author author = authorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Author not found"));
        author.setName(authorDTO.getName());
        Author savedAuthor = authorRepository.save(author);
        long bookCount = bookRepository.countByAuthorId(savedAuthor.getId());
        return new AuthorDTO(savedAuthor.getId(), savedAuthor.getName(), bookCount);
    }

    public void deleteAuthor(Long id) {
        authorRepository.deleteById(id);
    }
}
