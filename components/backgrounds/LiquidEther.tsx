'use client';

import React from 'react';
import './LiquidEther.css';
interface LiquidEtherProps {
  className?: string;
}

export default function LiquidEther({ className = '' }: LiquidEtherProps) {
  return (
    <div className={`liquid-ether ${className}`}>
      <div className="liquid-ether__blob liquid-ether__blob--1" />
      <div className="liquid-ether__blob liquid-ether__blob--2" />
      <div className="liquid-ether__blob liquid-ether__blob--3" />
      <div className="liquid-ether__blob liquid-ether__blob--4" />
      <svg className="liquid-ether__svg-filter">
        <defs>
          <filter id="liquid-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
