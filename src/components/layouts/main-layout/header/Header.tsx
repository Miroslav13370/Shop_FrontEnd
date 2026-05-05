import Logo from '../logo/Logo';
import HeaderMenu from './header-menu/HeaderMenu';
import SearchInput from './search-input/SearchInput';

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <Logo />
      <SearchInput />
      <HeaderMenu />
    </div>
  );
};

export default Header;
