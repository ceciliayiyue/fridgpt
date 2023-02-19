import Head from 'next/head'
import Image from 'next/image'
import {Inter} from '@next/font/google'
// import "bootstrap/dist/css/bootstrap.css";
import ClipLoader from "react-spinners/ClipLoader";

import styles from '@/styles/Home.module.css'
import CreatableSelect from 'react-select/creatable'
import {Button, Col, Row} from "react-bootstrap";
import {useForm, Controller} from "react-hook-form";
import {useState} from "react";

const inter = Inter({subsets: ['latin']})


const RecipeTitle = (props) => {
    console.log("inside recipe title")
    console.log(props.title, props.recipe)
    const [show, setShow] = useState(false);
    return <Col style={{ width:"100%"}}>
        <Row>{props.title}</Row>
        <Row><Button onClick={() => {
            setShow(!show)
        }}> Show Recipe</Button></Row>
        <Row style={{marginTop:"25px", marginBottom:"25px"}}>{show ? props.recipe : ""}</Row>
    </Col>
}

const RecipeBuilder = (props: any) => {
    console.log("inside", props.recipes.recipes)
    const elements: JSX.Element[] = [];
    for (let i = 0; i < props.recipes.recipes.length; i++) {
        console.log(props.recipes.recipes[i].name, props.recipes.recipes[i])
        elements.push(
            <RecipeTitle
                title={props.recipes.recipes[i].name}
                recipe={props.recipes.recipes[i].recipe}/>
        );
    }
    return <div>{elements}</div>;
}

export default function Home() {
    const {control, handleSubmit} = useForm();
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState({"data": {"recipes": []}});
    const sampleResult = {
        "data": {
            "recipes": [{
                "name": "Tomato, Cucumber, and Spinach Salad with Grilled Chicken",
                "recipe": `2 cups spinach leaves
1/2 cup sliced cucumber
1/2 cup cherry tomatoes, halved
1 grilled chicken breast, sliced
1/4 cup plain yoghurt
1 tbsp olive oil
Salt and pepper to taste
In a large mixing bowl, combine spinach, cucumber, and cherry tomatoes. Add sliced grilled chicken on top. In a separate bowl, whisk together yoghurt, olive oil, salt, and pepper. Drizzle the dressing over the salad and toss gently.`
            },
                {
                    "name": "Scrambled Eggs with Spinach and Tomato",
                    "recipe": `2 eggs
1/4 cup chopped spinach
1/4 cup chopped cherry tomatoes
Salt and pepper to taste
1 tsp olive oil
In a bowl, whisk together eggs, spinach, cherry tomatoes, salt, and pepper. Heat olive oil in a pan over medium heat. Pour the egg mixture into the pan and cook, stirring occasionally, until the eggs are set and cooked through.`

                }, {
                    "name": "Chicken and Cucumber Yogurt Bowl",
                    "recipe": `4 oz cooked chicken breast, shredded
1/2 cup sliced cucumber
1/4 cup plain yoghurt
1 tbsp chopped fresh dill
Salt and pepper to taste
In a bowl, mix together shredded chicken and sliced cucumber. In a separate bowl, whisk together yoghurt, dill, salt, and pepper. Pour the yoghurt mixture over the chicken and cucumber and toss gently to combine.`

                }, {
                    "name": "Banana and Spinach Smoothie",
                    "recipe": `1 banana
1 cup fresh spinach leaves
1/2 cup plain yoghurt
1/2 cup water
1 tsp honey (optional)
Combine all ingredients in a blender and blend until smooth. If the smoothie is too thick, add more water until it reaches your desired consistency.`

                }
            ]
        }

    }

    // @ts-ignore
    const delay = ms => new Promise(res => setTimeout(res, ms));
    async function onSubmit(event) {
        if (!event.ingredients) {
            alert("Please select at least one ingredient");
            return;
        }
        const prompt = `Generate healthy recipes using the following ingredients: ${event.ingredients.map((ingredient: any) => ingredient.value).join(", ")}`;
        console.log(prompt);
        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({dataIngredients: prompt}),
            });

            const data = await response.json();
            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }
            console.log("data", data);
            setLoading(true);
            await delay(3000);
            setLoading(false);
            // @ts-ignore
            setResult(sampleResult);
            console.log("result" , sampleResult);
        } catch (error: any) {
            // Consider implementing your own error handling logic here
            console.error(error);
            alert(error.message);
        }
    }

    console.log(result.length)
    // @ts-ignore
    return (
        <>
            <main className={styles.main}>
                <Col>
                    <Row><h1>FridGPT</h1></Row>
                    <Row>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name={"ingredients"}
                                control={control}
                                render={({field}) =>
                                    <CreatableSelect
                                        isMulti
                                        {...field}
                                        name="ingredients"
                                        className="basic-multi-select multi-select-ingredients"
                                        classNamePrefix="select"
                                    />
                                }
                            />
                            <input type="submit" value="Generate Recipe" className={"btn btn-success"}/>
                        </form>
                    </Row>
                </Col>

                {loading ?  <ClipLoader
                    loading={loading}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /> : <RecipeBuilder recipes={result.data}/>}
            </main>
        </>
    )
}
