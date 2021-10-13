const router = require('express').Router();
const Workout = require('../models');
// ----------------post------------------------------
router.post('/api/workouts', (req, res) => {
    Workout.create({})
    .then((workout) => {
        res.json(workout);
    })
    .catch((err) => {
        res.json(err);
    });
});
// ------------------put----------------------------
router.put('api/workouts/:id', ({body, params}, res) => {

  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body} },

    {new:true, runValidators: true}
  )
 
   .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err);
    });
});
// ------------------get----------------------------
router.get('/api/workouts', (req, res) => {
 
       Workout.aggregate([
    
            {
        
              $addFields: {
                  totalDuration: {
                $sum: "$exercises.totalDuration",
                },
              },
            },
        ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
        console.log(dbWorkouts)
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err);
    });
});
// --------------------range--------------------------
router.delete('/api/workouts/', ({ body }, res ) => {
    Workout.findByIdAndDelete(body.id) 
   
    .then(() => {
        res.json(true);
    })
    .catch((err) => {
        res.json(err);
    });
});
// ----------------------------------------------

module.exports = router;