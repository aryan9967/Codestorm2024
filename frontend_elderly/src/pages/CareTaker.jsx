import CareTakerCard from "@/components/CareTakerCard";
import axios from "axios";
import { useState } from "react";
import caretakerprofile1 from '../assets/caretaker_profile1.jpg'
import Navbar from "@/components/Navbar";

const CareTaker = () => {
    const [careTakers, setCareTakers] = useState([
        {
            "image": "https://via.placeholder.com/150",
            "name": "Dr. Ashley Thompson",
            "description": "An experienced pediatrician dedicated to providing comprehensive care for children. With a focus on preventative health, I ensure that each child receives personalized attention tailored to their unique needs. I have extensive knowledge in child nutrition and development, allowing me to guide parents in fostering healthy lifestyles for their children.",
            "age": 33,
            "contact": "+91 9819505196",
            "email": "ashley.thompson@gmail.com",
            "experienceDescription": "With over 4 years of experience in pediatric care, Dr. Ashley has become a trusted name for many families. She is known for her warm approach and professional expertise.",
            "experience": "4",
            "chargesPerDay": "1100"
        },
        {
            "image": "https://via.placeholder.com/150",
            "name": "Nurse John Smith",
            "description": "A skilled nurse specializing in elder care, with a compassionate approach to daily health management. I am committed to improving the quality of life for my clients by providing attentive and personalized care.",
            "age": 40,
            "contact": "+91 9819505197",
            "email": "john.smith@gmail.com",
            "experienceDescription": "John has over 8 years of experience in geriatric nursing, managing chronic illnesses and providing emotional support to patients and their families.",
            "experience": "8",
            "chargesPerDay": "1500"
        },
        {
            "image": "https://via.placeholder.com/150",
            "name": "Sarah Johnson",
            "description": "An expert in mental health, dedicated to providing counseling and support for elderly individuals facing emotional challenges. I believe in a holistic approach that combines therapeutic techniques with compassionate care.",
            "age": 35,
            "contact": "+91 9819505198",
            "email": "sarah.johnson@gmail.com",
            "experienceDescription": "Sarah has been practicing mental health support for over 6 years, working with elderly patients to manage anxiety, depression, and other emotional challenges.",
            "experience": "6",
            "chargesPerDay": "1200"
        },
        {
            "image": "https://via.placeholder.com/150",
            "name": "Dr. Robert Brown",
            "description": "A specialist in geriatrics, I focus on improving the health and well-being of older adults through comprehensive medical care and personalized treatment plans.",
            "age": 45,
            "contact": "+91 9819505199",
            "email": "robert.brown@gmail.com",
            "experienceDescription": "With 10 years of experience in geriatric care, Dr. Brown has provided invaluable care to hundreds of elderly patients, helping them maintain a high quality of life.",
            "experience": "10",
            "chargesPerDay": "2000"
        },
        {
            "image": "https://via.placeholder.com/150",
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
            "image": "https://via.placeholder.com/150",
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
            "image": "https://via.placeholder.com/150",
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
            "image": "https://via.placeholder.com/150",
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
            "image": "https://via.placeholder.com/150",
            "name": "Linda Martinez",
            "description": "A loving nurse with a focus on hospice care, providing comfort and support to terminally ill patients and their families during difficult times.",
            "age": 42,
            "contact": "+91 9819505204",
            "email": "linda.martinez@gmail.com",
            "experienceDescription": "With over 9 years of experience in hospice care, Linda has helped many families navigate end-of-life challenges with grace and compassion.",
            "experience": "9",
            "chargesPerDay": "1600"
        },
        {
            "image": "https://via.placeholder.com/150",
            "name": "Thomas Garcia",
            "description": "A dedicated professional specializing in home care for individuals with disabilities, committed to enhancing their quality of life through personalized support.",
            "age": 36,
            "contact": "+91 9819505205",
            "email": "thomas.garcia@gmail.com",
            "experienceDescription": "Thomas has 5 years of experience providing tailored home care for individuals with disabilities, ensuring their comfort and independence.",
            "experience": "5",
            "chargesPerDay": "1200"
        }
    ]);

    return (

        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="px-4 py-8">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Caretakers</h1>

                {/* Updated responsive grid structure for caretakers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {careTakers.map((caretaker, index) => (
                        <div key={index} className="flex justify-center">
                            <CareTakerCard caretaker={caretaker} />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default CareTaker;
