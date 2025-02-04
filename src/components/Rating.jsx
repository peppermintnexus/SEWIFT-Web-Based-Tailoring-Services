import React, { useState, useEffect } from "react";
import { Rate, Typography } from "antd";

const { Text } = Typography;

const Rating = ({ shopId }) => {
  // Add shopId prop
  const [userRating, setUserRating] = useState(0);
  const [allRatings, setAllRatings] = useState([]);

  // Load ratings from localStorage on component mount
  useEffect(() => {
    const savedRatings = JSON.parse(localStorage.getItem("ratings")) || [];
    setAllRatings(savedRatings);

    const currentUserId = "user123"; // Replace with actual user ID
    // Find rating for current user AND current shop
    const existingRating = savedRatings.find(
      (r) => r.userId === currentUserId && r.shopId === shopId
    );
    if (existingRating) {
      setUserRating(existingRating.value);
    }
  }, [shopId]); // Add shopId to dependency array

  const handleRate = (value) => {
    const currentUserId = "user123"; // Replace with actual user ID

    // Update local state
    setUserRating(value);

    // Update all ratings: remove previous rating for this user+shop
    const newRatings = allRatings
      .filter((r) => !(r.userId === currentUserId && r.shopId === shopId))
      .concat([{ userId: currentUserId, shopId, value }]); // Include shopId

    setAllRatings(newRatings);
    localStorage.setItem("ratings", JSON.stringify(newRatings));
  };

  // Calculate average for THIS SHOP
  const shopRatings = allRatings.filter((r) => r.shopId === shopId);
  const averageRating =
    shopRatings.length > 0
      ? shopRatings.reduce((sum, r) => sum + r.value, 0) / shopRatings.length
      : 0;

  return (
    <div className='flex items-center'>
      <Rate
        value={userRating}
        onChange={handleRate}
        style={{ fontSize: "14px" }}
        className='pr-3'
      />
      <div className='pb-1'>
        <Text type='secondary'>{averageRating.toFixed(1)}</Text>
      </div>
    </div>
  );
};

export default Rating;
