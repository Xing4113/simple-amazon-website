

// get date
export function getDate(days) {


    let objectDate = new Date();
    objectDate.setDate(objectDate.getDate() + days);

    let day = objectDate.getDate();
    let month = objectDate.getMonth() + 1;
    let year = objectDate.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = `0${month}`;
    }

    const dayOfWeekName = objectDate.toLocaleString(
        'default', { weekday: 'long' }
    );

    return `${dayOfWeekName}, ${day}/${month}/${year}`;
}