import { createContext, useState,useContext, ReactNode } from "react";

const SidebarContext = createContext<{
  isCollapsed: boolean;
  toggleSidebarcollapse: () => void;
}>({
  isCollapsed: false,
  toggleSidebarcollapse: () => {},
});

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useNoteContext must be used within a NoteProvider");
  }
  return context;
}

export const SidebarProvider = ({ children }: Props) => {

  const [isCollapsed, setCollapse] = useState<boolean>(false);

  const toggleSidebarcollapse = () => {
    setCollapse((prev) => !prev);
  };
  
  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebarcollapse }}>
    {children}
    </SidebarContext.Provider>);
};

interface Props {
  children: React.ReactNode | React.ReactNode[];
}
