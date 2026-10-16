import { ExternalLink, Trophy } from 'lucide-react';
import { Section, SectionHeading } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { Spotlight } from '../components/Spotlight';
import { EditHint } from '../components/Placeholder';
import { achievements, showAchievements } from '../data/achievements';
import { sectionIndex } from '../data/nav';
import { isSet } from '../lib/utils';

export function Achievements() {
  if (!showAchievements) return null;

  return (
    <Section id="achievements">
      <SectionHeading
        id="achievements"
        index={sectionIndex('achievements')}
        eyebrow="Highlights"
        title={
          <>
            Recognition and milestones, <span className="italic text-muted">only the verified kind.</span>
          </>
        }
      />

      {achievements.length === 0 ? (
        <Reveal>
          <EditHint file="src/data/achievements.ts">
            Awards, hackathon results, published work and recognitions go here. This whole section stays hidden when
            there is nothing to show and placeholders are turned off.
          </EditHint>
        </Reveal>
      ) : (
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, i) => (
            <li key={item.id}>
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <Spotlight className="h-full p-6">
                  <Trophy className="mb-4 h-5 w-5 text-accent" aria-hidden="true" />
                  <h3 className="text-lg font-medium leading-snug text-fg">{item.title}</h3>
                  {(item.issuer || item.date) && (
                    <p className="mt-1 text-sm text-faint">{[item.issuer, item.date].filter(isSet).join(' · ')}</p>
                  )}
                  {item.detail && <p className="mt-3 leading-relaxed text-muted">{item.detail}</p>}
                  {isSet(item.link) && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline mt-4 inline-flex items-center gap-1.5 text-sm text-fg"
                    >
                      Learn more <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </Spotlight>
              </Reveal>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
