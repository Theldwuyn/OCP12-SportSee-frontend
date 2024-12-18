import Yoga from '../assets/yoga.svg';
import Swim from '../assets/swim.svg';
import Bike from '../assets/bike.svg';
import Dumbbell from '../assets/dumbbell.svg';

// style
import '../scss/components/sideBar.scss';

function SideBar() {
  return (
    <div className="flex_col sidebar">
      <img src={Yoga} alt="yoga" className="sidebar__image" />
      <img src={Swim} alt="swim" className="sidebar__image" />
      <img src={Bike} alt="bike" className="sidebar__image" />
      <img src={Dumbbell} alt="dumbbell" className="sidebar__image" />
      <p className="sidebar__text">Copyright, SportSee 2020</p>
    </div>
  );
}

export default SideBar;
