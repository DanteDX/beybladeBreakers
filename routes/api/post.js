const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../../model/User');
const Post = require('../../model/Post');
const Profile = require('../../model/Profile');

router.post('/',[auth,[
    check('text','Text is required').not().isEmpty()
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({erros:errors.array()});
    }

    try{
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        });

        const post = await newPost.save();
        res.json(post);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/',auth,async (req,res)=>{
    try{
        const posts = await Post.find().sort({data: -1}); // most recent posts
        res.json(posts);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){ // valid formatted id
            return res.status(404).json({'msg':'Post not found'});
        }
        res.json(post);
    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId'){ // not validly formatted
            return res.status(404).json({'msg':"Post not found"});
        }
        res.status(500).send('Server Error');
    }
});

router.delete('/:id',auth, async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){ // validly formatted id
            return res.status(404).json({'msg':'Post not found'});
        }
        //check user
        if(req.user.id !== post.user.toString()){
            return res.status(401).json({'msg':'User not authorized'});
        }
        await post.remove();
        res.json({'msg':'Post is removed'});
    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId'){ // not validly formatted id
            return res.status(404).json({'msg':'Post not found'});
        }
        res.status(500).send('Server Error');
    }
});

router.put('/like/:id',auth,async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({'msg':'Post already liked'});
        }
        post.likes.push({user:req.user.id});
        await post.save();
        res.json(post.likes);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/unlike/:id',auth,async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({'msg':'Post is not liked yet'});
        }
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);
        await post.save();
        res.json(post.likes);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// My implementations
router.put('/comment/:id',[auth,[
    check('text','Text is required').not().isEmpty()
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const user = await User.findById(req.user.id).select('-password');
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({'msg':'Post not found'});
        }
        const newComment = {
            text: req.body.text,
            user: req.user.id,
            name: user.name,
            avatar: user.avatar
        };
        post.comments.push(newComment);
        post = await post.save();
        res.json(post.comments);
    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({'msg':'Post not found'});
        }
        res.status(500).send('Server Error');
    }
});

router.delete('/comment/:id',auth,async(req,res)=>{
    try{
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({'msg':'Post not found'});
        }
        let user = await User.findById(req.user.id).select('-password');
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({'msg':"User not authorized"});
        }
        
        let commentsRemove = post.comments.filter(comment => comment.user.toString() === req.user.id);
        if(commentsRemove.length === 0){
            return res.status(404).json({'msg':'No comment is made yet'});
        }
        let removeIndex = post.comments.indexOf(commentsRemove[0]);
        post.comments.splice(removeIndex,1);
        await post.save();
        res.json(post.comments);
    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({'msg':'Post not found'});
        }
        res.status(500).send('Server Error');
    }
});
// my implementations end here

// we want to delete a specific comment from a specific post

router.delete('/comment/:id/:commentId',auth,async (req,res)=>{
    try{
        let post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({'msg':'Post not found'});
        }
        let comment = post.comments.find(comment => comment.id.toString() === req.params.commentId);
        if(!comment){
            return res.status(404).json({'msg':'Comment not found'});
        }
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({'msg':'User not authorized'});
        }
        //Brad is wrong
        let removeIndex = post.comments.indexOf(comment);
        post.comments.splice(removeIndex,1);
        await post.save();
        res.json(post);
    }catch(err){
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({'msg':'Post not found'});
        }
        res.status(500).send('Server Error');
    }
});
// specific comment deletion from specific post ends right here
module.exports = router;