const Status = {
    BACKLOG: 'backlog',
    PROCESS: 'process',
    READY: 'ready',
    TRASH: 'trash',
};

const StatusLabel = {
    [Status.BACKLOG]: 'Бэклог',
    [Status.PROCESS]: 'В процессе',
    [Status.READY]: 'Готово',
    [Status.TRASH]: 'Корзина',
};

export {Status, StatusLabel};