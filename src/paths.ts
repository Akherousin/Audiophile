import { type Category } from './types';

const paths = {
  home() {
    return '/';
  },

  showCategoryPage(category: Category) {
    return `/category/${category}`;
  },

  showProductPage(slug: string) {
    return `/product/${slug}`;
  },

  showCheckoutPage() {
    return '/checkout';
  },
};

export default paths;
