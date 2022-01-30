import type { FC } from 'react';

import cn from 'classnames';

import ColorHash from 'color-hash';

import { getUserInitials } from '../../../utils/get-user-initials';

import styles from './avatar.module.css';

type AvatarProps = {
    userName?: string;
    className?: string;
};

const colorHash = new ColorHash();

export const Avatar: FC<AvatarProps> = ({
    userName = 'Неизвестный пользователь',
    className,
}) => {
    const userColor = colorHash.hex(userName);
    const userInitials = getUserInitials(userName);

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
