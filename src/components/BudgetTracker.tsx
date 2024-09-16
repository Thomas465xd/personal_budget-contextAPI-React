import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Function to calculate the color between green and red based on percentage
const getColor = (percentage : number) => {
    const red = Math.min(255, Math.floor((percentage / 100) * 255));
    const green = Math.min(255, Math.floor(((100 - percentage) / 100) * 255));
    return `rgb(${red}, ${green}, 0)`; // 111 for a constant lightness to maintain clarity
};

export default function BudgetTracker() {

    const { state, dispatch, totalExpenses, remainingBudget } = useBudget();

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentage}
                    styles={buildStyles({
                        pathColor: getColor(percentage), // Dynamically set color
                        trailColor: "#F5F5F5",
                        textSize: "10",
                        textColor: getColor(percentage), // Use the same color for the text
                    })}
                    text={`${percentage}% Spent`}
                />
            </div>

            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => dispatch({ type: "reset-app" })}
                >
                    Reset App
                </button>

                <AmountDisplay
                    label="Budget"
                    amount={state.budget}
                />

                <AmountDisplay
                    label="Spent"
                    amount={totalExpenses}
                />

                <AmountDisplay
                    label="Available"
                    amount={remainingBudget}
                />
            </div>
        </div>
    );
}
