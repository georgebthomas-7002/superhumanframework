import React from 'react';
import {
  Compass, Heart, Shield, Zap, BookOpen, TrendingUp, Megaphone,
  LifeBuoy, User, Download, ArrowRight, CheckCircle
} from 'lucide-react';

const FrameworkPage = ({ navigate }) => (
  <div className="animate-fade-in">
    {/* HERO SECTION */}
    <section className="bg-[#142d63] text-white py-32 md:py-48 text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#028393] rounded-full blur-[150px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#f65625] rounded-full blur-[120px] opacity-15"></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold backdrop-blur-sm">
          <span className="text-[#faaa68]">The DNA of a Superhuman Life</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight leading-tight">
          The Operating System<br />for Excellence.
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          A comprehensive architecture for leading yourself, leading others, and building a life of impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-[#f65625] text-white px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:bg-white hover:text-[#f65625] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download the Playbook
          </button>
          <button
            onClick={() => navigate('quiz')}
            className="bg-white/5 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-[#142d63] transition-all active:scale-95"
          >
            Take the Assessment
          </button>
        </div>
      </div>
    </section>

    {/* THE PHILOSOPHY */}
    <section className="py-32 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#142d63] mb-8 tracking-tight">
          Stop Hacking. Start Building.
        </h2>
        <div className="text-xl text-gray-600 leading-relaxed space-y-6 text-left md:text-center">
          <p className="text-2xl font-bold text-[#f65625]">
            Most people are trying to build a 100-story life on a 1-story foundation.
          </p>
          <p>
            We are obsessed with "hacks." We want the quick fix for our revenue, the shortcut for our leadership,
            and the easy button for our happiness. But hacks don't last. Strategies change. Tactics expire.
          </p>
          <p className="text-2xl font-bold text-[#142d63]">
            Principles remain.
          </p>
          <p>
            The Superhuman Framework is not a list of tips. It is a <strong>structural blueprint</strong>.
            It is designed to help you build a life and business that doesn't just look successful on the outside,
            but is strong, healthy, and sustainable on the inside.
          </p>
          <div className="pt-8">
            <p className="text-xl font-bold text-[#142d63] mb-4">It consists of two unshakeable components:</p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-8 bg-[#142d63]/5 rounded-3xl border border-[#142d63]/10">
                <h3 className="text-2xl font-bold text-[#142d63] mb-2">The 4 Cornerstones</h3>
                <p className="text-[#f65625] font-bold">The Foundation of Who You Are.</p>
              </div>
              <div className="p-8 bg-[#f65625]/5 rounded-3xl border border-[#f65625]/10">
                <h3 className="text-2xl font-bold text-[#142d63] mb-2">The 10 H Pillars</h3>
                <p className="text-[#028393] font-bold">The Habits of What You Do.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* PART 1: THE 4 CORNERSTONES */}
    <section className="py-32 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-20 text-center">
          <span className="text-[#f65625] font-bold uppercase tracking-widest text-sm bg-[#f65625]/10 px-4 py-2 rounded-full">Part 1</span>
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#142d63] mt-6 mb-4">The Foundation</h2>
          <p className="text-gray-600 mt-6 max-w-3xl mx-auto text-xl leading-relaxed">
            You cannot build a skyscraper on a swamp. These four elements must be present in your DNA before you can lead effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            {
              title: 'Purpose',
              subtitle: 'The North Star',
              desc: 'Purpose is the difference between drifting and driving. It is knowing exactly who you are, why you are here, and who you are here to serve. When you lose your Purpose, you become a reactive victim of circumstance. When you have Purpose, every decision becomes clear.',
              icon: Compass
            },
            {
              title: 'Passion',
              subtitle: 'The Fuel',
              desc: 'Passion is not just excitement; it is vitality. It is the electric energy that allows you to influence others. If you are bored, your team will be bored. If you are on fire, the world will come to watch you burn. Passion is the antidote to apathy.',
              icon: Zap
            },
            {
              title: 'Persistence',
              subtitle: 'The Grit',
              desc: 'Life will punch you in the mouth. Markets will crash. Strategies will fail. Persistence is the unshakeable resolve to stay in the fight. It is the understanding that failure is not a destination; it is just data. It is the long obedience in the same direction.',
              icon: Shield
            },
            {
              title: 'Love',
              subtitle: 'The Secret Weapon',
              desc: 'This is the cornerstone most leaders are afraid of. But in the Superhuman Framework, Love is not a weakness; it is a strategy. It is Agape—radical care for the human beings you lead and serve. If you do not love your team, your customers, or yourself, you are building on sand.',
              icon: Heart
            }
          ].map((item, i) => (
            <div key={i} className="p-12 bg-white rounded-3xl border border-gray-100 hover:border-[#f65625] hover:shadow-2xl transition-all group">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 bg-[#142d63]/5 rounded-2xl flex items-center justify-center shrink-0 text-[#f65625] group-hover:bg-[#f65625] group-hover:text-white transition-colors">
                  <item.icon className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#142d63] mb-1">{i + 1}. {item.title}</h3>
                  <p className="text-[#f65625] font-bold text-lg">"{item.subtitle}"</p>
                </div>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* PART 2: THE 10 H PILLARS */}
    <section className="py-32 bg-[#142d63] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#028393] rounded-full blur-[150px] opacity-20"></div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="mb-20 text-center">
          <span className="text-[#faaa68] font-bold uppercase tracking-widest text-sm bg-[#faaa68]/10 px-4 py-2 rounded-full">Part 2</span>
          <h2 className="text-5xl md:text-6xl font-extrabold mt-6 mb-4">The Habits</h2>
          <p className="text-gray-300 mt-6 max-w-3xl mx-auto text-xl leading-relaxed">
            If the Cornerstones are your mindset, the Pillars are your actions. These are the ten levers you pull every day to create momentum.
          </p>
        </div>

        {/* Character Pillars */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#faaa68] mb-4 text-center">The Character Pillars (Internal Work)</h3>
          <p className="text-gray-300 text-center mb-10 text-lg">How you show up when no one is watching.</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { name: 'Humble', desc: 'The removal of Ego. It is the "Student Mindset"—always learning, always willing to admit when you are wrong, and always giving credit to the team.' },
              { name: 'Honest', desc: 'Radical Truth. It is the refusal to spin, manipulate, or hide. It is transparency in your leadership, your marketing, and your relationships.' },
              { name: 'Holiness', desc: 'Integrity. Being "Set Apart." It is the alignment of your private behavior with your public values. It means you are safe to trust.' },
              { name: 'Happy', desc: 'The strategic choice of Joy. It is refusing to let stress dictate your atmosphere. It is bringing light into the room rather than sucking the oxygen out of it.' },
              { name: 'Humanity', desc: 'Authenticity. It is dropping the "Corporate Mask." It is H2H (Human to Human) connection. It is the permission to be vulnerable, messy, and real.' }
            ].map((h) => (
              <div key={h.name} className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#f65625] hover:border-[#f65625] hover:-translate-y-1 transition-all cursor-pointer group">
                <h4 className="font-bold text-2xl mb-3 group-hover:text-white transition-colors">{h.name}</h4>
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Pillars */}
        <div>
          <h3 className="text-3xl font-bold text-[#faaa68] mb-4 text-center">The Action Pillars (External Work)</h3>
          <p className="text-gray-300 text-center mb-10 text-lg">How you impact the world around you.</p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { name: 'Helpful', desc: 'Servant Leadership. It is the relentless pursuit of adding value to others. It is moving from "What can I get?" to "What can I give?"' },
              { name: 'Healthy', desc: 'Sustainability. It is treating your body and mind as the vehicle for your purpose. Sleep, nutrition, and boundaries are not luxuries; they are requirements for high performance.' },
              { name: 'Hungry Hustle', desc: 'Ambition without Burnout. It is a proactive, aggressive pursuit of potential. It is refusing to settle for mediocrity. It is working hard, but working smart.' },
              { name: 'Holistic Living', desc: 'Balance. It is the understanding that you are a whole person. You are not just an employee; you are a parent, a friend, and a neighbor. Success in business does not justify failure at home.' },
              { name: 'Humor', desc: 'Levity. It is the ability to laugh at yourself and the chaos of life. Humor breaks down walls, builds trust, and makes the hard journey enjoyable.' }
            ].map((h) => (
              <div key={h.name} className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-[#028393] hover:border-[#028393] hover:-translate-y-1 transition-all cursor-pointer group">
                <h4 className="font-bold text-2xl mb-3 group-hover:text-white transition-colors">{h.name}</h4>
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* APPLICATION */}
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-[#142d63] mb-6">Knowledge Without Action is Just Noise.</h2>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Now that you know the Framework, you need to apply it to your specific battleground.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { id: 'leadership', icon: Compass, title: 'For Leaders', desc: 'How to lead with Vision.' },
            { id: 'hr', icon: Heart, title: 'For HR', desc: 'How to build Culture.' },
            { id: 'marketing', icon: Megaphone, title: 'For Marketing', desc: 'How to connect via H2H.' },
            { id: 'sales', icon: TrendingUp, title: 'For Sales', desc: 'How to sell with Trust.' },
            { id: 'pastors', icon: BookOpen, title: 'For Pastors', desc: 'How to lead from Overflow.' },
            { id: 'personal', icon: User, title: 'For You', desc: 'How to design your Life.' }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(item.id)}
              className="p-10 rounded-3xl bg-white shadow-sm border border-gray-100 hover:shadow-2xl hover:border-[#028393]/30 hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-16 h-16 bg-[#142d63]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#028393] transition-colors">
                <item.icon className="w-8 h-8 text-[#142d63] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-[#142d63] mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-6 text-lg">{item.desc}</p>
              <span className="text-[#142d63] font-bold group-hover:text-[#028393] flex items-center text-sm uppercase tracking-wide">
                Read More <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA BLOCK */}
    <section className="py-32 bg-[#F9FAFB]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white p-16 rounded-3xl shadow-xl border border-gray-100">
          <CheckCircle className="w-20 h-20 text-[#f65625] mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#142d63] mb-6">Where are you weak?</h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Most people are strong in 2 Cornerstones but missing 2.<br />
            Most are great at "Hustle" but terrible at "Healthy."
          </p>
          <p className="text-2xl font-bold text-[#f65625] mb-8">
            Find your blind spots now.
          </p>
          <button
            onClick={() => navigate('quiz')}
            className="bg-[#f65625] text-white px-12 py-6 rounded-full font-bold text-xl shadow-xl hover:bg-[#142d63] transition-all hover:-translate-y-1 active:scale-95"
          >
            Take the Assessment
          </button>
        </div>
      </div>
    </section>
  </div>
);

export default FrameworkPage;
