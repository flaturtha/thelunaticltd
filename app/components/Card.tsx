import React from "react";

export default function Card() {
  return (
    <div className="relative w-full max-w-2xl mx-auto mt-12 md:mt-6 min-h-screen flex flex-col items-center justify-center">
      {/* Main block: perfectly centered */}
      <div className="absolute top-1/5 left-1/2 -translate-x-1/2 -translate-y-1/4 flex flex-col items-center w-full px-4 z-10">
        <img
          src="/logo.png"
          alt="The Lunatic Ltd. Monogram"
          className="w-40 md:w-56 mt-20 mb-12 opacity-50 mx-auto"
          draggable={false}
        />
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wider mb-4 uppercase text-center" style={{fontFamily: 'var(--font-serif)', color: '#666666'}}>THE LUNATIC LTD.</h1>
        <div className="text-2xl md:text-3xl font-mono mb-4 md:whitespace-nowrap text-center" style={{color: '#666666'}}>Explorer | Author | Aviator | Founder | Investor</div>
        <div className="flex flex-col items-center gap-2 mt-4 mb-12">
          <span className="text-lg md:text-xl font-mono text-center" style={{color: '#666666'}}>
            <a
              href="mailto:rich@thelunaticltd.com"
              className="underline underline-offset-4 decoration-dotted hover:text-blue-700 transition-colors"
            >
              rich@thelunaticltd.com
            </a>
          </span>
        </div>
      </div>
      {/* Scrollable narrative section with fade-out */}
      <div className="relative w-full max-w-2xl mx-auto mt-[70vh] px-4" style={{pointerEvents: 'none'}}>
        <div className="text-left text-base md:text-lg text-neutral-500 font-normal bg-transparent rounded-lg hide-scrollbar" style={{maxHeight: '23rem', overflowY: 'auto', pointerEvents: 'auto'}}>
          <div className="p-6 pb-10">
            <p className="mb-4 font-bold uppercase">I am an explorer.</p>
            <p className="mb-4">Not just in miles traveled — though I've crossed continents, climbed peaks, and lived in places most only read about — but in ideas uncovered, stories told, experiences cherished.</p>
            <p className="mb-4">I'm the founder of <em>Tales of Murder Press</em>, a boutique publishing company bringing forgotten mysteries back to life — rare crime and detective fiction from the golden age and before, reborn as beautiful modern editions for a new generation of readers. And author of seven dark fantasy horror novels.</p>
            <p className="mb-4">I'm a licensed FAA airline dispatcher (Twin Otters on floats, international biz jet routing), aviation maintenance technician (A&P mechanic), and commercial drone pilot. I've been a magazine editor & writer, photojournalist, magazine cover photographer (12x), essayist, novelist, and screenwriter. I've studied half a dozen languages (and can even say "Hello!" in one or two!), play a few musical instruments (most badly; the rest worse), and believe that life is about taking the road less traveled, getting lost, and finding a better path.</p>
            <p className="mb-4">I have an innate ability to see the deeper narrative in forgotten things — books, businesses, ideas — and reframe them into something compelling, meaningful, and marketable. I'm grounded in purpose, driven by curiosity, and not afraid to start over, no matter how many times it takes.</p>
            <p className="mb-4">I'm seeking partnerships, connections, & investment opportunities in aviation, outdoor recreation & adventure, and publishing, or related areas.</p>
            <p className="mb-4">If you're curious to know more or have an idea, opportunity, or story worth exploring, reach out at <a href="mailto:rich@thelunaticltd.com" className="underline underline-offset-2 hover:font-bold transition-colors">rich@thelunaticltd.com</a>.</p>
          </div>
          {/* Fade-out effect at the bottom */}
          <div className="absolute left-0 right-0 bottom-0 h-8 pointer-events-none" style={{background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0.85))'}} />
        </div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
} 