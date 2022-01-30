import {
    setCurrentReplyId,
    deleteComment,
    commentsSelectors,
    Comment as CommentProps,
} from '../comments-slice';
import { useAppSelector, useAppDispatch } from '../../../hooks';

import type { FC } from 'react';

import { Avatar } from '../avatar';
import { Attribution } from '../../../components/attribution';

import styles from './comment.module.css';

export const Comment: FC<CommentProps> = ({ timestamp, text, id, childs }) => {
    const dispatch = useAppDispatch();

    const comments = useAppSelector(commentsSelectors.selectEntities);

    const onReply = () => {
        dispatch(setCurrentReplyId(id));
    };

    const onDelete = () => {
        dispatch(deleteComment(id));
    };

    const childComments = childs.map((commentId) => {
        const comment = comments[commentId];

        return comment ? <Comment key={comment.id} {...comment} /> : null;
    });

    return (
        <div className={styles.container}>
            <div className={styles.comment}>
                <Avatar authorName="Тест Тестович" className={styles.avatar} />
                <Attribution
                    authorName="Тест Тестович"
                    timestamp={timestamp}
                    className={styles.attribution}
                />
                <span className={styles.text}>{text}</span>
                <div className={styles.actions}>
                    <div onClick={onReply}>Ответить</div>
                    <div>Редактировать</div>
                    <div onClick={onDelete}>Удалить</div>
                </div>
            </div>

            <div className={styles.childComments}>{childComments}</div>
        </div>
    );
};
