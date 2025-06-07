import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActivatePage = () => {
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      axios.post("/service/user/activation", { activation_token: token })
        .then(res => {
          alert(res.data.message);
        })
        .catch(err => {
          alert(err.response?.data?.message || "Activation failed");
        });
    }
  }, [token]);

  return <div>Activating your account...</div>;
};

export default ActivatePage;