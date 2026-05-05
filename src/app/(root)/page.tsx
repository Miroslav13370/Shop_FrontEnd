import { Metadata } from 'next';

import Home from './Home';

export const metadata: Metadata = {
  title: 'Ваш шоппинг, ваше удовольствие - все в одном месте',
};

const HomePage = async () => {
  return <Home />;
};

export default HomePage;
