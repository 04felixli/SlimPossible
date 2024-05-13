export const GetWorkoutTime = (): string => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
        return "Morning";
    } else if (hour >= 12 && hour < 18) {
        return "Afternoon";
    } else if (hour >= 18 && hour < 21) {
        return "Evening";
    } else {
        return "Night";
    }
}