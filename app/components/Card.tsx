import React from "react";

export default function Card() {
  return (
    <div className="relative w-full max-w-2xl mx-auto min-h-screen flex flex-col items-center justify-center">
      {/* Large, centered, subtle background logo */}
      <img
        src="/logo.png"
        alt="The Lunatic Ltd. Monogram"
        className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-2xl md:w-[30vw] md:max-w-xl opacity-15 z-0"
        style={{ filter: 'blur(0.5px)' }}
        draggable={false}
      />
      {/* Main block: perfectly centered */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-full px-4 z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wider mb-4 uppercase text-center" style={{fontFamily: 'var(--font-serif)'}}>THE LUNATIC LTD.</h1>
        <div className="text-2xl md:text-3xl font-mono text-neutral-700 mb-4 md:whitespace-nowrap text-center">Explorer | Author | Aviator | Founder | Investor</div>
        <div className="flex flex-col items-center gap-2 mt-4">
          <span className="text-lg md:text-xl font-mono text-neutral-700 text-center">
            <a
              href="mailto:rich@thelunaticltd.com"
              className="underline underline-offset-4 decoration-dotted hover:text-blue-700 transition-colors"
            >
              rich@thelunaticltd.com
            </a>
          </span>
        </div>
      </div>
      {/* Narrative section styled as in the mock, with fade-out */}
      <div className="relative w-full max-w-2xl mx-auto mt-[60vh] px-4" style={{pointerEvents: 'none'}}>
        <div className="text-left text-base md:text-lg text-neutral-700 opacity-75 font-normal" style={{maxHeight: '32vh', overflow: 'hidden', pointerEvents: 'auto'}}>
          <p className="mb-4">I am an explorer.</p>
          <p className="mb-4">Not just in miles traveled — though I've crossed continents, climbed peaks, and lived in places most only read about — but in ideas uncovered, stories told, experiences cherished.</p>
          <p className="mb-4">I'm the founder of <em>Tales of Murder Press</em>, a boutique publishing company bringing forgotten mysteries back to life — rare crime and detective fiction from the golden age and before, reborn as beautiful modern editions for a new generation of readers. And author of seven dark fantasy horor novels.</p>
          <p className="mb-4">I'm a licensed FAA airline dispatcher (Twin Otters on floats, international biz jet routing), aviation maintenance technician (A&P mechanic), and commercial drone pilot. I've been a magazine editor & writer, photojournalist, magazine cover photographer (12x), essayist, novelist, and screenwriter. I've studied half a dozen languages (and can even say "Hello!" in one or two!), play a few musical instruments (most badly; the rest worse), and believe that life is about taking the road less traveled, getting lost, and finding a better path.</p>
          <p className="mb-4">I have an innate ability to see the deeper narrative in forgotten things — books, businesses, ideas — and reframe them into something compelling, meaningful, and marketable. I'm grounded in purpose, driven by curiosity, and not afraid to start over, no matter how many times it takes.</p>
          <p className="mb-4">I'm seeking partnerships, connections, & investment opportunities in aviation, outdoor recreation & adventure, and publishing, or related areas.</p>
        </div>
        {/* Fade-out gradient mask */}
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-24" style={{background: "linear-gradient(to bottom, transparent 10%, #f8f5f0 100%)"}} />
      </div>
    </div>
  );
} 