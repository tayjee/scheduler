import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    if(!replace) {
      setHistory([...history, newMode]);
    }
  };

  function back() {
    if(history.length > 1) {
      const recentHistory = [...history];
      recentHistory.pop();
      setMode(recentHistory[recentHistory.length - 1])
      setHistory(recentHistory);
    }
  }
  
  return { mode, transition, back };  
};

