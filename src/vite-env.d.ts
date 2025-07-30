/// <reference types="vite/client" />

declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

declare module 'react/jsx-runtime' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

declare module 'lucide-react' {
  import React from 'react';
  
  export interface IconProps {
    size?: number | string;
    className?: string;
  }
  
  export const MessageCircle: React.FC<IconProps>;
  export const X: React.FC<IconProps>;
  export const Send: React.FC<IconProps>;
  export const Bot: React.FC<IconProps>;
  export const User: React.FC<IconProps>;
  export const RotateCcw: React.FC<IconProps>;
}
