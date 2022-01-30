import { FC, FormEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import {
    addComment,
    commentsSelectors,
    setEditor,
    updateCommentText,
} from '../comments-slice';

import { usersSelectors } from '../../users/users-slice';

import styles from './editor.module.css';

export const Editor: FC = () => {
    const dispatch = useAppDispatch();

    const editor = useAppSelector(commentsSelectors.editorSelector);

    const loggedUser = useAppSelector(usersSelectors.loggedUserSelector);
    const replyUser = useAppSelector((state) =>
        usersSelectors.userByCommentIdSelector(state, editor.commentId ?? '')
    );

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
                userId: loggedUser?.id ?? '',
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
                {editor.type === 'replyTo' && (
                    <span> Ответ для: {replyUser?.name} </span>
                )}
            </div>
            <textarea
                className={styles.textArea}
                value={input}
                onChange={onChange}
            />
            <div className={styles.actions}>
                <button type="submit" {...buttonProps} />
                {(editor.type === 'replyTo' || editor.type === 'edit') && (
                    <button type="button" onClick={resetEditor}>
                        Отменить
                    </button>
                )}
            </div>
        </div>
    );
};
