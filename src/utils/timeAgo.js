const getTimeDifference = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000); // Difference in seconds

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
        const value = Math.floor(diff / seconds);
        if (value >= 1) {
            return `${value} ${unit}${value !== 1 ? 's' : ''} ago`;
        }
    }

    return 'Just now';
}

export default getTimeDifference 