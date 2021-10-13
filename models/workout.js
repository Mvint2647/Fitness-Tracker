const mongooese = require('mongoose');

const Schema = mongoose.Schema;
const WorkoutSchema = new Schema({
    day: {
        type:Date,
        default:() => new Date(),
    },
    exercises: [
        { 
            type: {
                type: String,
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
                required: 'Please type the # of Minutes to continue'
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