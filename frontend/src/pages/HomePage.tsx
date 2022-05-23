import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoginDialog from "../components/LoginDialog";

type Props = {};

const headingStyle = {
  textAlign: "center" as const,
  color: "#ffffff",
  marginTop: "10%",
  filter: "brightness(120%)",
};

const subheadingStyle = {
  color: "#ffffff",
  textAlign: "center" as const,
  filter: "brightness(120%)",
};

const buttonStyle = {
  position: "absolute",
  left: 0,
  right: 0,
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "15%",
  width: 170,
  color: "#ffffff",
  borderColor: "#ffffff",
  ":hover": {
    bgcolor: "white",
    color: "black",
    borderColor: "white",
  },
};

const HomePage: React.FC<Props> = () => {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const navigate = useNavigate();
  const handleClick = () => {
    if (userInfo[0]) {
      navigate("/write");
    } else {
      handleOpenLoginForm();
    }
  };

  const [openLoginForm, setOpenLoginForm] = useState<boolean>(false);

  const handleOpenLoginForm = () => {
    setOpenLoginForm(true);
  };

  const handleCloseLoginForm = () => {
    setOpenLoginForm(false);
  };

  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "1.5rem", marginLeft: "0.1rem" }}
      >
        <Grid
          item
          xs={12}
          sx={{
            backgroundImage:
              "linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ),url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2021)",
            backgroundSize: "cover",
            height: 800,
          }}
        >
          <h1 style={headingStyle}>
            Blog thoughts and mysteries of your personal life
          </h1>
          <h4 style={subheadingStyle}>
            Create your own personal thought catalog
          </h4>
          <Button
            variant="outlined"
            size="large"
            sx={buttonStyle}
            onClick={handleClick}
          >
            Create a blog
          </Button>
        </Grid>
        <LoginDialog open={openLoginForm} handleClose={handleCloseLoginForm} />
      </Grid>
    </div>
  );
};

export default HomePage;
