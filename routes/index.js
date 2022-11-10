var express = require('express');
const { response } = require('../app');
var router = express.Router();
const Blog = require('../models/blog');

/* GET home page. */
router.get('/', function(req, res, next) {
  // const blogs = [
  //   {title: "Hello world",snippet: "Sample snippet",body: "Sample body"},
  //   {title: "Hello earth",snippet: "Sample snippet for earth",body: "Sample body for earth"},
  //   {title: "Hello Kerala",snippet: "Sample snippet for kerala",body: "Sample body for kerala"}
  // ];
  // res.render('index', { title: 'Blog' , name: 'SJR Solutions' , blogs });
  res.redirect('/blogs')
});

router.get('/blogs',(req,res)=>{
  Blog.find().sort({ createdAt: -1 })
  .then((result)=>{
    res.render('index',{title:'All Blogs', name: 'SJR Solutions' , blogs: result});
  }).
  catch((error)=>{
    res.send(error);
  })
});

router.post('/blogs',(req,res)=>{
  const blog = new Blog(req.body);

  blog.save()
    .then((response)=>{
      res.redirect('/blogs');
    })
    .catch((err)=>{
      console.log(err);
    })
})

router.get('/blogs/create',(req,res)=>{
  res.render('createBlog',{ title: 'Create Blog' , name: 'SJR Solutions' });
})

router.delete('/blogs/:id',(req,res)=>{
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result)=>{
      res.json({redirect:'/blogs'})
    })
    .catch((err)=>{console.log(err);})
})

router.get('/blogs/:id', (req,res)=>{
  const id = req.params.id;
  Blog.findById(id)
    .then((result)=>{
      res.render('details',{blog: result, title: 'Blog details', name:'Blog Details'})
    })
    .catch((err)=>{
      res.send(err);
    })
})

router.get('/about',function(req,res){
  res.render('about', {title : "About" })
})

module.exports = router;
