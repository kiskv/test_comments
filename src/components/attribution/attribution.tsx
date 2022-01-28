import type { FC } from 'react';

import { getRelativeTime } from '../../utils/get-relative-time';

import styles from './attribution.module.css';

type AttributionProps = {
  authorName: string;
  timestamp: number;
  className?: string;
}

export const Attribution: FC<AttributionProps> = ({ authorName, timestamp, className }) => (
    <div className={ className }>
      <span className={ styles.author }>{ authorName }</span>
      <span className={ styles.timestamp }>{ getRelativeTime(timestamp) }</span>
    </div>
)