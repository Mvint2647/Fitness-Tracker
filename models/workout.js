const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date(),
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Please type a type of Exercise",
      },
      name: {
        type: String,
        trim: true,
        required: "Please type the name of the Exercise",
      },
      weight: {
        type: Number,
      },
      duration: {
        type: Number,
        required: "Please enter an exercise duration in mins",
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
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
