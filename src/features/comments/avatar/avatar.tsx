import type { FC } from 'react';

import cn from 'classnames';

import ColorHash from 'color-hash';

import styles from './avatar.module.css';

type AvatarProps = {
    authorName: string;
    className?: string;
};

export const Avatar: FC<AvatarProps> = ({ authorName, className }) => {
    const colorHash = new ColorHash();
    const authorColor = colorHash.hex(authorName);
    const authorInitials = authorName
        .split(' ')
        .map((name) => name[0])
        .join('');

    return (
        <div
            style={{
                backgroundColor: `${authorColor}90`,
            }}
            className={cn(className, styles.container)}
        >
            <span
                style={{
                    color: authorColor,
                }}
                className={styles.content}
            >
                {authorInitials}
            </span>
        </div>
    );
};
