let currentID = 0;

export function generateID() {
    currentID += 1;
    return `task-${currentID}`;
}