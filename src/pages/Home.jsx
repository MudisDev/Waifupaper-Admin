import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../routes/NavBar";
import "../styles/appstyles.css";
import { show_count_total } from "../config/Url_Config";

export const Home = () => {
  const [wallpapers, setWallpapers] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [waifus, setWaifus] = React.useState(null);

  const fetchTotalWallpapers = async () => {
    try {
      const response = await fetch(`${show_count_total}?tabla=imagen`);
      const data = await response.json();
      console.log("Total wallpapers =>", data);

      if (!data.Error) {
        setWallpapers(data.total);
      }
    } catch (error) {
      console.error("Error fetching total wallpapers:", error);
    }
  };

  const fetchTotalUsers = async () => {
    try {
      const response = await fetch(`${show_count_total}?tabla=usuario`);
      const data = await response.json();
      console.log("Total usuarios =>", data);

      if (!data.Error) {
        setUsers(data.total);
      }
    } catch (error) {
      console.error("Error fetching total users:", error);
    }
  };

  const fetchTotalWaifus = async () => {
    try {
      const response = await fetch(`${show_count_total}?tabla=personaje`);
      const data = await response.json();
      console.log("Total waifus =>", data);

      if (!data.Error) {
        setWaifus(data.total);
      }
    } catch (error) {
      console.error("Error fetching total waifus:", error);
    }
  };

  useEffect(() => {
    fetchTotalWallpapers();
    fetchTotalUsers();
    fetchTotalWaifus();
  }, []);

  return (
    <div>
      <NavBar />
      <h1> WaifuPaper - Dashboard</h1>
      <div className="dashboard-container">
        <div className="dashboard-card">
          Total Waifus <p></p>
          {waifus}
        </div>
        <div className="dashboard-card">
          Total Usuarios<p></p>
          {users}
        </div>
        <div className="dashboard-card">
          Total Wallpapers
          <p></p>
          {wallpapers}
        </div>
      </div>
    </div>
  );
};
