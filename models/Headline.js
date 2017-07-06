
// Require mongoose
var mongoose = require("mongoose");

// Create a schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the headlineSchema with schema class
var headlineSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true
  },

  summary: {
    type: String,
    required: true
  },

  date: String,
  saved: {
    type: Boolean,
    default: false
  }
});

var Headline = mongoose.model("Headline", headlineSchema);

// Export the Headline model
module.exports = Headline;
