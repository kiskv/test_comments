import { Attribution } from '../../components/attribution';

import { currentArticleSelector } from './articles-slice';
import { usersSelectors } from '../users/users-slice';
import { useAppSelector } from '../../hooks';

import styles from './article.module.css';

export const Article = () => {
    const article = useAppSelector(currentArticleSelector);
    const user = useAppSelector((state) =>
        usersSelectors.selectById(state, article?.userId ?? '')
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>{article?.title}</h1>
            <Attribution
                userName={user?.name}
                timestamp={article?.timestamp ?? 0}
            />
        </div>
    );
};
