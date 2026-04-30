package com.haibazo.bookreview.dto;

public class ReviewDTO {
    private Long id;
    private String content; 
    private Integer rating;
    private Long bookId;
    private String bookTitle;
    private String authorName;

    public ReviewDTO() {}

    public ReviewDTO(Long id, String content, Integer rating, Long bookId, String bookTitle, String authorName) {
        this.id = id;
        this.content = content;
        this.rating = rating;
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.authorName = authorName;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public Long getBookId() { return bookId; }
    public void setBookId(Long bookId) { this.bookId = bookId; }
    public String getBookTitle() { return bookTitle; }
    public void setBookTitle(String bookTitle) { this.bookTitle = bookTitle; }
    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }
}
