import { ChangeEvent, FormEvent, useState } from "react";
import type { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expenseName: "",
        category: "",
        date: new Date(),
    });

    const [error, setError] = useState('')

    const { dispatch } = useBudget()

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense, 
            date: value
        })
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {

        const { name, value } = e.target
        const isAmountField = ["amount"].includes(name);

        setExpense({
            ...expense, 
            [name]: isAmountField ? Number(value) : value
        })
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validar el formulario
        if(Object.values(expense).includes("")){
            setError("All fields are required")
            return
        }

        // Agregar un nuevo gasto
        dispatch({type: "add-expense", payload: {expense}})

        //Resetear el formulario
        setExpense({
            amount: 0,
            expenseName: "",
            category: "",
            date: new Date(),
        })
    }

    return (
        <form action="" className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4 border-orange-300 py-2">
                New Expense
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">
                    Expense Name
                </label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Add the expense name"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={(e) => handleChange(e)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Amount:
                </label>
                <input
                    type="text"
                    id="amount"
                    placeholder="Add the expense amount: e.g. 100"
                    className="bg-slate-100 p-2"
                    name="amount"
                    value={expense.amount}
                    onChange={(e) => handleChange(e)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">
                    Category:
                </label>
                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={(e) => handleChange(e)}
                >
                    <option value="" disabled>
                        -- Select Category --
                    </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">
                    Expense Date:
                </label>
                <DatePicker
                    className="bg-slate-100 p-2"
                    value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg w-full"
                value={"Add Expense"}
            />
        </form>
    );
}
