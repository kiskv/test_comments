import { FC, FormEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import {
    currentReplyIdSelector,
    cancelReply,
    addComment,
} from '../comments-slice';

const authorId = '1';
const author = 'Тест Тестович';

export const Reply: FC = () => {
    const [input, setInput] = useState('');
    const dispatch = useAppDispatch();

    const handleChange = (event: FormEvent<HTMLTextAreaElement>) => {
        setInput(event.currentTarget.value);
    };

    const currentReplyId = useAppSelector(currentReplyIdSelector);

    const onReply = () => {
        dispatch(
            addComment({
                authorId,
                text: input,
                parentId: currentReplyId,
            })
        );
        setInput('');
    };

    const onCancelReply = () => {
        dispatch(cancelReply());
        setInput('');
    };

    const replyBlock = currentReplyId && (
        <div>
            <span> Ответ {author} </span>
            <button type="button" onClick={onCancelReply}>
                Отменить
            </button>
        </div>
    );

    return (
        <div>
            {replyBlock}
            <textarea value={input} onChange={handleChange} />
            <button type="submit" onClick={onReply}>
                Ответить
            </button>
        </div>
    );
};
