import { Comment } from '../../components/comment';
export const Comments = () => {
    return (
        <div>
            <Comment
                authorName="Кирилл Скворцов"
                timestamp={0}
                text="Привет, мир"
            />
        </div>
    );
};
