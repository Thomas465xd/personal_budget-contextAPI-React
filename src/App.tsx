import BudgetForm from "./components/BudgetForm"

function App() {

    return (
        <>
            <header className="bg-orange-500 py-8 max-h-72">
                <h1 className="uppercase text-center font-black text-4xl text-white">
                    Personal Budget & Agenda
                </h1>
            </header>

            <div className="max-w-3xl mx-auto bg-white shadow-lg roudned-lg mt-10 p-10">
                <BudgetForm
                
                />
            </div>
        </>
    )
}

export default App
