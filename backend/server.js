import express, { response } from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import { AImodel } from "./controllers/geminiAi.js"
import cors from "cors"
import bodyParser from "body-parser"
import { stat } from "fs"

const app = express()
const httpserver = createServer(app)
app.use(express.json());
app.use(cors({ origin: true }));

const all_products = {
    "products": [

        {
            "id": 1,
            "name": "Portable Pill Organizer",
            "description": "A compact pill organizer with compartments for each day of the week. Helps elderly people keep track of daily medications.",
            "price": 1200.00,
            "ratingAverage": 4.9,
            "ratingCount": 500,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fportable%20pill.jpg?alt=media&token=f454f9f1-c812-48e5-b234-be43345e821c"
        },
        {
            "id": 2,
            "name": "Adjustable Walking Cane with LED Light",
            "description": "An ergonomic walking cane with an adjustable height feature and built-in LED light for night-time walks or indoor use.",
            "price": 3000.00,
            "ratingAverage": 4.7,
            "ratingCount": 320,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fled%20walking.jpg?alt=media&token=f37f04fa-ec61-4610-998d-7d80a3df8cea"
        },
        {
            "id": 3,
            "name": "Electric Heated Blanket",
            "description": "A soft electric blanket with adjustable heat settings for providing warmth and comfort during cold weather.",
            "price": 5000.00,
            "ratingAverage": 4.6,
            "ratingCount": 450,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Felectric%20blanket.jpeg?alt=media&token=8a0ea85c-f0d1-4a9f-a883-0ba330f4fb34"
        },
        {
            "id": 4,
            "name": "Grabber Reacher Tool",
            "description": "A lightweight reacher tool designed to help elderly individuals grab items from hard-to-reach places without bending.",
            "price": 1500.00,
            "ratingAverage": 4.8,
            "ratingCount": 600,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fgrabber_reacher.jpg?alt=media&token=868eb908-a6c2-4e9f-9122-fdfc32644104"
        },
        {
            "id": 5,
            "name": "Shower Chair with Backrest",
            "description": "A sturdy shower chair with a backrest for elderly individuals who need extra support while bathing.",
            "price": 2500.00,
            "ratingAverage": 4.9,
            "ratingCount": 350,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fshower_chair.jpg?alt=media&token=1aff6936-cf66-4451-8c99-e6ba9dc7ef32"
        },
        {
            "id": 6,
            "name": "Automatic Blood Pressure Monitor",
            "description": "A digital blood pressure monitor that provides easy and accurate readings. Designed for elderly individuals to monitor their health.",
            "price": 4000.00,
            "ratingAverage": 4.7,
            "ratingCount": 420,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fblood_pressure.jpg?alt=media&token=98e71497-b577-41d4-92c1-f0c6e18ee379"
        },
        {
            "id": 7,
            "name": "Handheld Magnifying Glass with LED Light",
            "description": "A magnifying glass with LED lights for enhanced visibility, ideal for reading small print or performing close-up tasks.",
            "price": 1100.00,
            "ratingAverage": 4.9,
            "ratingCount": 510,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fmagnifying.jpeg?alt=media&token=af082188-bb1b-43ee-b8dd-5995b27930f4"
        },
        {
            "id": 8,
            "name": "Non-Slip Bath Mat",
            "description": "A soft, non-slip bath mat designed to prevent slips and falls in the bathroom. Provides extra safety for elderly individuals while bathing.",
            "price": 1000.00,
            "ratingAverage": 4.8,
            "ratingCount": 280,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fnon_slip.jpg?alt=media&token=989487cb-8455-4b4d-8f43-80b03d1f9e4c"
        },
        {
            "id": 9,
            "name": "Memory Foam Slippers with Arch Support",
            "description": "Comfortable memory foam slippers with built-in arch support, providing relief for elderly individuals with foot pain.",
            "price": 1800.00,
            "ratingAverage": 4.8,
            "ratingCount": 390,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Ffoam%20slipper.jpeg?alt=media&token=47b6f42e-a6d1-40b2-a7ce-2481badb41ac"
        },
        {
            "id": 10,
            "name": "Bedside Adjustable Overbed Table",
            "description": "An adjustable overbed table that allows elderly individuals to comfortably eat or work while in bed.",
            "price": 3500.00,
            "ratingAverage": 4.8,
            "ratingCount": 460,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fbedside_table.jpg?alt=media&token=85e1694e-007e-41e1-8067-6b6cf8e761c9"
        }


    ]
}



const cart = {
    "cart_products": [
        {
            "id": 5,
            "name": "Shower Chair with Backrest",
            "description": "A sturdy shower chair with a backrest for elderly individuals who need extra support while bathing.",
            "price": 2500.00,
            "ratingAverage": 4.9,
            "ratingCount": 350,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fshower_chair.jpg?alt=media&token=1aff6936-cf66-4451-8c99-e6ba9dc7ef32"
        },
    ]
}

const wishlist = {
    "wishlist_products": [
        {
            "id": 4,
            "name": "Grabber Reacher Tool",
            "description": "A lightweight reacher tool designed to help elderly individuals grab items from hard-to-reach places without bending.",
            "price": 1500.00,
            "ratingAverage": 4.8,
            "ratingCount": 600,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fgrabber_reacher.jpg?alt=media&token=868eb908-a6c2-4e9f-9122-fdfc32644104"
        },
    ]
}

const profile = {
    "name": "Aryan Maurya",
    "contact": "9967855432",
    "gender": "Male",
    "address": "Wadala East, Mumbai-400037",
    "email": "aryan@gmail.com",
    "previous_orders": [
        {
            "id": 10,
            "name": "Bedside Adjustable Overbed Table",
            "description": "An adjustable overbed table that allows elderly individuals to comfortably eat or work while in bed.",
            "price": 3500.00,
            "ratingAverage": 4.8,
            "ratingCount": 460,
            "imgUrl": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fbedside_table.jpg?alt=media&token=85e1694e-007e-41e1-8067-6b6cf8e761c9"
        }
    ]
}

const todo = {
    "todo": [
        {
            "id": "1",
            "title": "Complete React project",
            "status": true
        },
        {
            "id": "2",
            "title": "Review code",
            "status": false
        },
    ]
}

const medication = {
    "medication": [
        {
            "id": "1",
            "name": "Aspirin",
            "reminder_time1": "08:00 AM",
            "reminder_time2": false,
            "frequency": "1"
        },
        {
            "id": "1",
            "name": "Metformin",
            "reminder_time1": "08:00 AM",
            "reminder_time2": "08:00 pM",
            "frequency": "2"
        },

    ]
}

const upcoming_appointments = {
    "upcoming_appointments": [
        {
            "id": "1",
            "doctor_name": "Dr. Smith",
            "date": "2024-10-05",
            "time": "10:00 AM"
        }
    ]
}

const doctor = {
    "doctor": [
        {
            "id": 1,
            "image": "https://via.placeholder.com/150",
            "name": "Dr. Ashley Thompson",
            "description": "A compassionate pediatrician with over 10 years of experience. Dr. Thompson is dedicated to providing comprehensive care for children and ensuring their physical and emotional well-being.",
            "specialty": "Pediatrician",
            "contact": "+91 9819505196",
            "email": "ashley.thompson@gmail.com"
        },
        {
            "id": 2,
            "image": "https://via.placeholder.com/150",
            "name": "Dr. John Smith",
            "description": "An experienced cardiologist who specializes in diagnosing and treating heart conditions. Dr. Smith is known for his patient-focused approach and advanced cardiac care techniques.",
            "specialty": "Cardiologist",
            "contact": "+91 9819505197",
            "email": "john.smith@gmail.com"
        },
        {
            "id": 3,
            "image": "https://via.placeholder.com/150",
            "name": "Dr. Sarah Johnson",
            "description": "Dr. Johnson is a leading neurologist with expertise in treating complex neurological disorders, including epilepsy and Parkinson's disease. She is known for her innovative treatment methods.",
            "specialty": "Neurologist",
            "contact": "+91 9819505198",
            "email": "sarah.johnson@gmail.com"
        },
        {
            "id": 4,
            "image": "https://via.placeholder.com/150",
            "name": "Dr. Robert Brown",
            "description": "A well-respected orthopedic surgeon specializing in joint replacement and minimally invasive surgical techniques. Dr. Brown has over 15 years of experience helping patients recover from injuries.",
            "specialty": "Orthopedic Surgeon",
            "contact": "+91 9819505199",
            "email": "robert.brown@gmail.com"
        },
        {
            "id": 5,
            "image": "https://via.placeholder.com/150",
            "name": "Dr. Emily Davis",
            "description": "With a background in internal medicine, Dr. Davis provides primary care and chronic disease management. She focuses on personalized treatment plans and preventive healthcare.",
            "specialty": "Internal Medicine",
            "contact": "+91 9819505200",
            "email": "emily.davis@gmail.com"
        },
        {
            "id": 6,
            "image": "https://via.placeholder.com/150",
            "name": "Dr. Michael Wilson",
            "description": "A well-known pediatrician, Dr. Wilson has extensive experience in child health care, ranging from routine checkups to the treatment of childhood diseases.",
            "specialty": "Pediatrician",
            "contact": "+91 9819505201",
            "email": "michael.wilson@gmail.com"
        },
        {
            "id": 7,
            "image": "https://via.placeholder.com/150",
            "name": "Dr. Jessica Taylor",
            "description": "Dr. Taylor is a renowned dermatologist specializing in treating skin disorders and performing cosmetic dermatology procedures. She is highly regarded for her patient-centered care.",
            "specialty": "Dermatologist",
            "contact": "+91 9819505202",
            "email": "jessica.taylor@gmail.com"
        },
        {
            "id": 8,
            "image": "https://via.placeholder.com/150",
            "name": "Dr. David Anderson",
            "description": "A leading expert in emergency medicine, Dr. Anderson is known for his ability to handle critical care situations with precision and care. He has over 20 years of experience.",
            "specialty": "Emergency Medicine",
            "contact": "+91 9819505203",
            "email": "david.anderson@gmail.com"
        },
        {
            "id": 9,
            "image": "https://via.placeholder.com/150",
            "name": "Dr. Linda Martinez",
            "description": "Dr. Martinez is an expert gynecologist, offering both preventive and curative care. She specializes in women’s health and has a particular focus on reproductive health issues.",
            "specialty": "Gynecologist",
            "contact": "+91 9819505204",
            "email": "linda.martinez@gmail.com"
        },
        {
            "id": 10,
            "image": "https://via.placeholder.com/150",
            "name": "Dr. Thomas Garcia",
            "description": "A highly experienced endocrinologist, Dr. Garcia is known for his work in managing diabetes and hormonal disorders. He is dedicated to providing personalized care for his patients.",
            "specialty": "Endocrinologist",
            "contact": "+91 9819505205",
            "email": "thomas.garcia@gmail.com"
        }
    ]
}

const caregivers = {
    "caregiver": [{
        "id": 1,
        "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile12.jpg?alt=media&token=2bcedbdd-3e34-423b-a647-4e7ed7d31887",
        "name": "Emily Davis",
        "description": "A passionate nurse experienced in post-operative care, providing critical support to patients recovering from surgery. My focus is on ensuring a smooth recovery process through personalized care and attention.",
        "age": 28,
        "contact": "+91 9819505200",
        "email": "emily.davis@gmail.com",
        "experienceDescription": "Emily has 3 years of experience in post-operative nursing, helping patients recover swiftly and safely while providing compassionate care.",
        "experience": "3",
        "chargesPerDay": "900"
    },
    {
        "id": 2,
        "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile7.jpg?alt=media&token=a9fc72b6-b980-481f-906c-4cd8ae14e7d7",
        "name": "Michael Wilson",
        "description": "A dedicated caregiver focusing on pediatric health education and wellness. I work closely with families to create a supportive environment for children's health and growth.",
        "age": 38,
        "contact": "+91 9819505201",
        "email": "michael.wilson@gmail.com",
        "experienceDescription": "With 7 years of experience in pediatric health, Michael has developed extensive expertise in educating families and promoting healthy lifestyles for children.",
        "experience": "7",
        "chargesPerDay": "1300"
    },
    {
        "id": 3,
        "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile2.jpg?alt=media&token=6d90025a-fcea-40c3-89fa-f5c7cad83938",
        "name": "Jessica Taylor",
        "description": "A compassionate caregiver with experience in rehabilitation and physical therapy. I focus on helping clients regain their independence through customized recovery plans.",
        "age": 30,
        "contact": "+91 9819505202",
        "email": "jessica.taylor@gmail.com",
        "experienceDescription": "Jessica has 5 years of experience in rehabilitation services, helping clients recover from injuries and surgeries with personalized therapy plans.",
        "experience": "5",
        "chargesPerDay": "1000"
    },
    {
        "id": 4,
        "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile6.jpg?alt=media&token=286de518-1674-4ff0-a00d-5f2a781fc5b5",
        "name": "David Anderson",
        "description": "An expert in critical care and emergency nursing, dedicated to providing the highest level of care to patients in life-threatening situations.",
        "age": 50,
        "contact": "+91 9819505203",
        "email": "david.anderson@gmail.com",
        "experienceDescription": "With 12 years of experience in emergency care, David has a proven track record of successfully managing critical health situations and stabilizing patients.",
        "experience": "12",
        "chargesPerDay": "2200"
    },
    {
        "id": 5,
        "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile4.jpg?alt=media&token=6e7be363-7c05-4d5e-9d66-628bb7612c30",
        "name": "Ashley Thompson",
        "description": "An experienced pediatrician dedicated to providing comprehensive care for children. With a focus on preventative health, I ensure that each child receives personalized attention tailored to their unique needs.",
        "age": 33,
        "contact": "+91 9819505196",
        "email": "ashley.thompson@gmail.com",
        "experienceDescription": "With over 4 years of experience in pediatric care, Dr. Ashley has become a trusted name for many families.",
        "experience": "4",
        "chargesPerDay": "1100"
    },
    {
        "id": 6,
        "image": "https://firebasestorage.googleapis.com/v0/b/minithon-7a420.appspot.com/o/codestorm%2Fcaretaker%2Fcaretaker_profile9.jpg?alt=media&token=e29cf49b-3999-45da-a44e-d4c506439f3d",
        "name": "Nurse John Smith",
        "description": "A skilled nurse specializing in elder care, with a compassionate approach to daily health management. I am committed to improving the quality of life for my clients by providing attentive and personalized care.",
        "age": 40,
        "contact": "+91 9819505197",
        "email": "john.smith@gmail.com",
        "experienceDescription": "John has over 8 years of experience in geriatric nursing, managing chronic illnesses and providing emotional support to patients and their families.",
        "experience": "8",
        "chargesPerDay": "1500"
    },]
}

const hired_caregiver = {
    caregiver : []
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
                text: `You are a personal web assistant for a caretaker platform for elderly people. There are seven pages available on the website: the home page, cart page, wishlist page, dashboard, community page, caregiver page, doctors page, and connect page. When the user asks to navigate to or open a page, map their input to the closest matching page. If the user explicitly mentions the word "page," slice that part out and do not include it in the response. Your command should simply be "open LOCATION NAME," without including the word "page." For example, if the user says "open home page," your response should be "open home."

Users can browse products available at the marketplace, search for caregivers and doctors on the platform, hire caregivers, and book appointments with doctors.

When a user wants to book a caregiver, emit the command HIRE "caregiver_id" directly without asking any follow-up questions.

For booking appointments, ask follow-up questions regarding the booking date and time. Once the user answers all the questions, respond in JSON in the following format:
{
  "operation": "appointment",
  "id": "",
  "doctor_name": "",
  "date": "",
  "time": ""
}
  Users can also add a to-do. When the user asks to add a to-do, emit the command ADD_TODO "todo_title." Users can provide information about their medication as well. Ask follow-up questions if required for frequency and inform them that the default reminder time will be set. Once the user answers all the questions, respond in JSON in the following format:
    {
  "operation": "medication",
  "medicine_name": "",
  "frequency": ""
}
Users can search for products, doctors, and caregivers. When the user searches for products or caregivers, respond in the following JSON format:
for products: 
{
  "data-type": "JSON",
  "search_result": [{product1}, {product2}, ...],
  "summary": ""
}
  for caregivers: 
  {
  "data-type": "JSON",
  "search_result": [{caregiver1}, {caregiver2}, ...],
  "summary": ""
}
  for doctors: 
  {
  "data-type": "JSON",
  "search_result": [{doctor1}, {doctor2}, ...],
  "summary": ""
}

  Whenever you receive the word "emergency" twice, emit "SOS."

Do not use any regular expressions or newline characters (\n) in your responses. When an appointment or medication is booked, respond with a JSON object (not in array format) and prefix your response with "json."

Strictly follow this convention throughout all interactions.

Ask follow-up questions when required to gather all necessary information for caregiving, medical appointments, to-dos, and medication management. Ensure all interactions are concise and tailored to the user's needs.

`
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
        role: "user",
        parts: [
            { text: JSON.stringify(todo) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(medication) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(upcoming_appointments) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(caregivers) },
        ],
    },
    {
        role: "user",
        parts: [
            { text: JSON.stringify(doctor) },
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

app.get("/todo", (req, res) => {
    console.log("all todos", todo)
    res.status(200).send(todo)
})

app.get("/medications", (req, res) => {
    console.log("all medications", medication)
    res.status(200).send(medication)
})

app.get("/upcoming_appointments", (req, res) => {
    console.log("upcoming appointments", upcoming_appointments)
    res.status(200).send(upcoming_appointments)
})

app.get("/care_giver", (req, res) => {
    console.log("care giver")
    res.status(200).send(caregivers)
})

app.get("/doctor", (req, res) => {
    console.log("doctor")
    res.status(200).send(doctor)
})

app.post("/add_todo", (req, res) => {
    console.log("adding todo", req.body)
    let id = todo.todo.length + 1
    todo.todo.push({ id, title: req.body.title, status: false })
    console.log("todo added successfully", todo)
    res.status(200).send({ status: true, message: `${req.body.title} added successfull in your to do`  })
})

app.post("/hire_caregiver", (req, res)=>{
    console.log("Hiring caregiver", req.body.care_giver_id)
    const id = req.body.care_giver_id
    const caregiver = caregivers.caregiver.find(caregiver => caregiver.id === id);
    if (caregiver) {
        console.log(caregiver);
        hired_caregiver.caregiver.push(caregiver)
        console.log(hired_caregiver)
        res.status(200).send(`${caregiver.name} is hired`)
    } else {
        return "Caregiver not found.";
        res.status(400).send("Caregiver does not exist")
    }
})

app.post("/add_medication", (req, res) => {
    console.log("adding medication", req.body)
    let reminder_time1 = "10 AM"
    let reminder_time2 = "10 PM" 
    let id = medication.medication.length + 1
    const { name, frequency } = req.body
    if(frequency == 1){
        medication.medication.push({ id, name, reminder_time1, reminder_time2:false,  frequency })
    }
    else{
        medication.medication.push({ id, name, reminder_time1, reminder_time2, frequency })
    }
    
    console.log("medication added successfully", medication)
    res.status(200).send({ status: true, message: "medication added successfully" })
})

app.post("/add_appointment", (req, res) => {
    console.log("adding appointment", req.body)
    const { doctor_name, date, time } = req.body
    let id = upcoming_appointments.upcoming_appointments.length + 1
    upcoming_appointments.upcoming_appointments.push({ id, doctor_name, date, time })
    console.log("apointment added successfully", upcoming_appointments)
    res.status(200).send({ status: true, message: `Your appointment added successfully with ${doctor_name} on ${date} at ${time}` })
    console.log(upcoming_appointments)
})


httpserver.listen(3000, () => {
    console.log("server is running on port 3000")
})

export { io }
