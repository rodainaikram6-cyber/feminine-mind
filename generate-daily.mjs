export default async () => {
  const key=Netlify.env.get("GEMINI_API_KEY");
  const webhook=Netlify.env.get("CONTENT_WEBHOOK_URL");
  if(!key) return Response.json({ok:false,error:"Missing GEMINI_API_KEY"},{status:503});
  const prompt=`أنشئ حزمة محتوى صباحية عربية لعلامة Féminine Mind: توكيد واحد، تمرين عملي صغير، وسلوك واحد لليوم. الموضوعات: الوعي الذاتي، حب الذات، الحدود، العلاقات الصحية، فهم المشاعر والتعافي النفسي. اجعليها عملية وغير تشخيصية. أخرجي JSON فقط بالمفاتيح affirmation, exercise, behavior.`;
  const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":key},body:JSON.stringify({contents:[{role:"user",parts:[{text:prompt}]}]})});
  const d=await r.json(); const raw=d?.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("")||"";
  const clean=raw.replace(/```json|```/g,"").trim();
  let content; try{content=JSON.parse(clean)}catch{content={raw}};
  if(webhook) await fetch(webhook,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"daily",content})});
  return Response.json({ok:true,content});
};
export const config={schedule:"0 7 * * *"};
