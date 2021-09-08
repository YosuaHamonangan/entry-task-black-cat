import React from 'react';
import globalStyles from '../enum/globalStyles';
import iconStyles from '../enum/iconStyles';
import Icon from './Icon';
import './NoActivity.css';

export default function NoActivity() {
  return (
    <div className="no-activity-container">
      <Icon
        icon={iconStyles.noActivity}
        color={globalStyles.primaryLight}
        width="5em"
        height="5em"
      />
      <div className="no-activity-label">No activity found</div>
    </div>
  );
}
