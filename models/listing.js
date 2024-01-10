const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        // type: String,
        // default: "https://plus.unsplash.com/premium_photo-1661964475795-f0cb85767a88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        // set: (v) => v === "" ? "https://plus.unsplash.com/premium_photo-1661964475795-f0cb85767a88?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" : v,
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    geometry: {      
            type: {
                type: String, // Don't do `{ location: { type: String } }`
                enum: ['Point'], // 'location.type' must be 'Point'
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            },
        },   
});

// mogoose middleware

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});



const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
