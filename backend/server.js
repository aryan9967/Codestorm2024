import express, { response } from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { v4 as uuidV4 } from 'uuid';
import { AImodel } from "./controllers/geminiAi.js"
import cors from "cors"
import bodyParser from "body-parser"

const app = express()
const httpserver = createServer(app)
app.use(express.json());
app.use(cors({ origin: true }));

const all_products = {
    "products": [
        {
            "id": 1,
            "name": "Smart Indoor Herb Garden Kit",
            "description": "An indoor garden kit with automated watering and LED grow lights. Ideal for growing herbs like basil, mint, and parsley in small spaces.",
            "price": 4500.00,
            "ratingAverage": 4.8,
            "ratingCount": 250,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/download.jpeg?alt=media&token=b044564e-0e4b-4d8b-b6bd-d1c78933de65"
        },
        {
            "id": 2,
            "name": "Vertical Wall Planter",
            "description": "A space-saving vertical planter for small urban spaces. Perfect for growing herbs, flowers, and vegetables on a balcony or terrace.",
            "price": 2800.00,
            "ratingAverage": 4.6,
            "ratingCount": 180,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/wallplanter.jpg?alt=media&token=ba20cd04-bfbe-4192-979f-8a8728e404a6"
        },
        {
            "id": 3,
            "name": "Self-Watering Raised Bed",
            "description": "A raised garden bed with a built-in self-watering system. Keeps soil hydrated and is ideal for growing vegetables and flowers in urban gardens.",
            "price": 9600.00,
            "ratingAverage": 4.9,
            "ratingCount": 320,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/self%20watering.jpeg?alt=media&token=3e056af7-b3f7-42db-b7de-af9fdefe09b9"
        },
        {
            "id": 4,
            "name": "Compost Bin with Odor Control",
            "description": "A compact compost bin designed for urban homes. Includes a filter for odor control and makes it easy to recycle organic waste.",
            "price": 3200.00,
            "ratingAverage": 4.7,
            "ratingCount": 150,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/aqaonic%20fish%20tank.jpg?alt=media&token=9d6f5275-a665-4035-acd0-29778835aeb7"
        },
        {
            "id": 5,
            "name": "Hydroponic Growing System",
            "description": "A complete hydroponic growing system for urban farmers. Allows for soil-free growing of leafy greens, herbs, and vegetables indoors.",
            "price": 20000.00,
            "ratingAverage": 4.8,
            "ratingCount": 400,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/hydroponic.jpg?alt=media&token=96fe5061-2654-46e4-a263-a3b6be2d353f"
        },
        {
            "id": 6,
            "name": "LED Grow Light",
            "description": "A full-spectrum LED grow light designed for urban indoor farming. Provides optimal light for growing plants in low-light environments.",
            "price": 6400.00,
            "ratingAverage": 4.7,
            "ratingCount": 220,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/ledgrow.jpg?alt=media&token=f9a28c73-34e3-43ce-9a96-339aa2a4ca73"
        },
        {
            "id": 7,
            "name": "Urban Beekeeping Starter Kit",
            "description": "A beginner's kit for urban beekeeping. Includes a hive, beekeeping suit, smoker, and essential tools for maintaining a healthy bee colony.",
            "price": 12000.00,
            "ratingAverage": 4.9,
            "ratingCount": 100,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/urbanBeeking.jpg?alt=media&token=f4cfa64c-2c6c-4703-a2b2-206b0fb557b3"
        },
        {
            "id": 8,
            "name": "Worm Composting Bin",
            "description": "A compact worm composting bin for urban environments. Turns kitchen waste into nutrient-rich compost for gardens and plants.",
            "price": 4800.00,
            "ratingAverage": 4.5,
            "ratingCount": 170,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/wormcomposting.png?alt=media&token=e7453182-99b1-445b-8fa1-fa8a05ae7e0c"
        },
        {
            "id": 9,
            "name": "Aquaponic Fish Tank Garden",
            "description": "An aquaponic system that combines a fish tank with a small garden on top. Uses fish waste to fertilize plants, creating a self-sustaining ecosystem.",
            "price": 14400.00,
            "ratingAverage": 4.8,
            "ratingCount": 90,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/aqaonic%20fish%20tank.jpg?alt=media&token=9d6f5275-a665-4035-acd0-29778835aeb7"
        },
        {
            "id": 10,
            "name": "Drip Irrigation Kit",
            "description": "An efficient drip irrigation system designed for urban gardens. Conserves water and evenly waters plants with minimal effort.",
            "price": 2000.00,
            "ratingAverage": 4.6,
            "ratingCount": 210,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/dripIrrigation.jpg?alt=media&token=d90bfc88-9afe-4f77-a2c8-6ba0be4dba5c"
        }
    ]
}



const cart = {
    "cart_products": [
        {
            "id": 1,
            "name": "Smart Indoor Herb Garden Kit",
            "description": "An indoor garden kit with automated watering and LED grow lights. Ideal for growing herbs like basil, mint, and parsley in small spaces.",
            "price": 4500.00,
            "ratingAverage": 4.8,
            "ratingCount": 250,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/download.jpeg?alt=media&token=b044564e-0e4b-4d8b-b6bd-d1c78933de65"
        },
        {
            "id": 2,
            "name": "Vertical Wall Planter",
            "description": "A space-saving vertical planter for small urban spaces. Perfect for growing herbs, flowers, and vegetables on a balcony or terrace.",
            "price": 2800.00,
            "ratingAverage": 4.6,
            "ratingCount": 180,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/wallplanter.jpg?alt=media&token=ba20cd04-bfbe-4192-979f-8a8728e404a6"
        }
    ]
}

const wishlist = {
    "wishlist_products": [
        {
            "id": 3,
            "name": "Self-Watering Raised Bed",
            "description": "A raised garden bed with a built-in self-watering system. Keeps soil hydrated and is ideal for growing vegetables and flowers in urban gardens.",
            "price": 9600.00,
            "ratingAverage": 4.9,
            "ratingCount": 320,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/self%20watering.jpeg?alt=media&token=3e056af7-b3f7-42db-b7de-af9fdefe09b9"
        },
        {
            "id": 4,
            "name": "Compost Bin with Odor Control",
            "description": "A compact compost bin designed for urban homes. Includes a filter for odor control and makes it easy to recycle organic waste.",
            "price": 3200.00,
            "ratingAverage": 4.7,
            "ratingCount": 150,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/aqaonic%20fish%20tank.jpg?alt=media&token=9d6f5275-a665-4035-acd0-29778835aeb7"
        }
    ]
}

const profile = {
    "name": "Aryan Maurya",
    "contact": "9967855432",
    "gender": "Male",
    "address": "Wadala East, Mumbai-400037",
    "email": "aryan@gmail.com",
    "previous_orders": [{
        "id": 5,
        "name": "Hydroponic Growing System",
        "description": "A complete hydroponic growing system for urban farmers. Allows for soil-free growing of leafy greens, herbs, and vegetables indoors.",
        "price": 20000.00,
        "ratingAverage": 4.8,
        "ratingCount": 400,
        "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/hydroponic.jpg?alt=media&token=96fe5061-2654-46e4-a263-a3b6be2d353f"
    },
    {
        "id": 6,
        "name": "LED Grow Light",
        "description": "A full-spectrum LED grow light designed for urban indoor farming. Provides optimal light for growing plants in low-light environments.",
        "price": 6400.00,
        "ratingAverage": 4.7,
        "ratingCount": 220,
        "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/ledgrow.jpg?alt=media&token=f9a28c73-34e3-43ce-9a96-339aa2a4ca73"
    }]
}

function searchbyKeyword(keyword) {
    console.log(all_products)
    const search_list = all_products.products
    const search_result = []
    for (let i = 0; i < search_list.length; i++) {
        // Check if the product name contains the keyword (case-insensitive)
        if (search_list[i].name.toLowerCase().includes(keyword.toLowerCase())) {
            search_result.push(search_list[i]);
        }
    }

    console.log(search_result)
    return search_result

}

const io = new Server(httpserver, {
    cors: {
        origin: "http://localhost:5173"
    }
})

io.use((socket, next) => {
    const user_name = socket.handshake.auth.user_name;
    console.log(user_name)
    socket.user_name = user_name
    next()
});


io.on('connection', (socket) => {
    console.log(socket.id, socket.user_name)

    const actual_history = [{
        role: "user",
        parts: [
            {
                text: `You are a personal farming assistant named GrowSmart, and your responses should be plain text, free of any emojis. If the user asks to go to or open a particular location, reply with "open LOCATION NAME," substituting "LOCATION NAME" with the name of the location they want to visit. For commands related to ordering or adding an item to the wishlist, respond with "order PRODUCT NAME," "wishlist PRODUCT NAME," or "cart PRODUCT NAME," depending on whether the user wants to place an order, add the item to their wishlist, or add the item to their cart. Do not add any regular expressions in the response. Respond in plain text.

There are seven pages available on the website: the home page, cart page, wishlist page, profile page, dashboard, community page, and education page. When the user asks to navigate to or open a page, try to map their input to the closest matching page. If the user explicitly mentions the word "page," slice that part out, and do not include it in the response. Your command should simply be "open LOCATION NAME," without including the word "page." For example, if the user says "open home page," your response should be "open home."

If the user inquires about a particular product, initially provide them with the name, rating, and price of the product, making sure to include the price in Indian currency (INR). If the user expresses interest, follow up with additional details such as the description of the product. Ensure your interactions are concise and ask questions to the user, replying accordingly based on their responses.

When the user wants to search for a product, look for matching products from the given list of products and generate the response in JSON format as follows:
{
  "data-type": "JSON",
  "search_result": [{product1}, {product2}, ...],
  "summary": ""
}
 The summary should be based on the products in the search result to give the user a quick overview. Ensure that the response strictly adheres to this JSON format, with no additional comments, text, or formatting included.

Additionally, as a farming assistant, you will help the user buy farming products from the marketplace and assist with any farming-related questions they might have. Be prepared to provide useful information regarding crop management, pest control, soil health
, irrigation, and other agricultural topics when asked. Keep responses concise and tailored to the user's farming needs.`
            },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(profile) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(all_products) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(cart) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(wishlist) },
        ],
    },
    {
        role: "model",
        parts: [
            { text: "Hello, I am your personal shopping assistant. How may I assist you?" },
        ],
    },]
    const chatSession = AImodel.startChat({

        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: actual_history
    });

    socket.on('prompt', async (response) => {
        console.log(response)

        actual_history.push({
            role: "user",
            parts: [
                { text: `${response}` }
            ]
        })

        try {
            const result = await chatSession.sendMessage(response);
            const Airesponse = result.response.text();

            if (Airesponse) {
                actual_history.push({
                    role: "model",
                    parts: [
                        { text: `${Airesponse}` }
                    ]
                })
            }
            socket.emit("response", Airesponse)

        }
        catch (err) {
            socket.emit("error", "some internal error occured")
            console.error(err)
        }

    })
})

app.use(cors())
app.use(bodyParser.json())
app.get("/all_products", (req, res) => {
    res.status(200).send(all_products)
})

app.get("/profile", (req, res) => {
    res.status(200).send(profile)
})

app.get("/cart", (req, res) => {
    res.status(200).send(cart)
})

app.get("/wishlist", (req, res) => {
    res.status(200).send(wishlist)
})

app.post("/add_to_cart", (req, res) => {
    const keyword = req.body.product_name
    console.log(keyword)
    const str_keyword = String(keyword)
    const search_list = all_products.products

    let search_result
    for (let i = 0; i < search_list.length; i++) {
        console.log("product ", search_list[i])
        // Check if the product name contains the keyword (case-insensitive)

        if (search_list[i].name.toLowerCase() == str_keyword.toLowerCase()) {
            search_result = search_list[i];
            break
        }
    }
    console.log("search result", search_result)
    const isInCart = cart.cart_products.some(product => product.id === search_result.id);

    if (!isInCart) {
        // Add the product to the cart if it is not already present
        cart.cart_products.push(search_result);
        res.status(200).send(`${search_result.name} added successfully to cart`);
    } else {
        // Send a response indicating that the product is already in the cart
        res.status(200).send(`${search_result.name} is already present in cart`);
    }

})

app.post("/add_to_wishlist", (req, res) => {
    const keyword = req.body.product_name
    console.log(keyword)
    const str_keyword = String(keyword)
    const search_list = all_products.products

    let search_result
    for (let i = 0; i < search_list.length; i++) {
        console.log("product ", search_list[i])
        // Check if the product name contains the keyword (case-insensitive)

        if (search_list[i].name.toLowerCase() == str_keyword.toLowerCase()) {
            search_result = search_list[i];
            break
        }
    }
    console.log("search result", search_result)
    const isInwishlist = wishlist.wishlist_products.some(product => product.id === search_result.id);

    if (!isInwishlist) {
        // Add the product to the cart if it is not already present
        wishlist.wishlist_products.push(search_result);
        res.status(200).send(`${search_result.name} added successfully to wishlist`);
    } else {
        // Send a response indicating that the product is already in the cart
        res.status(200).send(`${search_result.name} is already present in wishlist`);
    }

})



httpserver.listen(3000, () => {
    console.log("server is running on port 3000")
})

export { io }
