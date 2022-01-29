import { Attribution } from '../../components/attribution';

import styles from './article.module.css';

export const Article = () => (
    <div className={styles.container}>
        <h1 className={styles.header}>
            Илон Маск предложил использовать роботов-гуманоидов Optimus на
            заводах Tesla из-за нехватки работников в США
        </h1>
        <Attribution authorName="Маша Цепелеева" timestamp={Date.now() - 1e7} />
    </div>
);
