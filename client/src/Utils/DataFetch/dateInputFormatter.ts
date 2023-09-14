export default function dateInputFormatter(dt: string) {
    if (!dt) return "";
    const date = new Date(dt);
    const month =
        date.getMonth().toString().length === 2
            ? date.getMonth().toString()
            : `0${date.getMonth()}`;
    const day =
        date.getDate().toString().length === 2
            ? date.getDate().toString()
            : `0${date.getDate()}`;
    return `${date.getFullYear()}-${month}-${day}`;
}