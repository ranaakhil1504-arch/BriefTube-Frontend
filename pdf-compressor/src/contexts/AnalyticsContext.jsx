
import { createContext } from "react";
import analytics from "../lib/analytics";

const AnalyticsContext = createContext();

export function AnalyticsProvider({ children }) {
  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
}

// Export the context
export { AnalyticsContext };
