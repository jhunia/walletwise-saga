
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
    const { email, subject, message, type } = await req.json();

    // In a real implementation, you would use a service like SendGrid, AWS SES, or Resend
    // to send actual emails. For now, we'll just log the request and return a success message.
    
    console.log(`Email notification request:
      To: ${email}
      Subject: ${subject}
      Message: ${message}
      Type: ${type}
    `);

    // Mock successful email sending
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Notification sent successfully" 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
