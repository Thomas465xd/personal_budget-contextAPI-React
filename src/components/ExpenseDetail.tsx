import { useMemo } from "react"
import { categories } from "../data/categories"
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({expense} : ExpenseDetailProps) {

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => {}}
            >
                Update
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => {}}
                destructive={true}
            >
                Delete
            </SwipeAction>
        </LeadingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={30}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div className="">
                        <img 
                            src={`/icono_${categoryInfo.icon}.svg`} 
                            alt={categoryInfo?.name} 
                            className="w-20 h-20" 
                        />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay
                        amount={expense.amount} 
                    />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
