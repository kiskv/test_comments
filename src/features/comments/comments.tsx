import { Comment } from './comment';
import { Editor } from './editor';
import { commentsSelectors } from './comments-slice';
import { useAppSelector } from '../../hooks';

export const Comments = () => {
    const comments = useAppSelector(commentsSelectors.topLevelSelector).map(
        (comment) => {
            return <Comment key={comment.id} {...comment} />;
        }
    );

    return (
        <div>
            {comments}
            <Editor />
        </div>
    );
};
