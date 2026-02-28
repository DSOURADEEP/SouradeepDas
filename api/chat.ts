import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const apiKey = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  console.log('API Key present:', !!apiKey);
  console.log('Available Env Keys:', Object.keys(process.env));

  if (!apiKey) {
    console.error('Gemini API Key is missing in environment variables');
    return res.status(500).json({ message: 'AI API Key is not configured on the server. Please add VITE_GEMINI_API_KEY to your Vercel Environment Variables. (Detected Keys: ' + Object.keys(process.env).join(', ') + ')' });
  }

  const { message, context } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are a professional AI assistant for Souradeep Das's portfolio. 
      Answer questions about him accurately and concisely based on this context: ${JSON.stringify(context)}.
      If the information isn't in the context, be honest but polite.
      
      User Question: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({ text });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ message: 'Error from AI provider: ' + (error.message || 'Unknown error') });
  }
}
