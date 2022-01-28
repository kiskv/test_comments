import type { FC } from 'react';

import { Avatar } from '../avatar';
import { Attribution } from '../attribution';

import styles from './comment.module.css';

type CommentProps = {
  authorName: string;
  timestamp: number;
  text: string;
}

export const Comment: FC<CommentProps> = ({ authorName, timestamp, text }) => {
  return <div className={ styles.container }>
            <Avatar authorName={ authorName } className={ styles.avatar }/>
            <Attribution
                authorName={ authorName }
                timestamp={ timestamp }
                className={ styles.attribution }
              />
            <span className={ styles.text }>{ text }</span>
            <div className={ styles.actions }>
              <div>Ответить</div>
              <div>Редактировать</div>
              <div>Удалить</div>
            </div>
         </div>
}