const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../model/Profile');
const User = require('../../model/User');
const { check,validationResult } = require('express-validator');
const config = require('config');
const request = require('request');

router.get('/me',auth,async (req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({'msg':'No Profile Exist'});
        }
        res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/',async (req,res)=>{
    try{
        const profiles = await Profile.find().populate('user',['name','email','avatar']);
        res.json(profiles);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/user/:userId', async (req,res)=>{

    try{
        const profile = await Profile.findOne({user:req.params.userId})
                        .populate('user',['name','email','avatar']);
        if(!profile) return res.status(400).json({'msg':'Profile Not found'});
        res.json(profile);
    }catch(err){
        console.lor(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(400).json({'msg':'Profile Not Found'});
        }
        res.status(500).send('Server Error');
    }
    
});

router.delete('/',auth,async (req,res)=>{
    try{
        await Profile.findOneAndRemove({user:req.user.id});
        await User.findOneAndRemove({_id:req.user.id});
        res.json({'msg':'User and Associated Profile is deleted'});
    }catch(err){
        console.error(err.message);
        res.status(500).json({'msg':'Server Error'});
    }
})

// add profile experience
router.put('/experience',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','Starting Date is required').not().isEmpty()
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {title,company,from} = req.body;
    const newExp = {title,company,from};
    //we will now use database, hence the tryCatch block

    try{
        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.push(newExp);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/education',[auth,[
    check('school','School is required').not().isEmpty(),
    check('degree','Degree is required').not().isEmpty(),
    check('fieldofstudy','Field of Study is required').not().isEmpty(),
    check('from','Starting Date is required').not().isEmpty()
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {school,degree,fieldofstudy,from} = req.body;
    const newEducation = {school,degree,fieldofstudy,from};
    //we will now use database, hence the tryCatch block

    try{
        const profile = await Profile.findOne({user:req.user.id});
        profile.education.push(newEducation);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// add profile experience ends here

//delete experience from profile, first is my own implementation
router.put('/deleteExperience',auth,async (req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.pop();
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Eroror');
    }
});

router.delete('/experience/:expId',auth,async (req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id});
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.expId);
        profile.experience.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/education/:eduId',auth,async (req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id});
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.eduId);
        profile.education.splice(removeIndex,1);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//delete experience ends here

router.post('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty()
]],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {
        company,status,skills,facebook,youtube
    } = req.body;

    const profileFields = {};
    if(company) profileFields.company = company;
    if(status) profileFields.status = status;
    profileFields.user = req.user.id;

    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;

    try{
        let profile = await Profile.findOne({user:req.user.id});
        if(profile){
            profile = await Profile.findOneAndUpdate({user:req.user.id},{$set:profileFields},{new:true});
            return res.json(profile);// because we want to terminate the function right here
        }
        //creating new profile against a user specified by id from the token
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/github/:userName',(req,res)=>{
    try{
        const options = {
            uri:`https://api.github.com/users/${req.params.userName}/repos?per_page=5&sort=created:asc&client_id=
            ${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method:'GET',
            headers:{'user-agent':'node.js'}
        };
        request(options,(error,response,body)=>{
            if(error) console.error(error);
            if(response.statusCode !== 200){
                return res.status(404).json({'msg':'No Github Profile is found'});
            }
            JSON.parse(body).map(repo =>console.log(repo['name']));
            res.json(JSON.parse(body));
        })
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;