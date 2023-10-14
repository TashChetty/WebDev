import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {
    static async apiPostReview(req, res, next) {    //apiPostReview method
        try {
            const movieId = req.body.movie_id    //datawill be passed in as the request’s body. 
            const review = req.body.review
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()
            const ReviewResponse = await ReviewsDAO.addReview(  ////to retrieve each of the field values, we use req.body.movie_id, req.body.review etc
                movieId,
                userInfo,
                review,
                date
            )
            res.json({ status: "success " })        //We send the information to ReviewsDAO.addReview
        } catch (e) {
            res.status(500).json({ error: e.message })  //we return ‘success’ if the post works and an error if it didn’t.
        }
    }

    //We get information from the request’s body parameter. Previously in MoviesController, we got information
    //from the request’s query parameter as we extracted data from the URL e.g. req.query.title. This time we
    //retrieve the data from the body of the request. 
    // In the React frontend of the app (which we will
    // implement later), we call this endpoint with something like:
    // axios.post("https://localhost:5000/api/v1/movies/review", data)



    static async apiUpdateReview(req, res, next) {  //apiUpdateReview
        try {
            const reviewId = req.body.review_id
            const review = req.body.review
            const date = new Date()
            const ReviewResponse = await ReviewsDAO.updateReview( //extract the movieId and review text similar to what we have done in posting a review.
                reviewId,
                req.body.user_id,
                review,
                date
            )
            var { error } = ReviewResponse
            if (error) {
                res.status.json({ error })
            }
            if (ReviewResponse.modifiedCount === 0) {   //call ReviewsDAO.updateReview and pass in user_id to ensure that the user who is updating the view is the one who has created it.
                throw new Error("unable to update review. User may not be original poster")
            }
            res.json({ status: "success " })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    //updateReview returns a document ReviewResponse which contains the property modifiedCount. modifiedCount
    // contains the number of modified documents. We check modifiedCount to ensure that it is not zero. If it
    // is, it means the review has not been updated and we throw an error

    static async apiDeleteReview(req, res, next) { //apiDeleteReview
        try {
            const reviewId = req.body.review_id
            const userId = req.body.user_id
            const ReviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId,
            )
            res.json({ status: "success " })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

//Like apiPostReview and apiUpdateReview, we extract reviewId and userId. With userId, we ensure that the user
//deleting the view is the one who has created the view
}