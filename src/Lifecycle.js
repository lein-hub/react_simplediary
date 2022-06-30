import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("Mounted!");
    return () => {
      console.log("Unmounted!");
    }
  }, []);

  return <div>Unmount Testing Component</div>
}

const Lifecycle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  return <div style={{ padding: 20 }}>
    <button onClick={toggle}>On/Off</button>
    {isVisible && <UnmountTest />}
  </div>
}

export default Lifecycle;