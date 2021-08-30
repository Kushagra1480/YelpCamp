const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log('Database connected!!!')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; ++i) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground ({
            author: '6123eb7b2dc6fa19d42cd962',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            price: price,
            geometry: { 
                type: "Point", 
                coordinates : [ -113.1331, 47.0202 ] 
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dt4ehs2jv/image/upload/v1630075439/YelpCamp/qekowutava2qu3kvc0xn.jpg", 
                    filename: "YelpCamp/qekowutava2qu3kvc0xn" 
                },
                { 
                    url: "https://res.cloudinary.com/dt4ehs2jv/image/upload/v1630075441/YelpCamp/lh3oocsqz7trzxj1irhr.jpg", 
                    filename : "YelpCamp/lh3oocsqz7trzxj1irhr" 
                } 
            ]
            
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})