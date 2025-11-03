"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-cinzel font-bold text-gold mb-4">
            Erreur de chargement
          </h2>
          <p className="text-cream-white/70 mb-6">
            Une erreur s&apos;est produite. Veuillez réessayer.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
              size="lg"
              className="gap-2"
            >
              <RefreshCw className="h-5 w-5" />
              Réessayer
            </Button>
            <Link href="/">
              <Button variant="outline" size="lg" className="gap-2">
                <Home className="h-5 w-5" />
                Accueil
              </Button>
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

