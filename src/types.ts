export type Category = 'headphones' | 'speakers' | 'earphones';

export type Product = {
  id: number;
  slug: string;
  name: string;
  shortName: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
    alt: string;
  };
  category: Category;
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
    alt: string;
  };
  isNew: boolean;
  price: number;
  description: string;
  features: string;
  includes: { quantity: number; item: string }[];
  gallery: {
    first: { mobile: string; tablet: string; desktop: string; alt: string };
    second: { mobile: string; tablet: string; desktop: string; alt: string };
    third: { mobile: string; tablet: string; desktop: string; alt: string };
  };
  others: Pick<Product, 'slug' | 'name' | 'image'>[];
};
