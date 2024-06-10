import React from "react";
import { APIAuthenticated } from "../../http";
import Loader from "../../globals/components/loader/Loader";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyCart } from "../../store/cartSlice";

const KhaltiSuccess = () => {
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const pidx = queryParams.get("pidx");
  const [loading, setLoading] = useState(true);

  const verifyPidx = async () => {
    try {
      const response = await APIAuthenticated.post("/payment/verifypidx", {
        pidx,
      });

      if (response.status === 200) {
        setLoading(false);
        alert(response.data.message);
        //state bata pani cart clear

        dispatch(emptyCart());
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    verifyPidx();
  }, []);

  if (loading) {
    return <Loader status="Verifying" />;
  } else {
    return <Loader status="Verified" />;
  }
};

export default KhaltiSuccess;
