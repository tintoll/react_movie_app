const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//=================================
//             Favorite
//=================================

router.post('/favoriteNumber', (req, res) => {
    

    Favorite.find({'movieId':req.body.movieId })
        .exec((err, favorites) => {
            if(err) return res.status(400).json({success:false, err})

            res.status(200).json({success:true, favoriteNumber : favorites.length})
        })
})
router.post('/favorited', (req, res) => {
    Favorite.find({'movieId':req.body.movieId, 'userFrom' : req.body.userFrom })
        .exec((err, favorites) => {
            if(err) return res.status(400).json({success:false, err})
            let result = false;
            if(favorites.length !== 0) {
                result = true;
            }
            res.status(200).json({success:true, favorited: result});             
        })
})


router.post('/add', (req, res) => {    
    const favorite = new Favorite(req.body);
    favorite.save((err, favorite) => {
            if(err) return res.status(400).json({success:false, err})
            res.status(200).json({success:true})
        })
})
router.post('/delete', (req, res) => {    

    Favorite.findOneAndDelete({'movieId':req.body.movieId, 'userFrom':req.body.userFrom })
        .exec((err, favorite) => {
            if(err) return res.status(400).json({success:false, err})

            res.status(200).json({success:true})
        })
})

router.post('/getFavoriteMovies', (req, res) => {   

    Favorite.find({userFrom : req.body.userFrom})
    .exec((err, favorites) => {
        if(err) return res.status(400).json({success:false, err})

        res.status(200).json({success:true, favorites})
    })
})

router.post('/removeFromFavorite', (req, res) => {   

    Favorite.findOneAndDelete({userFrom : req.body.userFrom, movieId:req.body.movieId})
    .exec((err, favorites) => {
        if(err) return res.status(400).json({success:false, err})
        res.status(200).json({success:true})
    })
})





module.exports = router;
