export const shuffle = (array) => {
    const arrayToShuffle = Array.from(array);
    const shuffledArray = [];
    while (arrayToShuffle.length > 0) {
        const random = Math.floor(Math.random() * arrayToShuffle.length);
        const newItem = arrayToShuffle.splice(random, 1);
        shuffledArray.push(newItem[0]);
    }
    return shuffledArray;
}