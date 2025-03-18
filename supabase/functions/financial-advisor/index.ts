
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Missing required field: prompt" }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Create a system message that specializes this AI in financial advice
    const systemMessage = `
      You are WalletWise AI, a helpful financial advisor assistant.
      You provide personalized financial advice, budgeting tips, and help users understand their finances better.
      You are knowledgeable about personal finance, investing, saving strategies, debt management, and financial planning.
      Always be supportive, encouraging, and practical in your advice.
      Keep responses concise and focused on actionable financial guidance.
    `;
    
    // This is a mock response for now since we don't have the OpenAI API key
    // In a production environment, you would use the OpenAI API here
    const mockResponses = [
      "Based on your spending patterns, I recommend allocating 50% of your income to necessities, 30% to wants, and 20% to savings and debt repayment.",
      "To reach your savings goal faster, consider automating your savings by setting up automatic transfers on payday.",
      "For your investment question, a diversified portfolio with low-cost index funds could be a good long-term strategy.",
      "Looking at your budget, there's an opportunity to reduce spending in the dining category by about 15%. This could free up an additional $120 per month for your emergency fund.",
      "To improve your credit score, focus on making all payments on time and reducing your credit utilization ratio to below 30%."
    ];
    
    // Select a random response from the mock responses
    const randomIndex = Math.floor(Math.random() * mockResponses.length);
    const response = mockResponses[randomIndex];

    console.log("Financial advice query:", prompt);
    console.log("Financial advice response:", response);

    return new Response(
      JSON.stringify({ 
        response: response,
        prompt: prompt
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error in financial-advisor function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
