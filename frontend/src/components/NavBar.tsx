import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import { logout } from "../redux/slices/userSlice";

const NavBar = () => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [openLoginForm, setOpenLoginForm] = useState<boolean>(false);

  const handleOpenLoginForm = () => {
    setOpenLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setOpenLoginForm(false);
  };

  const [openRegisterForm, setOpenRegisterForm] = useState<boolean>(false);

  const handleOpenRegisterForm = () => {
    setOpenRegisterForm(true);
  };

  const handleCloseRegisterForm = () => {
    setOpenRegisterForm(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Lato",
              fontWeight: "400",
            }}
          >
            <Link to="/" className="logo-link">
              BLOG IT
            </Link>
          </Typography>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            {userInfo[0] ? (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to="/blogs" className="side-link">
                      BLOGS
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="#" className="side-link" onClick={handleLogout}>
                    LOGOUT
                  </Link>
                </MenuItem>
              </Menu>
            ) : (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      to="#"
                      className="side-link"
                      onClick={handleOpenLoginForm}
                    >
                      LOGIN
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link
                    to="#"
                    className="side-link"
                    onClick={handleOpenRegisterForm}
                  >
                    SIGN UP
                  </Link>
                </MenuItem>
              </Menu>
            )}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {userInfo[0] ? (
              <>
                <Link to="/blogs" className="side-link">
                  BLOGS
                </Link>
                <Link to="#" className="side-link" onClick={handleLogout}>
                  LOGOUT
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link
                  to="#"
                  className="side-link"
                  onClick={handleOpenLoginForm}
                >
                  LOGIN
                </Link>
                <Link
                  to="#"
                  className="side-link"
                  onClick={handleOpenRegisterForm}
                >
                  SIGN UP
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <LoginDialog open={openLoginForm} handleClose={handleCloseLoginForm} />
      <RegisterDialog
        open={openRegisterForm}
        handleClose={handleCloseRegisterForm}
      />
    </Box>
  );
};

export default NavBar;
