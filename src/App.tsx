import { useMemo } from "react"
import BudgetForm from "./components/BudgetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"

function App() {

    const { state } = useBudget()

    const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

    return (
        <>
            <header className="bg-orange-300 py-8 max-h-72">
                <h1 className="uppercase text-center font-black text-4xl text-white">
                    Personal Budget & Agenda
                </h1>
            </header>

            <div className="max-w-3xl mx-auto bg-white shadow-lg roudned-lg mt-10 p-10">
                {isValidBudget ? <BudgetTracker /> : <BudgetForm />}
            </div>

            {isValidBudget && (
                <main className="max-w-3xl mx-auto py-10">

                    <ExpenseList />
                    <ExpenseModal />

                </main>
            )}
        </>
    )
}

export default App
