import axios from "axios";

export default axios.create({
  baseURL: "https://backendtutorialapp.onrender.com/api/tutorials",
  headers: {
    "Content-type": "application/json"
  }
});