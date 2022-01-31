import structuredClone from '@ungap/structured-clone';

type Tail = null | {
    value: number;
    next: Tail | null;
};

export const reverseTail = (tail: Tail): Tail => {
    let result: Tail = null;
    let ref = tail;

    while (ref !== null) {
        result = { value: ref.value, next: result };

        ref = ref.next;
    }

    return structuredClone(result);
};
