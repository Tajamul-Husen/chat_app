import React from "react";

const useConnection = (socket) => {
  const [connectionLost, setConnectionLost] = React.useState(false);
  React.useEffect(() => {
    socket.on("connect_error", function (err) {
      console.log(err);
      if (!connectionLost) setConnectionLost(true);
    });

    socket.on("reconnect", (msg) => {
      console.log("re-attempt", msg);
      setConnectionLost(false);
    });
  }, [connectionLost]);

  return {
    connection: connectionLost,
  };
};

export default useConnection;
