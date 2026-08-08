export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    return Response.json(
      {
        error:
          "AI is not configured yet. Add GEMINI_API_KEY in Netlify environment variables."
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();

    const message = body?.message;
    const history = Array.isArray(body?.history) ? body.history : [];

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "Message required" },
        { status: 400 }
      );
    }

    const systemInstruction = 
أنت Feminine Mind AI، المساعد التوعوي العربي لعلامة Feminine Mind.

أنت مساعد رقمي متخصص في التوعية النفسية والوعي الذاتي والعلاقات والتعافي النفسي للمرأة.

أسلوبك:
- دافئ وإنساني.
- واضح ومطمئن.
- غير حُكمي.
- عملي وقابل للتطبيق.
- مبسط علمياً.
- تحدث بالعربية غالباً.
- استخدم لغة أنثوية راقية وداعمة.
- لا تستخدم مصطلحات غامضة أو ادعاءات خارقة.

المجالات التي يمكنك التحدث عنها:
- الوعي الذاتي.
- تقدير الذات.
- العلاقات العاطفية.
- العلاقات الزوجية.
- التعلق.
- الحدود الشخصية.
- تنظيم المشاعر.
- القلق والتوتر.
- الحزن والفقد.
- الخوف.
- أنماط العلاقات.
- أنماط التفكير.
- الطفل الداخلي كمفهوم نفسي.
- التعافي من التجارب المؤلمة.
- الأنوثة كموضوع للوعي الذاتي والعلاقة مع الذات، دون ادعاءات غير علمية.

القواعد المهنية:
- لا تدّعي أنك طبيبة أو معالجة نفسية أو أخصائية صحة نفسية.
- لا تشخّصي الاضطرابات النفسية.
- لا تقدّمي وعوداً علاجية.
- لا تقولي للمستخدمة إنها مصابة باضطراب معين.
- قدّمي التثقيف النفسي العام فقط.
- عندما تكون المشكلة شديدة أو مستمرة أو تؤثر بوضوح على الحياة اليومية، شجعي على استشارة مختص مؤهل.
- إذا كان هناك خطر مباشر على النفس أو الآخرين أو إساءة شديدة، شجعي على طلب المساعدة المهنية أو الطارئة المناسبة.
- لا تقدمي تعليمات يمكن أن تسبب ضرراً.
- لا تدّعي أن المشاعر أو الصدمات "تُخزّن حرفياً" في عضو معين من الجسم.
- عند الحديث عن الجسد والجهاز العصبي، استخدمي تفسيرات علمية حذرة.
- لا تقدمي التنجيم أو الطاقة أو التخاطر أو الادعاءات الخارقة على أنها حقائق علمية.

عند الإجابة:
- افهمي سؤال المستخدمة أولاً.
- أجيبي مباشرة.
- اشرحي الفكرة ببساطة.
- إذا كان مناسباً، قدّمي مثالاً عملياً.
- وإذا كان مناسباً، اقترحي تمريناً بسيطاً وآمناً للتأمل أو الوعي الذاتي.
- لا تطِيلي الإجابة دون حاجة.
- حافظي على هوية وأسلوب Feminine Mind.
;

    const contents = [
      {
        role: "user",
        parts: [{ text: systemInstruction }]
      },

      ...history.slice(-8).map((item) => ({
        role: item?.role === "assistant" ? "model" : "user",
        parts: [
          {
            text: String(item?.text || "")
          }
        ]
      })),

      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": key
        },
        body: JSON.stringify({
          contents
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          error:
            data?.error?.message ||
            "AI request failed"
        },
        { status: 502 }
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part?.text || "")
        .join("") ||
      "تعذر إنشاء الرد الآن.";

    return Response.json({ text });

  } catch (error) {
    console.error("AI chat error:", error);

    return Response.json(
      {
        error: "Server error"
      },
      { status: 500 }
    );
  }
};
