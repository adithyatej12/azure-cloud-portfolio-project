"use client";

/**
 * @file components/ui/MermaidDiagram.tsx
 * @description Dynamic client-side Mermaid.js diagram renderer turning raw mermaid code into beautiful dark-mode SVG diagrams.
 */

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  code: string;
}

export default function MermaidDiagram({ code }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHtml, setSvgHtml] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const cleanCode = code.trim();

    (async () => {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            darkMode: true,
            background: "#080808",
            primaryColor: "#f59e0b",
            primaryTextColor: "#ffffff",
            primaryBorderColor: "#f59e0b",
            lineColor: "#f59e0b",
            secondaryColor: "#10b981",
            tertiaryColor: "#18181b",
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
          },
          securityLevel: "loose",
        });

        const id = `mermaid-proj-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(id, cleanCode);

        if (isMounted) {
          setSvgHtml(svg);
          setError(false);
        }
      } catch (err) {
        console.error("Failed to render Mermaid diagram:", err);
        if (isMounted) setError(true);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [code]);

  if (error || !code) {
    return (
      <div className="my-6 p-5 rounded-2xl border border-zinc-800 bg-[#080808] font-mono text-xs text-zinc-300 overflow-x-auto">
        <div className="text-amber font-bold mb-2 uppercase text-[11px] tracking-wider">
          📐 System Architecture Flow
        </div>
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
    );
  }

  return (
    <div className="my-8 p-6 rounded-2xl border border-zinc-800/80 bg-[#080808] shadow-2xl overflow-x-auto text-center group transition-colors hover:border-amber/40">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-6">
        <span className="font-mono text-xs font-bold text-amber tracking-widest uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber animate-pulse" />
          SYSTEM ARCHITECTURE DIAGRAM
        </span>
        <span className="font-mono text-[10px] text-zinc-500 uppercase">
          Interactive Flowchart
        </span>
      </div>

      {svgHtml ? (
        <div
          ref={containerRef}
          className="mermaid-svg-container overflow-x-auto flex justify-center py-2 [&_svg]:max-w-full [&_svg]:h-auto"
          dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
      ) : (
        <div className="py-12 flex flex-col items-center justify-center space-y-3 text-zinc-500 font-mono text-xs">
          <div className="w-6 h-6 border-2 border-amber border-t-transparent rounded-full animate-spin" />
          <span>Rendering Architecture Diagram...</span>
        </div>
      )}
    </div>
  );
}
