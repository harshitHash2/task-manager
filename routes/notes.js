const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
// const User = require('../models/User')
const Notes = require('../models/Task');
// var bcrypt = require('bcryptjs');
// var fetchuser = require('../middleware/fetchuser');

//Route 1 -> Fetching All Notes of the authenticated user
router.get('/fetchalltasks', async (req,res) => {
    try{
        // const userid= req.user.id;
        const notes = await Notes.find();
        res.json(notes);

    } catch (e) {
        //Typererror
        res.status(500).send('Some error Occured');
    }
  })

  // Route 2 -> Add a new Note Endpoint
  router.post('/newtask', [
    body('title').isLength({ min : 3}),
    body('description').isLength({ min : 5})
  ], async (req,res) => {

    // Validating the user input 
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({errors: 'Validation Failed'});
    }
    const {title, description, tag, due} = req.body;
    try{
        const note = new Notes({title, description, tag, due});
        const savedNote= await note.save();
        res.json(savedNote);

    } catch (e) {
        //Typererror
        res.status(500).send('SOme error Occured');
    }
  })

  // Route 3 -> Update a note
  router.put('/task/:id', async (req,res) => {

    const { title, description, tag, due } = req.body;
    const newNote= {};
    if(title) {newNote.title= title};
    if(description) {newNote.description= description};
    if(tag) {newNote.tag= tag};
    if(due) {newNote.due= due};

    const note = await Notes.findById(req.params.id);
    // console.log(note._id.toString());
    if(!note) {
        return res.status(404).send('Not found');
    }
    

    const note1= await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
    res.json({note1});
  })

  // Route 4 -> Deleteing a note
  router.delete('/deletetask/:id', async (req,res) => {

    const {title, description, tag, due} = req.body;
    
    const note = await Notes.findById(req.params.id);
    if(!note) {
        return res.status(404).send('Not found');
    
    }
    

    const note1= await Notes.findByIdAndDelete(req.params.id);
    res.json({'success': 'Note has been deleted'});
  })
module.exports= router;