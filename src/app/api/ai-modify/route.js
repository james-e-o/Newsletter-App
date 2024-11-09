import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.XAPI_KEY,
  baseURL: "https://api.x.ai/v1",
});

export async function POST(request) {
    const text = request.body.text
    try {
        const completion = await openai.chat.completions.create({
            model: "grok-beta",
            messages: [
              {
                role: "user",
                content: `Modify the following text: ${text}`,
              },
            ],
          })
          const modifiedText = completion.choices[0].message
          new Response({modifiedText})
    }catch(error){
        console.error("Error:", error);
        res.status(500).json({ error: "Error generating modified text" });
    }
    ;
   
}

// curl https://api.x.ai/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer xai-4Wvxs6aGqMe8aGKWF7ivjjZYsGOkRhmMuZw07sIqYk74kG4M4u2WbQbeFpxR04FHrK9S9PFMLqqKtAdq" -d '{
//     "messages": [
//       {
//         "role": "system",
//         "content": "You are a test assistant."
//       },
//       {
//         "role": "user",
//         "content": "Testing. Just say hi and hello world and nothing else."
//       }
//     ],
//     "model": "grok-beta",
//     "stream": false,
//     "temperature": 0
//   }'