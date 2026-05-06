import MobileSidebarExplorer from '../../store-layout/sidebar/MobileSidebarExplorer';
import Logo from '../logo/Logo';
import HeaderMenu from './header-menu/HeaderMenu';
import SearchInput from './search-input/SearchInput';

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b px-4 py-3">
      <div className="md:hidden mt-0">
        <MobileSidebarExplorer />
      </div>
      <div className="hidden lg:block">
        <Logo />
      </div>

      <SearchInput />
      <div className="hidden md:flex">
        <HeaderMenu />
      </div>
    </div>
  );
};

export default Header;
