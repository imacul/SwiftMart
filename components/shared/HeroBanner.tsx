import Link from 'next/link';
import React from 'react'
import { Button } from '../ui/button';

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">SMALL TEXT</p>
        <h3>MID TEXT</h3>
        <img src="" alt="headphone" className="hero-banner-image" />
        <div>
          <Link href="/product/ID">
            <Button type="button">BUTTON TEXT</Button>
          </Link>
          <div className="desc">
              <h5>Description</h5>
              <p>DESCRIPTION</p>
          </div>
          </div>
      </div>
    </div>
  )
}

export default HeroBanner;