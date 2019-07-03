var mongoose = require ("mongoose");
var Schema = mongoose.Schema;

var headLineSchema = new Schema({
    headline: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    },
    link: {
        type: String,
        required: true
    }
})
var Headline = mongoose.model("Headline", headLineSchema);

module.exports = Headline;