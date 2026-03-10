import { FiSearch } from "react-icons/fi";
import { FaHome } from "react-icons/fa";
import { PiTelevisionBold } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";

export const navigation = [
  {
    label: "TV Shows",
    href: "tv",
    icon: <PiTelevisionBold />,
  },
  {
    label: "Movies",
    href: "movie",
    icon: <BiSolidMoviePlay />,
  },
];

export const MobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: <FaHome />,
  },
  {
    label: "Search",
    href: "/Search",
    icon: <FiSearch/>,
  },
  ...navigation,
];
