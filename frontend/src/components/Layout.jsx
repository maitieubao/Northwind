import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({
    authors: true,
    books: true,
    reviews: true
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => location.pathname.startsWith(path);
  const isExactActive = (path) => location.pathname === path;

  return (
    <div className="app-container">
      <div className="topbar">
        HAIBAZO <span>BOOK REVIEW</span>
      </div>
      <div className="main-content">
        <div className="sidebar">
          {/* Authors Menu */}
          <div className={`sidebar-item ${isActive('/authors') ? 'active' : ''}`} onClick={() => toggleMenu('authors')}>
            Authors {openMenus.authors ? '^' : 'v'}
          </div>
          {openMenus.authors && (
            <>
              <div className={`sidebar-subitem ${isExactActive('/authors/list') ? 'active' : ''}`} onClick={() => navigate('/authors/list')}>
                List
              </div>
              <div className={`sidebar-subitem ${isExactActive('/authors/create') ? 'active' : ''}`} onClick={() => navigate('/authors/create')}>
                Create
              </div>
            </>
          )}

          {/* Books Menu */}
          <div className={`sidebar-item ${isActive('/books') ? 'active' : ''}`} onClick={() => toggleMenu('books')}>
            Books {openMenus.books ? '^' : 'v'}
          </div>
          {openMenus.books && (
            <>
              <div className={`sidebar-subitem ${isExactActive('/books/list') ? 'active' : ''}`} onClick={() => navigate('/books/list')}>
                List
              </div>
              <div className={`sidebar-subitem ${isExactActive('/books/create') ? 'active' : ''}`} onClick={() => navigate('/books/create')}>
                Create
              </div>
            </>
          )}

          {/* Reviews Menu */}
          <div className={`sidebar-item ${isActive('/reviews') ? 'active' : ''}`} onClick={() => toggleMenu('reviews')}>
            Reviews {openMenus.reviews ? '^' : 'v'}
          </div>
          {openMenus.reviews && (
            <>
              <div className={`sidebar-subitem ${isExactActive('/reviews/list') ? 'active' : ''}`} onClick={() => navigate('/reviews/list')}>
                List
              </div>
              <div className={`sidebar-subitem ${isExactActive('/reviews/create') ? 'active' : ''}`} onClick={() => navigate('/reviews/create')}>
                Create
              </div>
            </>
          )}
        </div>
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
