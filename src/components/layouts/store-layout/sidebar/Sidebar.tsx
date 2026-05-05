import Logo from '../../main-layout/logo/Logo';
import Navigation from './navigation/navigation';

const Sidebar = () => {
  return (
    <div className="flex flex-col pl-3 mt-3 h-full pr-2">
      <Logo />
      <Navigation />
    </div>
  );
};

export default Sidebar;
