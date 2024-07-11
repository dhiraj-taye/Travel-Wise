const axios = require('axios');

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY; // Ensure this is correctly set in your environment

async function generateTripPlan(country, city, days) {
  try {
    const prompt = `Plan a trip to ${city}, ${country} for ${days} days.`;
    const gptResponse = await axios.post(
      'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-2.7B',
      {
        inputs: prompt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`,
        },
      }
    );

    console.log('Hugging Face API response:', gptResponse.data);
    return gptResponse.data;
  } catch (error) {
    console.error('Error generating trip plan:', error.message);
    throw error;
  }
}

// Example usage:
generateTripPlan('France', 'Paris', 5)
  .then(result => {
    console.log('Generated Trip Plan:', result);
  })
  .catch(error => {
    console.error('Failed to generate trip plan:', error.message);
  });
