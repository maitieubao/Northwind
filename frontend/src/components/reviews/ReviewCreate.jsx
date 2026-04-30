import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewService, bookService } from '../../api/services';

const ReviewCreate = () => {
  const [bookId, setBookId] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    bookService.getAll().then(res => setBooks(res.data)).catch(console.error);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!bookId) newErrors.bookId = '* Please select book';
    if (!content.trim()) newErrors.content = '* Please enter review';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await reviewService.create({ 
        content, 
        rating,
        bookId: parseInt(bookId) 
      });
      navigate('/reviews/list');
    } catch (e) {
      setErrors({ form: 'Failed to create review' });
    }
  };

  return (
    <div>
      <div className="breadcrumb">Reviews / Create</div>
      
      <div className="page-header">
        <h1 className="page-title">Write a Review</h1>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
             <label className="form-label">Select Book</label>
             <select 
               className="form-control" 
               value={bookId} 
               onChange={e => { setBookId(e.target.value); setErrors(prev => ({...prev, bookId: null})); }}
             >
               <option value="" disabled>Choose a book to review...</option>
               {books.map(b => (
                 <option key={b.id} value={b.id}>{b.title} (by {b.authorName})</option>
               ))}
             </select>
             {errors.bookId && <div className="error-text">{errors.bookId}</div>}
          </div>

          <div className="form-group">
             <label className="form-label">Rating</label>
             <div className="star-rating">
               {[1, 2, 3, 4, 5].map(star => (
                 <span 
                   key={star} 
                   className={`star ${(hoverRating || rating) >= star ? 'filled' : ''}`}
                   onMouseEnter={() => setHoverRating(star)}
                   onMouseLeave={() => setHoverRating(0)}
                   onClick={() => setRating(star)}
                 >
                   ★
                 </span>
               ))}
             </div>
          </div>

          <div className="form-group">
             <label className="form-label">Your Review</label>
             <textarea 
               className="form-control" 
               placeholder="Share your thoughts on this book..."
               value={content} 
               onChange={e => { setContent(e.target.value); setErrors(prev => ({...prev, content: null})); }} 
             />
             {errors.content && <div className="error-text">{errors.content}</div>}
          </div>

          <div className="button-group">
             <button type="button" className="btn btn-secondary" onClick={() => navigate('/reviews/list')}>Cancel</button>
             <button type="submit" className="btn">Publish Review</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewCreate;
