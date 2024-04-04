// adding playlistsLayout.tsx because metadata import in current layout.tsx doesn't
// allow [id].tsx to use it due to 'use client;' line

import { Container } from "react-bootstrap";
import Navigation from "@/components/navigation";

import "./globals.css";

import "bootstrap/dist/css/bootstrap.min.css";

const PlaylistsLayout = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  return (
    <>
      <Navigation />
      
      <Container>
        {children}
      </Container>
    </>
  );
};

export default PlaylistsLayout;
