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
module.exports = router;
