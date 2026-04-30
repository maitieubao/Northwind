import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reviewService } from '../../api/services';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await reviewService.getAll();
        setReviews(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleEdit = (id) => navigate(`/reviews/edit/${id}`);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await reviewService.delete(id);
        setReviews(reviews.filter(r => r.id !== id));
      } catch (e) {
        alert('Failed to delete review');
      }
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="star-display">
        {[1, 2, 3, 4, 5].map(star => (
          <span key={star} className={star <= rating ? '' : 'star-muted'}>★</span>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="breadcrumb">Reviews / Archive</div>
      
      <div className="page-header">
        <h1 className="page-title">Reviews Archive</h1>
        <button className="btn" onClick={() => navigate('/reviews/create')}>+ Add Review</button>
      </div>

      <div className="card">
        {loading ? <p style={{color: 'var(--text-muted)'}}>Loading reviews...</p> : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Book</th>
                  <th>Author</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => (
                  <tr key={review.id}>
                    <td>{index + 1}</td>
                    <td style={{color: 'var(--text-primary)', fontWeight: 500, fontFamily: 'var(--font-editorial)'}}>{review.bookTitle}</td>
                    <td>{review.authorName}</td>
                    <td>{renderStars(review.rating || 0)}</td>
                    <td style={{maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                      "{review.content}"
                    </td>
                    <td>
                      <button className="action-btn" onClick={() => handleEdit(review.id)}>Edit</button>
                      <button className="action-btn delete" onClick={() => handleDelete(review.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewList;
