'use client'
import { useHistory } from "@/app/contexts/historyContext";
import PageName from "@/app/global components/PageName";

const WorkoutHistoryName = () => {
    const { history, setHistory } = useHistory();

    return (
        <PageName name={history.name} />
    )
}

export default WorkoutHistoryName