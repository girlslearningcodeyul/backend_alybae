let items = {
    '29384059454': {

        sellerId: 'ksenia',
        price: 200,
        description: "furray like Bill Murray",
        name: "cat",
        forSale: true, //set to false when sold
        itemId: '29384059454',
        imageLocation: 'http://localhost:4000/images/cat1.jpeg'
    },
    '38293817283': {

        sellerId: 'ksenia',
        price: 100,
        description: "also like Bill Murray, but cuter",
        name: "kitten",
        forSale: true, //set to false when sold 
        itemId: '38293817283',
        imageLocation: 'http://localhost:4000/images/kitten1.jpeg'

    },
    '3748372637': {

        sellerId: 'aly',
        price: 4,
        description: "very cold",
        name: "ice cubes",
        forSale: true, //set to false when sold 
        itemId: '3748372637',
        imageLocation: 'http://localhost:4000/images/ice_cube.jpg'
    },
    '4536271829': {

        sellerId: 'aly',
        price: 90000,
        description: "less cold",
        name: "ice cubes shaped like dolphins",
        forSale: true, //set to false when sold 
        itemId: '4536271829',
        imageLocation: 'http://localhost:4000/images/dolphin_icecubes-1.jpg'
    },
    '574839827': {

        sellerId: 'ksenia',
        price: 90,
        description: "so nice, so fresh, so frisky",
        name: "mint",
        forSale: true, //set to false when sold 
        itemId: '574839827',
        imageLocation: 'http://localhost:4000/images/mint.jpg'
    },
    '39896814283': {

        sellerId: 'jordan',
        price: 200,
        description: "All orbits around his ego",
        name: "SunYe",
        forSale: true, //set to false when sold 
        itemId: '39896814283',
        imageLocation: 'http://localhost:4000/images/Kanye-the-Sun.jpg'

    },
    '3256671483': {

        sellerId: 'jordan',
        price: 200,
        description: "Toasted toastie toast toasting toast",
        name: "Toastie Toast",
        forSale: true, //set to false when sold 
        itemId: '3256671483',
        imageLocation: 'http://localhost:4000/images/toast.jpg'

    },
    '3536701753': {

        sellerId: 'jordan',
        price: 732,
        description: "WHOS A GOOD BOI?",
        name: "GoodBoi",
        forSale: true, //set to false when sold 
        itemId: '3536701753',
        imageLocation: 'http://localhost:4000/images/floofDog.jpg',
    }
}
let itemsBought = { 
    'aly': ['3748372637', '4536271829'], 'ksenia': ['574839827'] }

let itemsSold = { 
    'ksenia': ['29384059454', '38293817283'] } 


module.exports = {
    items,
    itemsBought,
    itemsSold
}