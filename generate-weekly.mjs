export default async () => {
  const key=Netlify.env.get("GEMINI_API_KEY");
  const webhook=Netlify.env.get("CONTENT_WEBHOOK_URL");
  if(!key) return Response.json({ok:false,error:"Missing GEMINI_API_KEY"},{status:503});
  const prompt=`اكتبي مقالاً عربياً أسبوعياً لعلامة Féminine Mind حول الوعي الذاتي أو الحدود أو العلاقات الصحية أو التعافي النفسي. أخرجي JSON فقط: title, category, excerpt, body. الأسلوب علمي مبسط، دافئ، عملي، غير تشخيصي، مع عنوان واضح وفقرات قصيرة و3 خطوات عملية.`;
  const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":key},body:JSON.stringify({contents:[{role:"user",parts:[{text:prompt}]}]})});
  const d=await r.json(); const raw=d?.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("")||"";
  const clean=raw.replace(/```json|```/g,"").trim(); let content; try{content=JSON.parse(clean)}catch{content={raw}};
  if(webhook) await fetch(webhook,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"weekly",content})});
  return Response.json({ok:true,content});
};
export const config={schedule:"0 8 * * 1"};
