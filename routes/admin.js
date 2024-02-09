var express = require('express');
var router = express.Router();
var userHelpers=require('../helpers/user-helpers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('admin/home')
});
router.get('/res',(req,res)=>{
  userHelpers.getAllReservation().then((reserve)=>{
    res.render('admin/reserve',{reserve})
  })
})








module.exports = router;
