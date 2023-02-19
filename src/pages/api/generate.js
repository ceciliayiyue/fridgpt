import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const sampleResult = `1. Tomato, Cucumber, and Spinach Salad with Grilled Chicken

2 cups spinach leaves
1/2 cup sliced cucumber
1/2 cup cherry tomatoes, halved
1 grilled chicken breast, sliced
1/4 cup plain yoghurt
1 tbsp olive oil
Salt and pepper to taste
In a large mixing bowl, combine spinach, cucumber, and cherry tomatoes. Add sliced grilled chicken on top. In a separate bowl, whisk together yoghurt, olive oil, salt, and pepper. Drizzle the dressing over the salad and toss gently.

2. Scrambled Eggs with Spinach and Tomato

2 eggs
1/4 cup chopped spinach
1/4 cup chopped cherry tomatoes
Salt and pepper to taste
1 tsp olive oil
In a bowl, whisk together eggs, spinach, cherry tomatoes, salt, and pepper. Heat olive oil in a pan over medium heat. Pour the egg mixture into the pan and cook, stirring occasionally, until the eggs are set and cooked through.

3. Chicken and Cucumber Yogurt Bowl

4 oz cooked chicken breast, shredded
1/2 cup sliced cucumber
1/4 cup plain yoghurt
1 tbsp chopped fresh dill
Salt and pepper to taste
In a bowl, mix together shredded chicken and sliced cucumber. In a separate bowl, whisk together yoghurt, dill, salt, and pepper. Pour the yoghurt mixture over the chicken and cucumber and toss gently to combine.

4. Banana and Spinach Smoothie

1 banana
1 cup fresh spinach leaves
1/2 cup plain yoghurt
1/2 cup water
1 tsp honey (optional)
Combine all ingredients in a blender and blend until smooth. If the smoothie is too thick, add more water until it reaches your desired consistency.`
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    console.log("Generating recipe...", "req.body", req.body);
    res.status(200).json({ result: sampleResult });


    // if (!configuration.apiKey) {
    //     res.status(500).json({
    //         error: {
    //             message: "OpenAI API key not configured.",
    //         }
    //     });
    //     alert("OpenAI API key not configured, please follow instructions in README.md")
    //     return;
    // }

    // const promptData = req.body.dataIngredients || '';
    // if ( promptData.trim().length === 0) {
    //     res.status(400).json({
    //         error: {
    //             message: "Please enter a valid list of ingredients",
    //         }
    //     });
    //     return;
    // }
    //
    // try {
    //     const completion = await openai.createCompletion({
    //         model: "text-davinci-003",
    //         prompt: promptData,
    //         temperature: 0.6,
    //     });
    //     res.status(200).json({ result: completion.data.choices[0].text });
    // } catch(error) {
    //     // Consider adjusting the error handling logic for your use case
    //     if (error.response) {
    //         console.error(error.response.status, error.response.data);
    //         res.status(error.response.status).json(error.response.data);
    //     } else {
    //         console.error(`Error with OpenAI API request: ${error.message}`);
    //         res.status(500).json({
    //             error: {
    //                 message: 'An error occurred during your request.',
    //             }
    //         });
    //     }
    // }
}
