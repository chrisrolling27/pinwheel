import "./App.css";
import React, { useState, useEffect } from "react";
import PinwheelModal from "@pinwheel/react-modal";

const App = () => {
  const [linkToken, setLinkToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchLinkToken = async () => {
      const response = await fetch("/pinwheel/link_tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_user_id: "1", 
          institution: "bankingON", 
          products: ["direct_deposit_switch"], 
        }),
      });
      const data = await response.json();
      setLinkToken(data.link_token);
      setIsOpen(true);
    };

    fetchLinkToken();
  }, []);

  const onSuccess = (event) => {
    console.log("Success:", event);
    setIsOpen(false);
  };

  const onError = (event) => {
    console.log("Error:", event);
    setIsOpen(false);
  };

  const onExit = (event) => {
    console.log("Exit:", event);
    setIsOpen(false);
  };

  return (
    <div>
      {linkToken && (
        <PinwheelModal
          linkToken={linkToken}
          open={isOpen}
          onSuccess={onSuccess}
          onError={onError}
          onExit={onExit}
        />
      )}
    </div>
  );
};

export default App;
