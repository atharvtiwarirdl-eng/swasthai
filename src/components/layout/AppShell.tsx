import { useState, type PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import { notifications } from "../../data/syntheticHealthData";
import { Drawer } from "../ui/Drawer";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { NotificationPanel } from "../health/NotificationPanel";

export function AppShell({ children }: PropsWithChildren) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen md:grid md:grid-cols-[260px_1fr]">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {mobileNavOpen ? (
        <div className="fixed inset-0 z-30 md:hidden">
          <button className="absolute inset-0 bg-black/60" onClick={() => setMobileNavOpen(false)} aria-label="Close navigation" />
          <div className="surface-strong relative z-10 h-full w-[85%] max-w-xs">
            <Sidebar compact onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </div>
      ) : null}
      <div className="min-w-0">
        <Navbar onOpenNotifications={() => setDrawerOpen(true)} onOpenNav={() => setMobileNavOpen(true)} />
        <main className="mx-auto w-full max-w-[1220px] p-4 md:p-6">{children ?? <Outlet />}</main>
      </div>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Notifications">
        <NotificationPanel notifications={notifications} />
      </Drawer>
    </div>
  );
}