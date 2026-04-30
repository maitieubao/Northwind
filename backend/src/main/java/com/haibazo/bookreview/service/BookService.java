package com.haibazo.bookreview.service;

import com.haibazo.bookreview.dto.BookDTO;
import com.haibazo.bookreview.model.Author;
import com.haibazo.bookreview.model.Book;
import com.haibazo.bookreview.repository.AuthorRepository;
import com.haibazo.bookreview.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;

    @Autowired
    public BookService(BookRepository bookRepository, AuthorRepository authorRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
    }

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream().map(book -> 
            new BookDTO(book.getId(), book.getTitle(), book.getAuthor().getId(), book.getAuthor().getName())
        ).collect(Collectors.toList());
    }

    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        return new BookDTO(book.getId(), book.getTitle(), book.getAuthor().getId(), book.getAuthor().getName());
    }

    public BookDTO createBook(BookDTO bookDTO) {
        Author author = authorRepository.findById(bookDTO.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found"));
        Book book = new Book(null, bookDTO.getTitle(), author);
        Book savedBook = bookRepository.save(book);
        return new BookDTO(savedBook.getId(), savedBook.getTitle(), author.getId(), author.getName());
    }

    public BookDTO updateBook(Long id, BookDTO bookDTO) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
        Author author = authorRepository.findById(bookDTO.getAuthorId())
                .orElseThrow(() -> new RuntimeException("Author not found"));
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(author);
        Book savedBook = bookRepository.save(book);
        return new BookDTO(savedBook.getId(), savedBook.getTitle(), author.getId(), author.getName());
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
