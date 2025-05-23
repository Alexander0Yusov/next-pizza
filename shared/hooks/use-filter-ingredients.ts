// import React from "react";
// import { Api } from "@/services/api-client";
// import { Ingredient } from "@prisma/client";
// import { useSet } from "react-use";

// interface ReturnProps {
//   ingredients: Ingredient[];
//   loading: boolean;
//   selectedIngredients: Set<string>;
//   onAddId: (id: string) => void;
// }

// export const useFilterIngredients = (value: string[] = []): ReturnProps => {
//   const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
//   const [loading, setLoading] = React.useState(true);

//   const [selectedIngredients, { toggle }] = useSet(new Set<string>(value));

//   React.useEffect(() => {
//     async function fetchIngredients() {
//       try {
//         const ingredients_ = await Api.ingredients.getAll();
//         setIngredients(ingredients_);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchIngredients();
//   }, []);

//   return { ingredients, loading, onAddId: toggle, selectedIngredients };
// };
