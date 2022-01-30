import { Comment } from './comment';
import { Reply } from './reply';
import { commentsSelectors } from './comments-slice';
import { useAppSelector, useAppDispatch } from '../../hooks';

export const Comments = () => {
    const comments = useAppSelector(commentsSelectors.selectAll)
        .filter((comment) => !comment.parentId)
        .map((comment) => {
            return <Comment key={comment.id} {...comment} />;
        });

    return (
        <div>
            {comments}
            <Reply />
        </div>
    );
};
