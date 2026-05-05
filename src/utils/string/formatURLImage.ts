const formatURLImage = (url: string) => {
  return url.split('/uploads/products/')[1];
};

export default formatURLImage;
