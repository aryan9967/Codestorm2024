import React, { useState } from 'react';
import { Mail, Phone, DollarSign, BriefcaseIcon, Heart } from 'lucide-react';

export default function CareTakerCard({ caretaker }) {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="w-full sm:w-[350px] md:w-[380px] lg:w-[400px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white transform hover:-translate-y-0.5 hover:scale-102 transition-transform duration-300 min-h-[450px]">
            <div className="relative">
                <img className="w-full h-56 object-cover" src={caretaker?.image} alt={caretaker?.name} />
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                </button>
            </div>
            <div className="px-4 pt-3 pb-4">
                <div className="font-bold text-base mb-2">{caretaker?.name}</div>
                <p className="text-gray-700 text-xs mb-2 text-left">{caretaker?.description}</p>
                <p className="text-gray-600 text-xs mb-2 text-left font-semibold">Experience:</p>
                <p className="text-gray-600 text-xs mb-3 text-left pl-2">{caretaker?.experienceDescription}</p>
                <p className="text-gray-600 text-xs mb-3 text-left">Age: {caretaker?.age} years old</p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-blue-500" />
                        <span className="text-gray-600 text-xs">{caretaker?.contact}</span>
                    </div>
                    <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-2 text-blue-500" />
                        <span className="text-gray-600 text-xs">{caretaker?.email}</span>
                    </div>
                    <div className="flex items-center">
                        <BriefcaseIcon className="w-5 h-5 mr-2 text-blue-500" />
                        <span className="text-gray-600 text-xs">{caretaker?.experience} years experience</span>
                    </div>
                    <div className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-blue-500" />
                        <span className="text-gray-600 text-xs">${caretaker?.chargesPerDay}/day</span>
                    </div>
                </div>

                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors duration-300 transform hover:scale-100">
                    Hire
                </button>
            </div>
        </div>
    );
}
