import React, { forwardRef } from 'react';

export interface ResponsiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}

const generateUnsplashSrcSet = (src: string) => {
  try {
    const url = new URL(src);
    if (!url.hostname.includes('unsplash.com')) return undefined;
    
    // Unsplash API best practices for optimization
    url.searchParams.set('auto', 'format,compress'); 
    url.searchParams.set('q', '75'); 
    
    // Generate different widths for srcset
    const widths = [400, 800, 1200, 1600, 2000, 2400];
    const srcSetParts = widths.map(w => {
      url.searchParams.set('w', w.toString());
      return `${url.toString()} ${w}w`;
    });
    
    return srcSetParts.join(', ');
  } catch (e) {
    return undefined; // Fallback for invalid URLs or relative paths
  }
};

/**
 * A highly optimized image component that automatically generates `srcset`
 * and applies best-practice performance attributes based on Unsplash's dynamic image API.
 */
export const ResponsiveImage = forwardRef<HTMLImageElement, ResponsiveImageProps>(
  ({ src, alt, sizes = "100vw", priority = false, className, ...props }, ref) => {
    const srcSet = generateUnsplashSrcSet(src);
    
    return (
      <img
        ref={ref}
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? sizes : undefined}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={className}
        {...props}
      />
    );
  }
);

ResponsiveImage.displayName = 'ResponsiveImage';
