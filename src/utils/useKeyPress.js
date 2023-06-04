import { useEffect, useState } from "react";

function useKeyPress(targetKey, ref, focus) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = (event) => {
      if (event.key === targetKey) {
        if (focus !== null) event.preventDefault();
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    // Copy ref.current to a variable inside the effect to ensure
    // the correct value is used in the cleanup function.
    const reference = ref.current;

    reference?.addEventListener("keydown", downHandler);
    reference?.addEventListener("keyup", upHandler);

    return () => {
      reference?.removeEventListener("keydown", downHandler);
      reference?.removeEventListener("keyup", upHandler);
    };
  }, [targetKey, ref, focus]);

  return keyPressed;
}

export default useKeyPress;
