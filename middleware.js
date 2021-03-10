const Hotel=require('./models/hotel');
const Review=require('./models/review');


module.exports.isLoggedIn=(req,res,next)=>{
    if (!req.isAuthenticated()){
        req.session.returnTo=req.originalUrl
        req.flash('error','You must be signed in first!')
        return res.redirect('/login');
    }
    next();
}

module.exports. isAuthor=async(req,res,next)=>{
    const {id}=req.params;
    const hotel= await Hotel.findById(id)
    if (!hotel.author.equals(req.user._id)){
        req.flash('error',"You don't have permission to do that")
        return res.redirect(`/hotels/${id}`)
    }
    next()
}

module.exports. isReviewAuthor=async(req,res,next)=>{
    const {id,reviewId}=req.params;
    const review= await Review.findById(reviewId)
    if (!review.author.equals(req.user._id)){
        req.flash('error',"You don't have permission to do that")
        return res.redirect(`/hotels/${id}`)
    }
    next()
}