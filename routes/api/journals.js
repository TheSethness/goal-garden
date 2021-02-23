const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport')

const Journal = require('../../models/Journal')

const validateJournalInput = require("../../validation/journal")

router.get('/goal/:goalId', (req, res) => {
    Journal.find({goal: req.params.goalId})
    .then(journals => res.json(journals))
    .catch(err => res.status(404).json({ nojournalsfound: 'No Journals found'}));
});

router.get('/:id', (req, res) => {
    Journal.findById(req.params.id)
    .then(journal => res.json(journal))
    .catch(err => res.status(404).json({nojournalfound: 'No journal found'}));
});

router.post('/:goalId', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateJournalInput(req.body)
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newJournal = new Journal({
        goal: req.params.goalId,
        body: req.body.body,
        success: req.body.success,
        highlights: req.body.highlights,
        media: req.body.media,
        goalState: req.body.goalState,
        cues: req.body.cues,
        rewards: req.body.rewards
    });

    newJournal.save().then(journal => res.json(journal));
});

router.delete("/:id",
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Journal
            .findByIdAndRemove(req.params.id, (err, deletedJournal) => {
                debugger
                if (err) {
                    res.status(500);
                } else if (!deletedGoal) {
                    res.status(404);
                }
            })
    });

module.exports = router;