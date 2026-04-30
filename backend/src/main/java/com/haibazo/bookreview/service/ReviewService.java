package com.haibazo.bookreview.service;

import com.haibazo.bookreview.dto.ReviewDTO;
import com.haibazo.bookreview.model.Book;
import com.haibazo.bookreview.model.Review;
import com.haibazo.bookreview.repository.BookRepository;
import com.haibazo.bookreview.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final BookRepository bookRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, BookRepository bookRepository) {
        this.reviewRepository = reviewRepository;
        this.bookRepository = bookRepository;
    }

    public List<ReviewDTO> getAllReviews() {
        return reviewRepository.findAll().stream().map(review -> 
            new ReviewDTO(review.getId(), review.getContent(), review.getRating(),
                review.getBook().getId(), review.getBook().getTitle(), 
                review.getBook().getAuthor().getName())
        ).collect(Collectors.toList());
    }

    public ReviewDTO getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        return new ReviewDTO(review.getId(), review.getContent(), review.getRating(),
            review.getBook().getId(), review.getBook().getTitle(), 
            review.getBook().getAuthor().getName());
    }

    public ReviewDTO createReview(ReviewDTO reviewDTO) {
        Book book = bookRepository.findById(reviewDTO.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));
        Review review = new Review(null, reviewDTO.getContent(), reviewDTO.getRating(), book);
        Review savedReview = reviewRepository.save(review);
        return new ReviewDTO(savedReview.getId(), savedReview.getContent(), savedReview.getRating(),
            book.getId(), book.getTitle(), book.getAuthor().getName());
    }

    public ReviewDTO updateReview(Long id, ReviewDTO reviewDTO) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        Book book = bookRepository.findById(reviewDTO.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));
        review.setContent(reviewDTO.getContent());
        review.setRating(reviewDTO.getRating());
        review.setBook(book);
        Review savedReview = reviewRepository.save(review);
        return new ReviewDTO(savedReview.getId(), savedReview.getContent(), savedReview.getRating(),
            book.getId(), book.getTitle(), book.getAuthor().getName());
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}
