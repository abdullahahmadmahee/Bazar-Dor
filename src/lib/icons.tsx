import React from 'react';

const baseUrl = "https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg";

const twemojiMap: Record<string, string> = {
  "🍚": `${baseUrl}/1f35a.svg`, 
  "🫘": `${baseUrl}/1fad8.svg`, 
  "🛢️": `${baseUrl}/1f6e2.svg`, 
  "🫙": `${baseUrl}/1fad9.svg`, 
  "🥬": `${baseUrl}/1f96c.svg`, 
  "🐟": `${baseUrl}/1f41f.svg`, 
  "🍗": `${baseUrl}/1f357.svg`, 
  "🥛": `${baseUrl}/1f95b.svg`, 
  "🌶️": `${baseUrl}/1f336.svg`, 
  "🥔": `${baseUrl}/1f954.svg`, 
  "🧅": `${baseUrl}/1f9c5.svg`, 
  "🍆": `${baseUrl}/1f346.svg`, 
  "🟢": `${baseUrl}/1f7e2.svg`, 
  "🐠": `${baseUrl}/1f420.svg`, 
  "🦐": `${baseUrl}/1f990.svg`, 
  "🥩": `${baseUrl}/1f969.svg`, 
  "🍖": `${baseUrl}/1f356.svg`, 
  "🦆": `${baseUrl}/1f986.svg`, 
  "🥚": `${baseUrl}/1f95a.svg`, 
  "🥣": `${baseUrl}/1f963.svg`, 
  "🧈": `${baseUrl}/1f9c8.svg`, 
  "🫚": `${baseUrl}/1fada.svg`, 
  "🧄": `${baseUrl}/1f9c4.svg`, 
  "🍃": `${baseUrl}/1f343.svg`, 
};

export const renderIcon = (emoji: string, className: string = "w-6 h-6") => {
  const svgUrl = twemojiMap[emoji];
  if (svgUrl) {
    return <img src={svgUrl} alt="icon" className={`${className} inline-block`} />;
  }
  return <span className={className}>{emoji}</span>;
};