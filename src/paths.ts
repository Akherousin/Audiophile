type Category = 'headphones' | 'speakers' | 'earphones';

const paths = {
  home() {
    return '/';
  },

  showCategoryPage(category: Category) {
    return `/${category}`;
  },
};

export default paths;
