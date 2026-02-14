import React from 'react';
import { COORDINATORS } from '../constants';

const Card: React.FC<{name:string;role:string;dept?:string;year?:string;phone:string;tag?:string;}> = ({ name, role, dept, year, phone, tag }) => (
  <div className="glass-pill border border-purple-400/20 rounded-2xl overflow-hidden min-w-[260px] max-w-xs mx-2 flex flex-col justify-center items-center p-5">
    <h4 className="text-lg font-semibold text-purple-100 mb-1 text-center">{name}</h4>
    {tag && <span className="px-2 py-0.5 mb-1 rounded-full text-[10px] uppercase tracking-wider bg-violet-500/15 text-violet-300 border border-violet-400/20">{tag}</span>}
    <p className="text-sm text-purple-200/80 text-center">{role}{dept ? ` • ${dept}` : ''}{year ? ` • ${year}` : ''}</p>
    <div className="mt-2 text-xs text-purple-300/80 text-center">
      <p>{phone}</p>
    </div>
  </div>
);

const Coordinators: React.FC = () => {
  const faculty = COORDINATORS.filter(c => c.type==='faculty');
  const students = COORDINATORS.filter(c => c.type==='student');
  return (
    <section id="coordinators" className="relative z-50 section-blend py-16 sm:py-24 md:py-36 px-4 sm:px-6 md:px-10 bg-gradient-to-b from-[#2a2048] to-[#241c3a] border-t border-purple-500/10">
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-brand font-bold mb-8 sm:mb-10 tracking-tight text-purple-100 text-center">Coordinators</h2>

        <h3 className="text-lg sm:text-xl font-semibold text-purple-200 mb-4">Faculty</h3>
        <div className="flex overflow-x-auto pb-4 mb-8 sm:mb-12 hide-scrollbar">
          {faculty.map(f => (
            <Card key={f.id} name={f.name} role={f.role} dept={f.department} phone={f.phone} tag={f.festCategory?.toString()} />
          ))}
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-purple-200 mb-4">Students</h3>
        <div className="flex overflow-x-auto pb-4 hide-scrollbar">
          {students.map(s => (
            <Card key={s.id} name={s.name} role={s.role} dept={s.department} year={s.year} phone={s.phone} tag={s.festCategory?.toString()} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coordinators;
