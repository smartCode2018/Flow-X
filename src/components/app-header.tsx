import {SidebarTrigger} from "./ui/sidebar";

export const AppHeader = () => {
  return (
    <header className="flex items-center shrink-0 gap-2 px-4 h-14 border-b bg-background">
      <SidebarTrigger className="md:hidden" />
    </header>
  );
};
