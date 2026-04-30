import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { reviewService, bookService } from '../../api/services';

const ReviewEdit = () => {
  const { id } = useParams();
  const [bookId, setBookId] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksRes, reviewRes] = await Promise.all([
          bookService.getAll(),
          reviewService.getById(id)
        ]);
        setBooks(booksRes.data);
        const review = reviewRes.data;
        setBookId(review.bookId.toString());
        setContent(review.content);
        setRating(review.rating || 0);
      } catch (e) {
        console.error(e);
        setErrors({ form: 'Failed to load data' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
      await reviewService.update(id, { 
        content, 
        rating,
        bookId: parseInt(bookId) 
      });
      navigate('/reviews/list');
    } catch (e) {
      setErrors({ form: 'Failed to update review' });
    }
  };

  if (loading) return <div className="loading-overlay">Loading review details...</div>;

  return (
    <div>
      <div className="breadcrumb">Reviews / Edit</div>
      
      <div className="page-header">
        <h1 className="page-title">Edit Review</h1>
      </div>

      <div className="card" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
          {errors.form && <div className="error-text" style={{marginBottom: '1rem'}}>{errors.form}</div>}
          
          <div className="form-group">
             <label className="form-label">Select Book</label>
             <select 
               className="form-control" 
               value={bookId} 
               onChange={e => { setBookId(e.target.value); setErrors(prev => ({...prev, bookId: null})); }}
             >
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
               style={{ height: '150px' }}
             />
             {errors.content && <div className="error-text">{errors.content}</div>}
          </div>

          <div className="button-group">
             <button type="button" className="btn btn-secondary" onClick={() => navigate('/reviews/list')}>Cancel</button>
             <button type="submit" className="btn">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewEdit;
