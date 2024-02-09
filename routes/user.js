var express = require('express');
var router = express.Router();
var userHelpers=require('../helpers/user-helpers');
const session = require('express-session');
/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  res.render('user/home',{user});
});

router.get('/reserve',(req,res)=>{
  let user=req.session.user
  if(user){
    res.render('user/reserve');
  }else{
    res.render('user/login');
  }
})
router.post('/reserve',(req,res)=>{
  userHelpers.doReserve(req.body).then((response)=>{
    console.log(response)
    res.redirect('/')
  })
})
router.get('/order',(req,res)=>{
  let user=req.session.user
  if(user){
    res.render('user/order')

  }else{
    res.redirect('/login')
  }


 
})
router.get('/register',(req,res)=>{
  
    res.render('user/register')

 
})

router.post('/register',(req,res)=>{
  userHelpers.doRegister(req.body).then((response)=>{
    console.log(response)
    res.redirect('/')
  })
})
router.get('/login',(req,res)=>{
  res.render('user/login')
})
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn=true
      req.session.user=response.user
      res.redirect('/')
    }else{
      res.redirect('/login')
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/')
})
router.get('/seemore',(req,res)=>{
  userHelpers.getAllReviews().then((review)=>{
    res.render('user/seemore',{review})
  })
})
router.get('/add-review',(req,res)=>{
  let user=req.session.user
  if(user){
    res.render('user/add-review')

  }else{
    res.render('user/login')
  }
})
router.post('/add-review',(req,res)=>{
  console.log(req.body)
  userHelpers.addReview(req.body,(id)=>{
    res.redirect('/seemore')
  })
})

module.exports = router;
