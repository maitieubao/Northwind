package com.haibazo.bookreview.dto;

public class AuthorDTO {
    private Long id;
    private String name;
    private Long books; // Book count

    public AuthorDTO() {}

    public AuthorDTO(Long id, String name, Long books) {
        this.id = id;
        this.name = name;
        this.books = books;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Long getBooks() { return books; }
    public void setBooks(Long books) { this.books = books; }
}
