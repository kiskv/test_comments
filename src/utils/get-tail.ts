type Tail = null | {
    value: number;
    next: Tail;
};

export const getTail = (head: number, tail: Tail = null): Tail => ({
    value: head,
    next: tail,
});
