import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/** подсчет общей стоимости пиццы
 *
 * @param type тип теста пиццы
 * @param size размер пиццы
 * @param items вариации пиц (в зависимости от типа и размера)
 * @param ingredients ингредиенты сверх базового состава
 * @param selectedIngredients добавленные клиентом ингредиенты
 * @returns number
 */
export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;

  const totalIngredientsPrice = ingredients
    .filter((item) => selectedIngredients.has(item.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + totalIngredientsPrice;
};
