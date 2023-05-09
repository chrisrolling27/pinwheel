import React, { useState } from "react";
import PinwheelModal from "@pinwheel/react-modal";
import "./App.css";

function Pinwheel() {
  const [linkToken, setLinkToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchLinkToken = async () => {
    const response = await fetch("/pinwheel/link_tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        institution: "BankingON",
        products: ["direct_deposit_switch"],
      }),
    });
    const data = await response.json();
    setLinkToken(data.link_token);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="Pinny"> hello pinny here</div>
    </div>
  );
}

export default Pinwheel;
