const { GoogleGenAI } = require("@google/genai");

const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

async function getRecipe(expiringFoods, inventory) {
    console.log(expiringFoods,"from ai ")
    console.log(inventory,"from ai")
//   const expiringNames = expiringFoods.map(f => f.name).join(", ");
//   const inventoryNames = inventory.map(f => f.name).join(", ");

  const prompt = `
Some foods in the restaurant inventory are expiring soon: ${expiringFoods}.
Current inventory has: ${inventory}.
Suggest 1-2 recipes we can make using mostly expiring foods plus available inventory dont use all inventory foods .
and give full recipes.
`;

  const response = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: `
You are a helpful AI chef assistant.
- Suggest recipes based on the expiring ingredients and available inventory.
- Keep the recipe names short and practical.
- Do not include unrelated instructions.
      `
    }
  });

  return response.text;
}

module.exports = getRecipe;
