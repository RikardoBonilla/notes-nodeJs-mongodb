const router = require('express').Router();
const Note = require('../models/Notes');

router.get('/notes/add',(req,res) => {
    res.render('notes/new-note');
});

router.post('/notes/new-note',async (req,res) => {
    const { title, description } = req.body;
    const errors = [];

    if( !title ){
        errors.push({ text: 'Plese write a title' });
    }
    if ( !description ) {
        errors.push({ text: 'Plese write a Description' });
    }
    if (errors.length > 0) {
        res.render('notes/new-note', { errors, title, description } );
    }else{
        const newNote = new Note({ title, description })
        await newNote.save();
        res.render('notes');
    }
    
});

router.get('/notes', async(req,res) => {
    const notes = await Note.find();
    res.render('notes/all-notes',  { notes });
});

module.exports = router;