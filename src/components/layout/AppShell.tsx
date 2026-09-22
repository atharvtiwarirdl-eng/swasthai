
import { useState, type PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

import { appRoutes } from "../../config/navigation";
import { NotificationPanel } from "../health/NotificationPanel";
import { Drawer } from "../ui/Drawer";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

import { useNotifications } from "../../hooks/useNotifications";

export function AppShell({ children }: PropsWithChildren) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const location = useLocation();
  const { data } = useNotifications();
  const reduceMotion = useReducedMotion();

  const activeRoute =
    appRoutes.find((route) =>
      location.pathname.startsWith(route.to),
    ) ?? appRoutes[0];

  const unreadCount = (data ?? []).filter(
    (item) => !item.read,
  ).length;

  const notifications = (data ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    message: item.message,
    time: item.timestamp,
    priority: item.priority,
    read: item.read,
    type: item.type,
  }));

  return (
    <div className="min-h-screen md:grid md:grid-cols-[260px_1fr]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Navigation */}
      {mobileNavOpen ? (
        <div className="fixed inset-0 z-30 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation"
          />

          <div className="surface-strong relative z-10 h-full w-[85%] max-w-xs">
            <Sidebar
              compact
              onNavigate={() => setMobileNavOpen(false)}
            />
          </div>
        </div>
      ) : null}

      {/* Main Application Area */}
      <div className="min-w-0">
        <Navbar
          onOpenNotifications={() => setDrawerOpen(true)}
          onOpenNav={() => setMobileNavOpen(true)}
          pageTitle={activeRoute.label}
          pageSubtitle={activeRoute.subtitle}
          unreadCount={unreadCount}
        />

        <main className="mx-auto w-full max-w-[1220px] p-4 md:p-6">
          <motion.div
            key={location.pathname}
            initial={
              reduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 8,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: reduceMotion ? 0.01 : 0.24,
            }}
          >
            {children ?? <Outlet />}
          </motion.div>
        </main>
      </div>

      {/* Notification Drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Notifications"
      >
        <NotificationPanel notifications={notifications} />
      </Drawer>
    </div>
  );
}
