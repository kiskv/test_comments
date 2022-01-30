import { FC, FormEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import {
    addComment,
    editorSelector,
    setEditor,
    updateCommentText,
} from '../comments-slice';

const authorId = '1';
const author = 'Тест Тестович';

export const Editor: FC = () => {
    const dispatch = useAppDispatch();

    const editor = useAppSelector(editorSelector);

    const [input, setInput] = useState('');

    const onChange = (event: FormEvent<HTMLTextAreaElement>) => {
        setInput(event.currentTarget.value);
    };

    const resetEditor = () => {
        setInput('');
        dispatch(
            setEditor({
                commentId: null,
                type: 'new',
            })
        );
    };

    const onReply = () => {
        dispatch(
            addComment({
                authorId,
                text: input,
                parentId: editor.commentId,
            })
        );

        resetEditor();
    };

    const onEdit = () => {
        if (editor.commentId) {
            dispatch(
                updateCommentText({
                    id: editor.commentId,
                    text: input,
                })
            );
        }

        resetEditor();
    };

    const buttonProps =
        editor.type === 'new' || editor.type === 'replyTo'
            ? {
                  onClick: onReply,
                  children: 'Ответить',
              }
            : {
                  onClick: onEdit,
                  children: 'Изменить',
              };

    return (
        <div>
            <div>
                {editor.type === 'replyTo' && <span> Ответ {author} </span>}
                {(editor.type === 'replyTo' || editor.type === 'edit') && (
                    <button type="button" onClick={resetEditor}>
                        Отменить
                    </button>
                )}
            </div>
            <textarea value={input} onChange={onChange} />
            <button type="submit" {...buttonProps} />
        </div>
    );
};
