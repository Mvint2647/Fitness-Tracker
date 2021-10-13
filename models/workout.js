const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const workoutSchema = new Schema({
  
      day: {
        type: Date,
        default: Date.now,
      },
      exercises:[
        {
        type:{
                type: String,
                enterNum: ["resistance", "cardio"],
                trim: true,
                required: 'Please type a type of Exercise',
            },
            name: {
                type: String,
                trim: true,
                required: 'Please type the name of the Exercise',
            },
            weight: {
                type: Number,

           
            },
            durration: {
                type: Number,
            },
            reps: {
                type: Number,
            },
            distance: {
                type: Number,
                
            },
            sets: {
                type: Number,
           
            },  
          },
        ]    
        });
     
          const Workout = mongoose.model("Workout", workoutSchema);
          
          module.exports = Workout;