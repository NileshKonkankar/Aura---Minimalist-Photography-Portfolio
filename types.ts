export interface Photo {
  id: string;
  url: string;
  title: string;
  category: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
}
