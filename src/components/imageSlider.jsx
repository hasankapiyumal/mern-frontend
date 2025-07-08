import { useState } from "react";

export default function ImageSlider(props){
    const images =props.images;
    const [activeImage, setActiveImage] = useState(0);
    return (
        <div className="w-full h-full relative">
            <img src={images[activeImage]} alt="Product" className="p-2 w-full aspect-square flex items-center flex-col object-cover rounded-lg" />
            <div className="absolute bottom-2 left-2 flex space-x-2 overflow-hidden">
                {images.map((image, index) => (
                    <button 
                        key={index} 
                        onClick={() => setActiveImage(index)} 
                        className={`w-10 h-10 rounded-lg ${activeImage === index ? 'border-2 border-blue-500' : 'border border-gray-300'}`}
                    >
                        <img src={image} alt={`Thumbnail ${index}`} className="w-full h-full object-cover rounded-lg" />
                    </button>
                ))}
            </div>
        </div>
    )
}