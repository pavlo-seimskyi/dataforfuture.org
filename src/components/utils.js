export function formatDate(input) {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' }).slice(0, 3);
    const day = date.getDate();
    return `${day} ${month}, ${year}`;
};
