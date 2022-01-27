import { Article } from './features/article';
import { CommentsTree } from './features/comments-tree';
import './app.css';

export const App = () => {
  return (
    <div className="App">
      <Article />
      <CommentsTree />
    </div>
  );
}
