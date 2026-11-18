import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { CustomCursor } from "./_components/CustomCursor";
import "./globals.css";

const GridOverlay = process.env.NODE_ENV === "development"
  ? dynamic(() => import("./_components/GridOverlay").then((module) => module.GridOverlay))
  : () => null;

export const metadata: Metadata = {
  title: {
    default: "Sacred Force Tattoo — Buenos Aires",
    template: "%s — Sacred Force Tattoo",
  },
  description:
    "Estudio de tatuajes en Tribunales, Buenos Aires. Conocé al equipo de Sacred Force Tattoo y explorá sus trabajos.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR">
      <body>
        <noscript>
          <style>{"[data-reveal] { visibility: visible !important; }"}</style>
        </noscript>
        {children}
        <CustomCursor />
        <GridOverlay />
      </body>
    </html>
  );
}
