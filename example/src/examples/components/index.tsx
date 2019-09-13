import React from 'react';
import './index.css';

export const Block = (props:React.PropsWithChildren<{title:string}>) => {
  return <div className="block">
    <h2 className="block-title">{props.title}</h2>
    <div className="block-body">
      {props.children}
    </div>
  </div>
}