"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Users, Code, ChevronRight } from "lucide-react";
import Image from "next/image";

const sections = [
  {
    id: "organizers",
    icon: User,
    title: "Organizers",
    items: [
      "Create certified event collection",
      "Configure attendance parameters",
      "Generate QR codes for distribution",
      "Monitor minting activity in real-time",
    ],
    diagram: "/organizer.png",
  },
  {
    id: "attendees",
    icon: Users,
    title: "Attendees",
    items: [
      "Scan QR code at event venue",
      "Mint attendance NFT to wallet",
      "Verify ownership on-chain",
      "Display proof across platforms",
    ],
    diagram: "/attendee.png",
  },
];

export default function HowItWorks() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <section className="relative py-32 px-8 bg-[#1A1A1A] overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gMTAwIDAgTCAwIDAgMCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJFMkUyRSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-[#34D399] text-xs tracking-widest uppercase mb-4">
            Protocol Flow
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white">
            How It Works
          </h2>
        </motion.div>

        <div className="space-y-1">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setActiveSection(section.id)}
              onMouseLeave={() => setActiveSection(null)}
              className="group relative"
            >
              <motion.div
                className="relative border-t border-[#2E2E2E] hover:border-[#34D399]/40 transition-colors cursor-pointer"
                animate={{
                  x: activeSection === section.id ? 40 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between py-8 px-8">
                  <div className="flex items-center gap-8">
                    <div className="flex items-center justify-center w-14 h-14 bg-[#0B0B0B] border border-[#2E2E2E] group-hover:border-[#34D399] rounded-2xl transition-all">
                      <section.icon
                        size={24}
                        className="text-[#4B4B4B] group-hover:text-[#34D399] transition-colors"
                      />
                    </div>

                    <div>
                      <div className="text-[#4B4B4B] group-hover:text-[#34D399] text-xs tracking-widest uppercase mb-1 transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <h3 className="text-3xl font-serif text-white">
                        {section.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: activeSection === section.id ? "auto" : 0,
                    opacity: activeSection === section.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 flex gap-12">
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-4">
                        {section.items.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-3 p-4 bg-[#0B0B0B] border border-[#2E2E2E] rounded-xl"
                          >
                            <div className="w-1.5 h-1.5 bg-[#34D399] rounded-full mt-2 flex-shrink-0" />
                            <span className="text-[#4B4B4B] text-sm leading-relaxed">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* <div className="flex-1">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-full h-64 bg-[#0B0B0B] border border-[#34D399]/20 rounded-2xl p-8 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMzNEQzOTkiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />

                        <div className="relative z-10 flex items-center justify-center h-full">
                          <motion.div
                            animate={{
                              scale: [1, 1.1, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute w-32 h-32 border-2 border-[#34D399]/30 rounded-full"
                          />
                          <motion.div
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0.8, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                            className="absolute w-20 h-20 border-2 border-[#34D399]/50 rounded-full"
                          />
                          <section.icon
                            size={32}
                            className="text-[#34D399] relative z-10"
                          />
                        </div>
                        <Image 
                          src={section.diagram}
                          alt={`${section.title} Diagram`}
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                    </div> */}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
