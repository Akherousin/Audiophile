export type Category = 'headphones' | 'speakers' | 'earphones';

export type Product = {
  id: number;
  slug: string;
  name: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  category: Category;
  categoryImage: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  isNew: boolean;
  price: number;
  description: string;
  features: string;
  includes: { quantity: number; item: string }[];
  gallery: {
    first: { mobile: string; tablet: string; desktop: string };
    second: { mobile: string; tablet: string; desktop: string };
    third: { mobile: string; tablet: string; desktop: string };
  };
  others: Pick<Product, 'slug' | 'name' | 'image'>[];
};
