"use server";

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function generateDescription(name) {
    const prompt = `You work as inventory specialist. You have to write description for the item: ${name} in its original language. Return ONLY short, technical, visual description, without adding item name etc.`;

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.3-70b-versatile",
        });

        console.log(chatCompletion.choices);

        return {
            content: chatCompletion.choices[0]?.message?.content || "Error"
        };
    } catch (error) {
        console.error("Groq error: ", error);
        return { error: "Error occurred while communicating with API"};
    }
}