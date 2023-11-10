import React from 'react';

const Card = ({ title, children,  Cardicon }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <Cardicon/> {title}
      </div>
      <div className="card-body" >
        {children}
      </div>
      <div className="card-footer small text-muted">Updated Yet</div>
    </div>
  );
};

export default Card;
