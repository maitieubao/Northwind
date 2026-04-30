package com.haibazo.bookreview.dto;

public class BookDTO {
    private Long id;
    private String title;
    private Long authorId;
    private String authorName;

    public BookDTO() {}

    public BookDTO(Long id, String title, Long authorId, String authorName) {
        this.id = id;
        this.title = title;
        this.authorId = authorId;
        this.authorName = authorName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Long getAuthorId() { return authorId; }
    public void setAuthorId(Long authorId) { this.authorId = authorId; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
}
