import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

export default function BudgetForm() {

    const [budget, setBudget] = useState<number | string>(0); // Allow string to handle empty input
    const { dispatch } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Set the budget to an empty string if the input is empty, otherwise convert it to a number
        setBudget(value === '' ? '' : Number(value));
    };

    const isValid = useMemo(() => {
        return isNaN(Number(budget)) || Number(budget) <= 0;
    }, [budget]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({type: "add-budget", payload: { budget: Number(budget)}})
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="text-4xl text-orange-500 font-bold text-center">
                    Define Budget
                </label>
                <input
                    id="budget"
                    type="number"
                    className="border border-orange-500 rounded px-3 py-2 text-orange-500 font-bold"
                    placeholder="Enter your budget"
                    name="budget"
                    value={budget === 0 ? '' : budget} // Show empty string if budget is 0
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                value="Define budget"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full uppercase disabled:opacity-40"
                disabled={isValid}
            />
        </form>
    );
}
