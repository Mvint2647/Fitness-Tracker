const router = require('express').Router();
const Workout = require('../models/workout.js');

router.post('api/workouts', (req, res) => {
    Workout.create({})
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.put('api/workouts/:id', ({body, params }, res) => {
    Workout.findIdUpdate(
        params.id,
        {$push: {exercises: body}},
        {new: true, Validators: true})
    
    
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.get('/api/Workouts', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
    .then((dbWorkouts) => {
        res.json(dbWorkouts);
    })
    .catch((err) => {
        res.json(err);
    });
});

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        },
    ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
        console.log(dbWorkouts);
        res.json(dbWorkouts);
    })
     .catch((err) => {
        res.json(err);
    });
});

router.delete('/api/workouts', ({ body}, res) => {
    Workout.findIdDelete(body.id)
    .then(() => {
        res.json(true);
    })
    .catch((err) => {
        res.json(err);

    });
});

module.exports = router;