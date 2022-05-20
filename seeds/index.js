const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author: '6284d18a1a1f722036fb4289',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type : "Point", 
                coordinates : [ cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dytlgqafl/image/upload/v1652937395/YelpCamp/rdtsump8bhoklhruhxcq.jpg',
                    filename: 'YelpCamp/rdtsump8bhoklhruhxcq'
                },
                {
                    url: 'https://res.cloudinary.com/dytlgqafl/image/upload/v1652937395/YelpCamp/zzrhpcm3qsewwner6xcy.jpg',
                    filename: 'YelpCamp/zzrhpcm3qsewwner6xcy'
                }
            ],
            description: 'LOREMEO ERSER',
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})