export default async (req) => {
  if (req.method !== "POST") return new Response("Method Not Allowed", {status:405});
  const key = Netlify.env.get("GEMINI_API_KEY");
  if (!key) return Response.json({error:"AI is not configured yet. Add GEMINI_API_KEY in Netlify environment variables."},{status:503});
  try {
    const {message, history=[]} = await req.json();
    if (!message || typeof message !== "string") return Response.json({error:"Message required"},{status:400});
    const system = `أنت Feminine Mind AI، مساعد توعوي عربي لعلامة Féminine Mind المتخصصة في الوعي الذاتي والعلاقات والتعافي النفسي للمرأة.
أسلوبك: دافئ، واضح، غير حُكمي، عملي، ومبسط علمياً. لا تدّعي أنك معالج نفسي ولا تشخّص اضطرابات. لا تقدّم وعوداً علاجية. لا تستبدل المختصين. عند وجود خطر مباشر أو إساءة شديدة، شجّعي على طلب مساعدة مهنية/طارئة مناسبة دون إعطاء تعليمات مؤذية.
تحدثي بالعربية غالباً وبأسلوب Feminine Mind. استخدمي مفاهيم نفسية مدعومة بالأدلة عندما يكون ذلك مناسباً. تجنبي المصطلحات الغامضة أو الادعاءات الخارقة.`;
    const contents = [
      {role:"user", parts:[{text:system}]},
      ...history.slice(-8).map(x=>({role:x.role==="assistant"?"model":"user",parts:[{text:String(x.text||"")}]})),
      {role:"user", parts:[{text:message}]}
    ];
    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent", {
      method:"POST", headers:{"Content-Type":"application/json","x-goog-api-key":key},
      body:JSON.stringify({contents})
    });
    const data=await r.json();
    if(!r.ok) return Response.json({error:data?.error?.message||"AI request failed"},{status:502});
    const text=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("")||"تعذر إنشاء الرد الآن.";
    return Response.json({text});
  } catch(e){ return Response.json({error:"Server error"},{status:500}); }
};
