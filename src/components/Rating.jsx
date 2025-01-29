import React, { useState, useEffect } from 'react';
import { Rate, Typography } from 'antd';

const { Text } = Typography;

const Rating = () => {
  const [userRating, setUserRating] = useState(0);
  const [allRatings, setAllRatings] = useState([]);

  // Load ratings from localStorage on component mount
  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem('ratings')) || [];
    setAllRatings(savedRatings);
    
    // Check if current user has already rated (replace 'currentUserId' with actual user ID)
    const currentUserId = "user123"; // Replace with actual user ID from your auth system
    const existingRating = savedRatings.find(r => r.userId === currentUserId);
    if (existingRating) {
      setUserRating(existingRating.value);
    }
  }, []);

  const handleRate = (value) => {
    const currentUserId = "user123"; // Replace with actual user ID from your auth system
    
    // Update local state
    setUserRating(value);

    // Update all ratings
    const newRatings = allRatings.filter(r => r.userId !== currentUserId)
                          .concat([{ userId: currentUserId, value }]);
    
    setAllRatings(newRatings);
    
    // Save to localStorage
    localStorage.setItem('ratings', JSON.stringify(newRatings));
  };

  // Calculate average rating
  const averageRating = allRatings.length > 0 
    ? allRatings.reduce((sum, r) => sum + r.value, 0) / allRatings.length
    : 0;

  return (
    <div>
      <Rate 
        value={userRating}
        onChange={handleRate}
        style={{ fontSize: '14px' }}
      />
      <div style={{ marginTop: 8 }}>
        <Text type="secondary">
          {allRatings.length} ratings · {averageRating.toFixed(1)}
        </Text>
      </div>
    </div>
  );
};

export default Rating;