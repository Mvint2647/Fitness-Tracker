const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const workoutSchema = new Schema({
    type: {
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
                required: isRequired("weight"),

           
            },
            durration: {
                type: Number,
                required: 'Please type the # of Minutes to continue'
            },
            reps: {
                type: Number,
                required: isRequired("reps"),
            },
            distance: {
                type: Number,
                required: isRequired("distance"),
                
            },
            sets: {
                type: Number,
                required: isRequired("sets"),
           
            },      
        });
        function isRequired(track) {
            return function () {
              if ( track == "distance") {
                return this.type === "cardio";
              } else {
                return this.type === "resistance";
              }
            };
          }
          
          const workoutSchema = new Schema(
            {
              day: {
                type: Date,
                default: Date.now,
              },
              workouts: [workoutSchema],
            },
            {
              toObject: { virtuals: true },
              toJSON: { virtuals: true },
            }
          );
          
          workoutSchema.virtual("totalDuration").get(function () {
            let totalDuration = 0;
            this.exercises.forEach((el) => {
              totalDuration += el.duration;
            });
            return totalDuration;
          });
          
          const Workout = mongoose.model("Workout", workoutSchema);
          
          module.exports = Workout;