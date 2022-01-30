import type { FC } from 'react';

import { getRelativeTime } from '../../utils/get-relative-time';

import styles from './attribution.module.css';

type AttributionProps = {
    timestamp: number;
    userName?: string;
    className?: string;
};

export const Attribution: FC<AttributionProps> = ({
    timestamp,
    userName = 'Неизвестный пользователь',
    className,
}) => (
    <div className={className}>
        <span className={styles.author}>{userName}</span>
        <span className={styles.timestamp}>{getRelativeTime(timestamp)}</span>
    </div>
);
