"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { modules } from "@/app/data/data";
import { X } from "lucide-react";

export default function ProtocolModules() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  return (
    <section className="relative py-32 px-8 bg-[#0B0B0B] overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-[#0B0B0B] via-[#0B0B0B] to-[#1A1A1A]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <div className="text-[#34D399] text-xs tracking-widest uppercase mb-4">
            Core Functions
          </div>
          <h2 className="text-5xl md:text-7xl text-white">The Protocol</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedModule(module.id)}
              className="group relative cursor-pointer"
            >
              <motion.div
                className="relative h-[500px] bg-[#1A1A1A] border border-[#2E2E2E] rounded-2xl p-8 overflow-hidden"
                whileHover={{ scale: 1.02, borderColor: "#34D399" }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#34D399]/5 rounded-full blur-3xl group-hover:bg-[#34D399]/10 transition-all duration-500" />

                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 bg-[#34D399]/10 border border-[#34D399]/30 rounded-2xl mb-8 group-hover:bg-[#34D399]/20 group-hover:border-[#34D399] transition-all"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <module.icon size={28} className="text-[#34D399]" />
                </motion.div>

                <div className="text-[#4B4B4B] text-xs tracking-widest uppercase mb-2">
                  {module.subtitle}
                </div>

                <h3 className="text-2xl text-white mb-4">{module.title}</h3>

                <p className="text-[#4B4B4B] leading-relaxed mb-8">
                  {module.description}
                </p>

                <div className="space-y-3">
                  {module.features.slice(0, 2).map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#34D399] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm text-[#4B4B4B]">{feature}</span>
                    </div>
                  ))}
                </div>

                <motion.div
                  className="absolute bottom-8 left-8 right-8 text-xs text-[#34D399] opacity-40 group-hover:opacity-100 transition-opacity"
                  whileHover={{ y: -2 }}
                >
                  {module.code}
                </motion.div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#34D399] to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#34D399] to-transparent" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedModule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-[#0B0B0B]/95 backdrop-blur-sm"
            onClick={() => setSelectedModule(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#1A1A1A] border border-[#34D399]/30 rounded-3xl p-12 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#34D399]/10 rounded-full blur-3xl" />

              <button
                onClick={() => setSelectedModule(null)}
                className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center bg-[#2E2E2E] hover:bg-[#34D399]/20 rounded-full transition-colors"
              >
                <X size={20} className="text-[#34D399]" />
              </button>

              {modules.find((m) => m.id === selectedModule) && (
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    {(() => {
                      const Icon = modules.find(
                        (m) => m.id === selectedModule
                      )!.icon;
                      return (
                        <div className="w-16 h-16 bg-[#34D399]/10 border border-[#34D399]/30 rounded-2xl flex items-center justify-center">
                          <Icon size={28} className="text-[#34D399]" />
                        </div>
                      );
                    })()}
                    <div>
                      <div className="text-[#4B4B4B] text-xs tracking-widest uppercase">
                        {modules.find((m) => m.id === selectedModule)!.subtitle}
                      </div>
                      <h3 className="text-3xl text-white">
                        {modules.find((m) => m.id === selectedModule)!.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-lg text-[#4B4B4B] leading-relaxed mb-8">
                    {modules.find((m) => m.id === selectedModule)!.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    {modules
                      .find((m) => m.id === selectedModule)!
                      .features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-3 p-4 bg-[#0B0B0B] border border-[#2E2E2E] rounded-xl"
                        >
                          <div className="w-2 h-2 bg-[#34D399] rounded-full mt-1.5 shrink-0" />
                          <span className="text-white">{feature}</span>
                        </motion.div>
                      ))}
                  </div>

                  <div className="p-6 bg-[#0B0B0B] border border-[#34D399]/20 rounded-xl">
                    <div className="text-[#34D399] text-xs tracking-widest uppercase mb-3">
                      Code Example
                    </div>
                    <code className="text-[#34D399] text-sm">
                      {modules.find((m) => m.id === selectedModule)!.code}
                    </code>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
