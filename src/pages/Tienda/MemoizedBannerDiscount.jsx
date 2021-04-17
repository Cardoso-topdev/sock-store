import React from 'react';
import BannerDiscount from '../../components/BannerDiscount/BannerDiscount';

function getBannerDiscount() {
  return (
    <div>
      <BannerDiscount />
    </div>
  );
}

export const MemoizedBannerDiscount = React.memo(getBannerDiscount);
