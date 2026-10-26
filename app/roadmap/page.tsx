import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Learning roadmap' };

const milestones = [
  { phase: '01', name: 'React foundations', tag: 'CORE CONCEPTS', status: 'Foundation', details: 'Components, JSX, props, state, events, declarative UI, and the Server/Client boundary.' },
  { phase: '02', name: 'TypeScript bridge + Zod', tag: 'CURRENT PHASE', status: 'In progress', details: 'Inferred types, component contracts, union states, event handling, type errors, and runtime validation for product forms.' },
  { phase: '03', name: 'Official Next.js Dashboard App', tag: 'GUIDED COURSE', status: 'Upcoming', details: 'Routing, layouts, data fetching, database, streaming, URL search, pagination, mutations, errors, accessibility, and auth.' },
  { phase: '04', name: 'Independent product app', tag: 'CAPSTONE', status: 'Upcoming', details: 'Apply concepts independently, verify with type checks and focused tests, debug, document trade-offs, and deploy.' }
];

export default function RoadmapPage() {
  return (
    <div className="page-wrap subpage-wrap roadmap-page">
      <section className="subpage-heading">
        <p className="eyebrow">THE PLAN</p>
        <h1>Learn the why.<br /><em>Build the how.</em></h1>
        <p>This roadmap follows the learning workspace sequence. We’ll only mark a milestone complete after you explain the concept and demonstrate it in code.</p>
      </section>
      <div className="roadmap-list">
        {milestones.map((milestone, index) => (
          <article className={`roadmap-item ${index === 1 ? 'roadmap-current' : ''}`} key={milestone.phase}>
            <div className="roadmap-number">{milestone.phase}</div>
            <div className="roadmap-content"><p className="eyebrow">{milestone.tag}</p><h2>{milestone.name}</h2><p>{milestone.details}</p></div>
            <span className={`roadmap-status ${index === 1 ? 'roadmap-status-current' : ''}`}>{milestone.status}</span>
          </article>
        ))}
      </div>
      <div className="roadmap-footer"><p className="eyebrow">CURRENT NEXT STEP</p><h2>Finish the Product Form assessment.</h2><p>Connect controlled inputs to a Zod schema, display success/error feedback, and explain where TypeScript ends and runtime validation begins.</p><Link className="button button-primary" href="/products/new">Open Product Form <span aria-hidden="true">↗</span></Link></div>
    </div>
  );
}
