import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { Stack} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import LaptopChromebookIcon from "@mui/icons-material/LaptopChromebook";
import SvgIcon from "@mui/material/SvgIcon";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from './nextup-lightpurple.webp'

// Home icon function
function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    // Clear user session
    localStorage.removeItem("user");
    // Redirect to home page
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <img src={logo} alt="" className={styles.nextUpPurple}/>
        <ul className={styles.list}>
          <li>
            {location.pathname !== "/dashboard" && (
              <Stack
                direction="row"
                alignItems="center"
                gap={3}
                onClick={() => navigate("/dashboard")}
                className={styles.link}
              >
                <HomeIcon fontSize="large"/>
                Profile
              </Stack>
            )}
          </li>
          <li>
            <Stack direction="row" alignItems="center" gap={3}>
              <WorkOutlineIcon className="alljobs-icon"></WorkOutlineIcon>
              <NavLink to="/allJobs" className={styles.link}>
                All Jobs
              </NavLink>
            </Stack>
          </li>
          <li>
            <Stack direction="row" alignItems="center" gap={3}>
              <PieChartOutlineIcon></PieChartOutlineIcon>
              <NavLink to="/stats" className={styles.link}>
                My Stats
              </NavLink>
            </Stack>
          </li>
          <li>
            <Stack direction="row" alignItems="center" gap={3}>
              <LaptopChromebookIcon></LaptopChromebookIcon>
              <NavLink to="/resources" className={styles.link}>
                {" "}
                Resources
              </NavLink>
            </Stack>
          </li>
        </ul>
      </div>
      <div className="signout-btn">
        <Button
          variant="outlined"
          onClick={handleSignOut}
          className={styles.signOut}
        >
          Sign out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
