const router = require('express').Router();
const Workout = require('../models/workout.js');

// ------------------get----------------------------
router.get('/api/workouts', (req, res) => {
 
    Workout.aggregate([
         {
           $addFields: {
               totalDuration: {
             $sum: "$exercises.duration"},
                 totalDistance:{ 
             $sum: "$exercises.distance"},
         }
       }
     ])
     .then((dbWorkout) => {
         res.json(dbWorkout);
     })
     .catch((err) => {
         res.json(err);
     });
 });
 
// ----------------post------------------------------
router.post('/api/workouts', (req, res) => {
    Workout.create(req. body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.json(err);
    });
});
// ------------------put----------------------------
router.put('/api/workouts/:id', ({body, params}, res) => {

  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body} },
    {new:true, runValidators: true}
  )
 
   .then((dbWorkouts) => {
        res.json(dbWorkouts);
    })
    .catch((err) => {
        res.json(err);
    });
});


// ------------------range----------------------------
router.get('/api/workouts/range', (req, res) => {
 
        Workout.aggregate([
             {
               $addFields: {
                   totalDuration: {
                 $sum: "$exercises.duration"},
                 totalWeight:
                 { $sum: "$exercises.weight" }
             },
               },
         ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbWorkouts) => {
        console.log(dbWorkouts)
        res.json(dbWorkouts);
    })
    .catch((err) => {
        res.json(err);
    });
});
// --------------------delete--------------------------
router.delete('/api/workouts/', ({ body }, res ) => {
    Workout.findByIdAndDelete(body.id) 
   
    .then(() => {
        res.json(true);
    })
    .catch((err) => {
        res.json(err);
    });
});


module.exports = router;