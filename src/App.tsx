import { Article } from './features/article';
import { Comments } from './features/comments';
import './app.css';

export const App = () => {
    return (
        <div className="App">
            <Article />
            <Comments />
        </div>
    );
};
