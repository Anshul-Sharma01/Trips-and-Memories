import axios from "axios";

const AI_API_URL = process.env.AI_API_URL;
const AI_API_KEY = process.env.AI_API_KEY; 


const generateTripStory = async(inputText) => {
    try{
        const response = await axios.post(
            AI_API_URL,
            {
                inputs : inputText
            },
            {
                headers : {
                    Authorization : `Bearer ${AI_API_KEY}`
                },
            }
        );
        return response.data[0].generated_text;
    }catch(err){
        console.error(`Error generating story : ${err}`);
        throw new Error("Failed to generate trip story !!");
    }
}

export { 
    generateTripStory
}