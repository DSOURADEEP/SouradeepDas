import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: any, res: any) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check for various possible naming conventions
  const apiKey = process.env.GEMINI_API_KEY || 
                 process.env.VITE_GEMINI_API_KEY || 
                 process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ 
      message: 'AI API Key is missing. 1. Add GEMINI_API_KEY in Vercel Settings. 2. Go to "Deployments" and click "Redeploy" on your latest build (Variables are only updated on redeploy).' 
    });
  }

  const { message, context } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message is required' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

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
