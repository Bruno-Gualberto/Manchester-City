import React from 'react';
import { CityLogo } from '../utils/tools';

const Footer = () => {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <CityLogo
          link={true}
          linkTo={'/'}
          width="70px"
          height="70px"
        />
      </div>
      <div className="footer_discl">
        Manchester City. All rights reserved
      </div>
    </footer>
  )
}

export default Footer;