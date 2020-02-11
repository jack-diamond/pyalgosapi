const express = require('express');
const router = express.Router();
const Problem = require('../models/problem');

// Get all lists
router.get('/', async (req, res) => {
    try {
        const problems = await Problem.find();
        res.json(problems);
;    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// Get one list
router.get('/:id', getProblem, (req, res) => {
    res.json(res.problem);
});

// Create
router.post('/', async (req, res) => {
    const problem = new Problem({
        name: req.body.name,
        problems: req.body.problems
    });
    
    try {
        const newProblem = await problem.save();
        res.status(201).json(newProblem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// Delete problem set
router.delete('/:id', getProblem, async(req, res) => {
    try {
        await res.problem.remove();
        res.json({ message: 'deleted problem set' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

async function getProblem(req, res, next) {
    let problem;
    try {
        problem = await Problem.findById(req.params.id);
        if (problem == null){
            return res.status(404).json({ message: 'Cannot find problem list.' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    console.log(problem);
    res.problem = problem;
    next();
}

module.exports = router;
