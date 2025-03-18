
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
    
    // Here we'd normally use OpenAI or another AI service
    // For now, we'll return predefined responses based on keywords
    let response = '';
    
    if (prompt.toLowerCase().includes('save')) {
      response = "To improve your savings, consider the 50/30/20 rule: Allocate 50% of your income to needs, 30% to wants, and 20% to savings. Set up automatic transfers to your savings account on payday.";
    } else if (prompt.toLowerCase().includes('budget')) {
      response = "Creating a budget starts with tracking your spending for a month. Then categorize expenses into necessities and discretionary spending. Use our budgeting tools to set spending limits for each category.";
    } else if (prompt.toLowerCase().includes('invest')) {
      response = "For beginning investors, consider low-cost index funds. They provide diversification and lower risk compared to individual stocks. Start with small amounts regularly rather than one large investment.";
    } else if (prompt.toLowerCase().includes('debt')) {
      response = "To tackle debt efficiently, focus on high-interest debt first, while making minimum payments on others. Consider the debt avalanche method (highest interest first) or the debt snowball method (smallest balance first).";
    } else {
      response = "I'm your financial advisor assistant. Ask me about saving, budgeting, investing, or debt management for personalized advice.";
    }

    return new Response(JSON.stringify({ response }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
