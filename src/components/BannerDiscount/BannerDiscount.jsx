import React, { useEffect, useState } from 'react';
import './BannerDiscount.css';
import Webapi from '../../api/Webapi';

export default function BannerDiscount() {
  const api = new Webapi();
  const [bannerDiscountText, setBannerDiscountText] = useState('');

  useEffect(() => {
    const getBannerDiscountText = async () => {
      try {
        let response = await api.obtenerBannerDiscount();
        if (response) setBannerDiscountText(response[0].bannerText);
      } catch (err) {
        //console.log(err);
      }
    };
    getBannerDiscountText();
  }, [api]);

  return (
    <>
      {bannerDiscountText !== '' && (
        <div className='banner-discount'>{bannerDiscountText}</div>
      )}
    </>
  );
}
