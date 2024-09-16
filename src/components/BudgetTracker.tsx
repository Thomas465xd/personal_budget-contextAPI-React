import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <img src="/grafico.jpg" alt="Gráfica de gastos" />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                >
                    Reset App
                </button>

                <AmountDisplay
                    label="Budget"
                    amount={300}
                />

                <AmountDisplay
                    label="Spent"
                    amount={100}
                />

                <AmountDisplay
                    label="Available"
                    amount={200}
                />
            </div>
        </div>
    )
}
