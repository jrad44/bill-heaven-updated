import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const MAX_MB = 10;
const ACCEPT = ".jpg,.jpeg,.png,.webp";

const Index = () => {
  const [error, setError] = useState<string | null>(null);
  const singleRef = useRef<HTMLInputElement>(null);
  const batchRef = useRef<HTMLInputElement>(null);

  function validateFiles(files: FileList) {
    const tooBig = [...files].find(f => f.size > MAX_MB * 1024 * 1024);
    if (tooBig) {
      return `"${tooBig.name}" is over ${MAX_MB}MB. Please pick smaller files.`;
    }
    return null;
  }

  function onSingleUpload(files: FileList) {
    const v = validateFiles(files);
    if (v) return setError(v);
    setError(null);
    console.log("single upload →", files[0]);
  }

  function onBatchUpload(files: FileList) {
    const v = validateFiles(files);
    if (v) return setError(v);
    setError(null);
    console.log("batch upload →", [...files]);
  }

  return (
    <div className="min-h-screen text-foreground relative overflow-hidden">
      {/* Animated background with soft radial glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-animated opacity-90" />
        <div 
          className="absolute inset-0 mix-blend-soft-light opacity-[0.08]"
          style={{
            backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence baseFrequency=%220.75%22 numOctaves=%222%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22/></svg>')"
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between rounded-full glass-nav px-4 py-2">
            <div className="flex items-center gap-3">
              <div className="size-8 rounded-lg glass-button grid place-items-center text-lg">
                📷
              </div>
              <a href="/" className="font-semibold tracking-tight text-foreground">
                ResizedImage.com
              </a>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              <a href="/image-resize" className="hover:text-foreground transition-colors">
                Image Resize
              </a>
              <a href="/pdf-merge" className="hover:text-foreground transition-colors">
                PDF Merge
              </a>
              <a href="/bg-remove" className="hover:text-foreground transition-colors">
                BG Remover
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="glass-button rounded-full">
                Login
              </Button>
              <Button variant="outline" size="sm" className="glass-button rounded-full">
                Sign Up
              </Button>
              <Button 
                size="sm" 
                className="ml-1 rounded-full font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Unlock Pro $2
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-16 md:pt-24">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          ResizedImage
        </h1>
        <p className="mt-3 text-muted-foreground text-lg">
          Resize images effortlessly for free
        </p>
      </header>

      {/* Upload Cards */}
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Single Image Upload */}
          <GlassCard>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="text-4xl mb-2">🖼️</div>
              <h2 className="text-xl font-semibold text-foreground">Single Image Upload</h2>
              <p className="text-xs text-muted-foreground">Drag & drop or</p>

              <Button
                onClick={() => singleRef.current?.click()}
                className="mt-1 inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2"
              >
                <span className="text-lg">📁</span> Browse File
              </Button>

              <input
                ref={singleRef}
                type="file"
                accept={ACCEPT}
                className="hidden"
                onChange={(e) => e.target.files && onSingleUpload(e.target.files)}
              />

              <p className="mt-3 text-xs text-muted-foreground">
                Supports: JPG, PNG, WEBP (Max {MAX_MB}MB)
              </p>
            </div>
          </GlassCard>

          {/* PRO Batch Upload */}
          <GlassCard>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-4xl">🗝️</div>
                <span className="text-[10px] font-bold bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                  PRO
                </span>
              </div>
              <h2 className="text-xl font-semibold text-foreground">$2.00 PRO Batch Upload</h2>
              <p className="max-w-md text-sm text-muted-foreground">
                Unlock for Lifetime access to all PRO features and future website tools. 
                Your support truly means the world to us 😊
              </p>
              <p className="text-xs text-muted-foreground">Drag & drop or</p>

              <Button
                onClick={() => batchRef.current?.click()}
                className="mt-1 inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2"
              >
                <span className="text-lg">📁</span> Browse Files
              </Button>

              <input
                ref={batchRef}
                type="file"
                multiple
                accept={ACCEPT}
                className="hidden"
                onChange={(e) => e.target.files && onBatchUpload(e.target.files)}
              />

              <p className="mt-3 text-xs text-muted-foreground">
                Supports: JPG, PNG, WEBP (Max {MAX_MB}MB each)
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-4 rounded-lg bg-destructive/15 border border-destructive/30 text-destructive-foreground px-4 py-2">
            {error}
          </div>
        )}

        {/* Features Section */}
        <section className="mt-12">
          <h3 className="text-center text-3xl font-bold text-foreground mb-8">
            Why Use ResizedImage.com?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Feature 
              icon="⚡" 
              title="Lightning Fast"
            >
              Resize images in seconds without compromising quality using our optimized algorithms.
            </Feature>
            <Feature 
              icon="🔒" 
              title="Secure & Private"
            >
              Your images are processed in your browser and never uploaded to our servers.
            </Feature>
            <Feature 
              icon="🎚️" 
              title="Advanced Controls"
            >
              Precise dimension control, quality adjustment, and multiple format options.
            </Feature>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="/contact" className="hover:text-foreground transition-colors">Contact</a>
          <a href="/api" className="hover:text-foreground transition-colors">API</a>
          <a href="/blog" className="hover:text-foreground transition-colors">Blog</a>
        </div>
        <p className="text-center mt-4 opacity-80">
          © 2023 ResizedImage.com — All rights reserved
        </p>
      </footer>
    </div>
  );
};

// Glass Card Component
function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl glass-card p-6">
      {children}
    </div>
  );
}

// Feature Component
function Feature({ 
  icon, 
  title, 
  children 
}: { 
  icon: string; 
  title: string; 
  children: React.ReactNode 
}) {
  return (
    <div className="rounded-2xl glass-card p-6 text-center">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-semibold text-lg text-foreground mb-2">{title}</div>
      <p className="text-muted-foreground">{children}</p>
    </div>
  );
}

export default Index;