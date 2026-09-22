import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { constellationLinks, constellationNodes } from "../data/syntheticHealthData";

export function LandingPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen pb-16">
      <header className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-4 py-6 md:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-2)]">Digital Health Intelligence</p>
          <p className="text-2xl font-semibold tracking-tight">SwasthAI</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Start Demo</Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-90px)] w-full max-w-[1280px] items-center gap-12 px-4 md:grid-cols-[1.05fr_1fr] md:px-8">
        <motion.section
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--accent)]">SwasthAI Constellation Layer</p>
          <h1 className="mt-4 max-w-xl text-5xl font-semibold leading-[1.03] md:text-6xl">SwasthAI turns fragmented records into one living health picture.</h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[var(--text-1)]">
            Built for patients first: vitals, reports, symptoms, sleep, activity and appointments read as one connected care system.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/dashboard">
              <Button className="px-5 py-2.5">View Patient Dashboard</Button>
            </Link>
            <Link to="/health">
              <Button variant="secondary" className="px-5 py-2.5">
                Explore Health Overview
              </Button>
            </Link>
          </div>
        </motion.section>

        <motion.section
          className="relative h-[460px] overflow-hidden rounded-[36px] border border-[var(--line-soft)] bg-[radial-gradient(circle_at_40%_30%,rgba(99,215,232,0.22),rgba(14,24,49,0.92)_58%)]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute inset-0 constellation-grid" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {constellationLinks.map((link, index) => {
              const from = constellationNodes.find((node) => node.id === link.from);
              const to = constellationNodes.find((node) => node.id === link.to);
              if (!from || !to) return null;
              return (
                <motion.line
                  key={link.id}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(168,189,236,0.42)"
                  strokeWidth={Math.max(0.4, link.weight)}
                  initial={reduceMotion ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: index * 0.08 }}
                />
              );
            })}
          </svg>
          {constellationNodes.map((node, index) => (
            <motion.div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.09 }}
            >
              <motion.div
                className="h-3.5 w-3.5 rounded-full border border-white/30 bg-[var(--accent)]"
                animate={
                  reduceMotion
                    ? { opacity: 1 }
                    : {
                        boxShadow: [
                          "0 0 0 rgba(99,215,232,0)",
                          "0 0 16px rgba(99,215,232,0.6)",
                          "0 0 0 rgba(99,215,232,0)",
                        ],
                      }
                }
                transition={{ duration: 2.8, repeat: reduceMotion ? 0 : Infinity, delay: index * 0.2 }}
              />
              <p className="mt-1 text-xs text-[var(--text-2)]">{node.label}</p>
            </motion.div>
          ))}
        </motion.section>
      </main>

      <section className="mx-auto mt-10 grid w-full max-w-[1280px] gap-6 px-4 md:grid-cols-3 md:px-8">
        <article className="surface-soft rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-2)]">What It Is</p>
          <p className="mt-2 text-lg font-semibold">Personal health command interface</p>
          <p className="mt-2 text-sm text-[var(--text-1)]">Built around patient continuity instead of disconnected hospital modules.</p>
        </article>
        <article className="surface-soft rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-2)]">Why Different</p>
          <p className="mt-2 text-lg font-semibold">Constellation relationships</p>
          <p className="mt-2 text-sm text-[var(--text-1)]">Every visual connection reflects data dependence between domains.</p>
        </article>
        <article className="surface-soft rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-2)]">What You Can Do</p>
          <p className="mt-2 text-lg font-semibold">Track, review, prepare visits</p>
          <p className="mt-2 text-sm text-[var(--text-1)]">Navigate overview, timeline, and reports with one coherent patient story.</p>
        </article>
      </section>
    </div>
  );
}