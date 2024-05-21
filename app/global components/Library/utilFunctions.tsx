export const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, '0')}h:${String(minutes).padStart(2, '0')}m:${String(seconds).padStart(2, '0')}s`;

    return formattedTime;
};

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