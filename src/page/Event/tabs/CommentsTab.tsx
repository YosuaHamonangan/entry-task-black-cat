import React from 'react';
import Comments from '../../../component/Comments';
import Icon from '../../../component/Icon';
import TabContent from '../../../component/TabContent';
import iconStyles from '../../../enum/iconStyles';
import { ICommentData } from '../../../interfaces/res';
import styles from '../Event.module.css';

interface IProps {
  comments: ICommentData[];
  selected: boolean;
}

export default function CommentsTab(props: IProps) {
  const { selected, comments } = props;
  return (
    <TabContent selected={selected}>
      <div className={`${styles.paddingSide}`}>
        <Comments comments={comments} />
      </div>

      <div className={styles.footer}>
        <button onClick={() => console.log('comment')}>
          <Icon icon={iconStyles.noActivity} width="2em" height="2em" />
        </button>
        <button onClick={() => console.log('like')}>
          <Icon icon={iconStyles.likeOutline} width="2em" height="2em" />
        </button>
        <button className={styles.join} onClick={() => console.log('join')}>
          weads
        </button>
      </div>
    </TabContent>
  );
}
