import React from 'react';
import { DEFAULT_AVATAR } from '../../constant/strings';

export default function Avatar({
  src,
  alt = 'Avatar',
  size = '40px',
}) {
  return (
    <div
      className="rounded-full bg-gray-200 flex items-center justify-center text-white text-xl font-bold overflow-hidden"
      style={{ width: size, height: size }}
    >
      {(src && src.startsWith('data:image/')) ? (
        <img src={(src.startsWith('data:image/')) ? src : DEFAULT_AVATAR} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <img src={DEFAULT_AVATAR} alt={alt} className="w-full h-full object-cover" />
      )}
    </div>
  );
}