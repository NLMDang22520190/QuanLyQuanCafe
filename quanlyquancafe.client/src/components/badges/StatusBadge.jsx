import React from 'react';
import {statusColorMap} from '../../constant/statusColorMap';

export const StatusBadge = ({ label = "", status = "" }) => {
  const badgeStyle = statusColorMap[status]?.badgeStyle || 'default-badge-style';
  const textColor = statusColorMap[status]?.textColor || 'default-text-color';

  return (
    <span
      className={`inline-block px-4 py-1 rounded-lg bg-opacity-30 ${badgeStyle} ${textColor}`}
    >
      {label}
    </span>
  );
};