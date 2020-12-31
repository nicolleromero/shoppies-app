import React from 'react';

import ContentLoader from 'react-content-loader';

export function Placeholder() {
  return (
    <ContentLoader
      speed={2}
      width={'100%'}
      height={'100%'}
      viewBox="0 0 9000 14000"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
    </ContentLoader>
  );
}
