import React, { useEffect } from "react";

type SetChecked = (value: React.SetStateAction<boolean>) => void;

const useAnimation = (setChecked: SetChecked): void => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setChecked(true);
    }
    return () => {
      mounted = false;
    };
  }, []);
};

export default useAnimation;
