import React, { useEffect, useState } from 'react';
import { AiFillStar, AiOutlineSearch, AiOutlineStar } from 'react-icons/ai';
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import { MdOutlineReviews } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Reviews = ({ listing, reviews }) => {
  const navigate = useNavigate();

  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    setFilteredReviews(reviews);

    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) {
      setIsLoggedIn(false);
      return;
    }

    if (listing.userId === currentUser.id) {
      setHasReviewed(true);
      return;
    }

    if (reviews.some((review) => review.reviewerId === currentUser.id)) {
      setHasReviewed(true);
    } else {
      setHasReviewed(false);
    }
  }, [listing.userId, reviews]);

  const calculateAverageRating = () => {
    if (!reviews.length) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(2);
  };

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      distribution[review.rating - 1]++;
    });
    return distribution.reverse();
  };

  const toggleExpand = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSortOption(selectedOption);

    let sortedReviews = [...filteredReviews];
    if (selectedOption === 'Most Recent') {
      sortedReviews.sort(
        (a, b) => new Date(b.createdTimestamp) - new Date(a.createdTimestamp)
      );
    } else if (selectedOption === 'Highest Rated') {
      sortedReviews.sort((a, b) => b.rating - a.rating);
    } else if (selectedOption === 'Lowest Rated') {
      sortedReviews.sort((a, b) => a.rating - b.rating);
    }
    setFilteredReviews(sortedReviews);
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredReviews(reviews);
      setSearchResults('');
      return;
    }

    const filtered = reviews.filter((review) =>
      review.comment.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredReviews(filtered);

    setSearchResults(
      filtered.length > 0
        ? `Search results: "The word '${searchQuery}' was found ${filtered.length} times.`
        : `Search results: "The word '${searchQuery}' was found 0 times."`
    );
  };

  const filterByRating = (rating) => {
    const isAlreadyFiltered =
      filteredReviews.length ===
      reviews.filter((review) => review.rating === rating).length;

    if (isAlreadyFiltered) {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter((review) => review.rating === rating);
      setFilteredReviews(filtered);
    }
  };

  return (
    <div className='max-w-7xl mx-auto px-4 pt-12 pb-24 border-b border-black'>
      <div className='flex items-center justify-between mb-12'>
        <h1 className='text-3xl font-bold font-mochiy'>Reviews</h1>

        {reviews && reviews.length > 0 && !hasReviewed && (
          <button
            className={`flex items-center py-3 px-6 rounded-md font-semibold transition ${
              isLoggedIn
                ? 'bg-[#5EA91E] text-white hover:bg-[#639E3B]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!isLoggedIn}
            onClick={() =>
              navigate('leaveReview', {
                state: { listing },
              })
            }
          >
            <MdOutlineReviews className='mr-2 text-lg' />
            {isLoggedIn ? 'Leave/Add a Review' : 'Login to add a review'}
          </button>
        )}
      </div>

      {reviews.length > 0 ? (
        <div className='flex'>
          <div
            className='w-2/3 space-y-8 overflow-y-auto pr-4'
            style={{ maxHeight: '400px' }}
          >
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review, index) => (
                <div key={index} className='border-b pb-8'>
                  <div className='flex items-center space-x-4'>
                    <div className='w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-lg font-bold'>
                      {review.reviewer.firstName[0]}
                    </div>
                    <div>
                      <p className='font-bold'>{review.user}</p>
                      <div className='flex items-center text-md text-gray-500'>
                        <div className='flex items-center'>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className='text-yellow-400'>
                              {i < review.rating ? (
                                <AiFillStar />
                              ) : (
                                <AiOutlineStar />
                              )}
                            </span>
                          ))}
                        </div>
                        <span className='ml-2 text-sm'>
                          | {moment(review.createdTimestamp).fromNow()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className='text-gray-700 mt-4'>
                    {expandedIndexes.includes(index) ||
                    review.comment.length <= 150
                      ? review.comment
                      : `${review.comment.slice(0, 150)}...`}
                    {review.comment.length > 150 &&
                      !expandedIndexes.includes(index) && (
                        <button
                          onClick={() => toggleExpand(index)}
                          className='text-[#629d3b] ml-2 hover:underline'
                        >
                          {expandedIndexes.includes(index)
                            ? 'Read Less'
                            : 'Read More'}
                        </button>
                      )}
                  </p>

                  <div className='mt-6 text-sm flex items-center text-black'>
                    Helpful?{' '}
                    <button className='ml-2 flex items-center font-semibold'>
                      Yes
                      <BsHandThumbsUp className='ml-1' />
                    </button>
                    <button className='ml-4 flex items-center font-semibold'>
                      No
                      <BsHandThumbsDown className='ml-1' />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className='text-gray-500 text-md'>
                No reviews match your filter.
              </p>
            )}
          </div>

          <div className='w-1/3 pl-8'>
            <p className='text-lg font-semibold'>
              This user currently has {reviews.length} reviews
            </p>
            <div className='text-xl font-bold mt-4 flex items-center'>
              <div className='flex items-center text-yellow-400'>
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(calculateAverageRating()) ? (
                      <AiFillStar />
                    ) : (
                      <AiOutlineStar />
                    )}
                  </span>
                ))}
              </div>
              <span className='ml-2 text-black text-sm'>
                {calculateAverageRating()}
              </span>
            </div>

            <div className='mt-4'>
              <select
                id='sort'
                value={sortOption}
                onChange={handleSortChange}
                className='w-[75%] bg-gray-100 text-sm rounded-md p-1'
              >
                <option value='' disabled>
                  Sort By
                </option>
                <option value='Most Recent'>Most Recent</option>
                <option value='Highest Rated'>Highest Rated</option>
                <option value='Lowest Rated'>Lowest Rated</option>
              </select>
            </div>

            <div className='mt-8 space-y-5'>
              {getRatingDistribution().map((count, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 cursor-pointer ${
                    count > 0 ? 'hover:text-[#629d3b]' : 'text-gray-400'
                  }`}
                  onClick={() => count > 0 && filterByRating(5 - index)}
                >
                  <div className='flex-1 bg-gray-200 rounded h-2'>
                    <div
                      className='bg-black h-2 rounded'
                      style={{
                        width: `${(count / reviews.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className='text-sm font-semibold'>{5 - index} stars</p>
                  <p className='text-sm font-semibold'>({count})</p>
                </div>
              ))}
            </div>

            <div className='mt-8'>
              <div className='flex items-center border rounded-2xl bg-gray-100 pl-3'>
                <input
                  type='text'
                  placeholder='Search reviews...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='flex-1 bg-transparent outline-none text-sm p-2'
                />
                <button
                  onClick={handleSearch}
                  className='bg-black text-white py-3 px-4 rounded-r-2xl flex items-center justify-center'
                  style={{ height: '100%' }}
                >
                  <AiOutlineSearch />
                </button>
              </div>
              {searchResults && (
                <p className='mt-4 text-sm text-gray-700'>{searchResults}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center space-y-4'>
          <p className='text-gray-700 text-md'>
            This user doesn&apos;t have any reviews yet.
          </p>

          {!hasReviewed && (
            <button
              className={`flex items-center py-3 px-6 rounded-md font-semibold transition ${
                isLoggedIn
                  ? 'bg-[#5EA91E] text-white hover:bg-[#639E3B]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!isLoggedIn}
              onClick={() =>
                navigate('leaveReview', {
                  state: { listing },
                })
              }
            >
              <MdOutlineReviews className='mr-2 text-lg' />
              {isLoggedIn ? 'Leave/Add a Review' : 'Login to add a review'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;
