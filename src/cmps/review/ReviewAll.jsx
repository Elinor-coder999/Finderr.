import { useState, useEffect } from 'react'

import { ReviewBar } from './ReviewBar'
import { ReviewList } from './ReviewList'
import { StarRating } from './StarRating'

import { userService } from '../../services/user/user.service.remote'
import { GiRoundStar } from "react-icons/gi";

export function ReviewAll({ user_id }) {
    const [userReviews, setUserReviews] = useState(null)
    
    useEffect(() => {
        async function loadUserReviews() {
            try {
                const userReviews = await userService.getUserReviews(user_id)
                setUserReviews(userReviews)
            } catch (err) {
                console.log('userReviews: err in userReviews', err)
            }
        }
        loadUserReviews()
    }, [user_id])

  function calculateAverageRating (reviews) {
        if (!reviews || reviews.length === 0) return 0
        const totalRating = reviews.reduce((sum, review) => sum + review.rate, 0)
        return parseFloat((totalRating / reviews.length).toFixed(1))
    }

    if (!userReviews) return <div className="loader-container-all">
        <div className="loader-all"></div>
    </div>

const averageRating = calculateAverageRating(userReviews)

    return <section className="review-app-all">
        <h3 style={{
            margin: '0px 0px 16px',
            fontSize: '20px',
            fontWeight: '700',
            color: '#404145',
            lineHeight: '28px',
            padding:'0px 0px 16px'
        }}>Reviews</h3>
        <div className="review-header-all" >
            <h4 style={{ margin: 0, padding: 0 }}>
                {/* <span>{userReviews.length} </span> */}
                
                {userReviews.length} reviews for this Gig 
            </h4>
            <span style={{ paddingLeft: '540px'}}className="rate padding-all">{averageRating.toFixed(1)}</span>
            <div >
            <StarRating value={averageRating} />
            
            </div>
            
        </div>
        <section style={{ display: 'flex', margin: '0px -8px', padding: '0px 0px 24px' }}>
            <ReviewBar userReviews={userReviews} />
            <ul className='next-to-bar'>
                <li style={{ padding: '0px 0px 5px 0px' }}> Rating Breakdown
                </li>
                <li style={{ width: '100%',display: 'flex', alignItems: 'center',padding: '0px 0px 8px' }}>
                    Seller communication level
                    <span style={{ margin: '0px 0px 0px 260px' }}>{userReviews.length} <GiRoundStar style={{ color: 'black', fontWeight: 'bold' , marginLeft: 'auto' }} /></span>
                </li>
                <li style={{ padding: '0px 0px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Recommend to a friend</span>
                    <span style={{ marginLeft: 'auto' }}>4.9 <GiRoundStar style={{ color: 'black', fontWeight: 'bold' }} /></span>
                </li>
                <li>
                    Service as described
                    <span style={{ margin: '0px 0px 0px 290px' }}>4.9 <GiRoundStar style={{ color: 'black', fontWeight: 'bold' }} /></span>
                </li>
            </ul>
        </section>
        <ReviewList 
                userReviews={userReviews} 
            />
    </section>
}


