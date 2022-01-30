import type { FC } from 'react';

import cn from 'classnames';

import ColorHash from 'color-hash';

import styles from './avatar.module.css';

type AvatarProps = {
    userName?: string;
    className?: string;
};

export const Avatar: FC<AvatarProps> = ({
    userName = 'Неизвестный пользователь',
    className,
}) => {
    const colorHash = new ColorHash();
    const userColor = colorHash.hex(userName);
    const userInitials = userName
        .split(' ')
        .map((name) => name[0])
        .join('');

    return (
        <div
            style={{
                backgroundColor: `${userColor}90`,
            }}
            className={cn(className, styles.container)}
        >
            <span
                style={{
                    color: userColor,
                }}
                className={styles.content}
            >
                {userInitials}
            </span>
        </div>
    );
};
