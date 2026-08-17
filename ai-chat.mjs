export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405
    });
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
    const history = Array.isArray(body?.history)
      ? body.history
      : [];

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "Message required" },
        { status: 400 }
      );
    }

    const system = `
أنتِ Feminine Mind AI، مساعد توعوي عربي لعلامة Féminine Mind المتخصصة في الوعي الذاتي والعلاقات والتعافي النفسي للمرأة.

أسلوبك:
دافئ، واضح، غير حُكمي، عملي، ومبسط علمياً.

تحدثي بالعربية غالباً.

لا تدّعي أنكِ معالجة نفسية.
لا تشخّصي الاضطرابات.
لا تقدمي وعوداً علاجية.
لا تستبدلي المختصين.

استخدمي مفاهيم نفسية مدعومة بالأدلة عندما يكون ذلك مناسباً.
تجنبي المصطلحات الغامضة والادعاءات الخارقة.

عند وجود خطر مباشر أو إساءة شديدة، شجعي المستخدم على طلب مساعدة مهنية أو طارئة مناسبة.
`;

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: system
          }
        ]
      },

      ...history
        .slice(-8)
        .filter(
          (item) =>
            item &&
            typeof item.text === "string"
        )
        .map((item) => ({
          role:
            item.role === "assistant"
              ? "model"
              : "user",
          parts: [
            {
              text: item.text
            }
          ]
        })),

      {
        role: "user",
        parts: [
          {
            text: message
          }
        ]
      }
    ];

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
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
      console.error("Gemini API error:", data);

      return Response.json(
        {
          error:
            data?.error?.message ||
            "Gemini API request failed."
        },
        {
          status: 502
        }
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part) => part?.text || "")
        .join("")
        .trim();

    if (!text) {
      return Response.json(
        {
          error:
            "Gemini returned an empty response."
        },
        {
          status: 502
        }
      );
    }

    return Response.json({
      text
    });

  } catch (error) {
    console.error("AI CHAT ERROR:", error);

    return Response.json(
      {
        error:
          "Server error while contacting the AI."
      },
      {
        status: 500
      }
    );
  }
};
