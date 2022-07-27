import React, { useState, useRef } from 'react';
import './styles.css';
import { v4 as uuidv4 } from 'uuid';
import CommentsList from './CommentsList';

function CommentsApp() {
  const [comments, setComments] = useState([]);
  const imputCommentRef = useRef();

  function handleSubmit() {
    const name = imputCommentRef.current.value;
    if (name === '') return;
    setComments((prevComments) => [...prevComments, {
      id: uuidv4(),
      name,
    }]);
    imputCommentRef.current.value = null;
  }

  return (
    <div className="comments">
      <div className="coments-container">
        <div className="comments-header-renderer">
          <h2 className="comments__title">Comments</h2>
          <div className="comments-imput">
            <div className="imput-container">
              <form>
                <input ref={imputCommentRef} type="text" className="new-comment" name="new-comment" placeholder="Add a comment..." />
              </form>
              <br className="comments-line" />
            </div>
            <div className="comments__buttons-container">
              <button onClick={handleSubmit} type="submit" className="comments__button comment-button">
                COMMENT
              </button>
            </div>
          </div>
        </div>
        <div className="comments-section-container">
          <div className="comments-comment-container">
            <CommentsList comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsApp;
