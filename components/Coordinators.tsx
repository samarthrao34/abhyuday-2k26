
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, GraduationCap, Users, Star } from 'lucide-react';
import { COORDINATORS } from '../constants';
import { Coordinator } from '../types';

const CoordinatorCard: React.FC<{ coordinator: Coordinator; index: number }> = ({ coordinator, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const categoryColors = {
    overall: 'from-violet-500 to-purple-600',
    technical: 'from-cyan-500 to-blue-600',
    cultural: 'from-pink-500 to-rose-600',
    literary: 'from-amber-500 to-orange-600',
  };

  const gradient = categoryColors[coordinator.festCategory || 'overall'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-purple-400/15 hover:border-purple-400/30 transition-all duration-500">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={coordinator.image}
            alt={coordinator.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a2048] via-[#2a2048]/30 to-transparent" />
          
          {/* Role Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r ${gradient} text-white shadow-lg`}>
              {coordinator.festCategory || 'overall'}
            </span>
          </div>

          {/* Type Badge */}
          <div className="absolute top-4 left-4">
            <span className={`flex items-center gap-1 px-3 py-1 text-[10px] font-medium uppercase tracking-wider rounded-full backdrop-blur-sm ${
              coordinator.type === 'faculty' 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-400/30' 
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
            }`}>
              {coordinator.type === 'faculty' ? <GraduationCap className="w-3 h-3" /> : <Star className="w-3 h-3" />}
              {coordinator.type}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-brand font-bold text-purple-100 mb-1 group-hover:text-violet-300 transition-colors">
            {coordinator.name}
          </h3>
          <p className={`text-sm font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-2`}>
            {coordinator.role}
          </p>
          <p className="text-purple-300/50 text-sm mb-4">
            {coordinator.department}
          </p>

          {/* Contact Info */}
          <div className="space-y-2">
            <a 
              href={`mailto:${coordinator.email}`}
              className="flex items-center gap-3 text-sm text-purple-200/60 hover:text-violet-300 transition-colors group/link"
            >
              <span className="p-2 rounded-lg bg-white/5 group-hover/link:bg-violet-500/20 transition-colors">
                <Mail className="w-4 h-4" />
              </span>
              <span className="truncate">{coordinator.email}</span>
            </a>
            <a 
              href={`tel:${coordinator.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-3 text-sm text-purple-200/60 hover:text-violet-300 transition-colors group/link"
            >
              <span className="p-2 rounded-lg bg-white/5 group-hover/link:bg-violet-500/20 transition-colors">
                <Phone className="w-4 h-4" />
              </span>
              <span>{coordinator.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Coordinators: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'faculty' | 'student'>('all');

  const filteredCoordinators = filter === 'all' 
    ? COORDINATORS 
    : COORDINATORS.filter(c => c.type === filter);

  const facultyCount = COORDINATORS.filter(c => c.type === 'faculty').length;
  const studentCount = COORDINATORS.filter(c => c.type === 'student').length;

  return (
    <section id="team" className="relative z-50 py-32 md:py-48 px-8 bg-[#352558]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-brand font-black text-purple-100 mb-4">
            MEET THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">CREW</span>
          </h2>
          <p className="text-purple-200/50 text-lg max-w-2xl mx-auto">
            The brilliant minds steering this cosmic voyage. Faculty advisors and student leaders working in harmony.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-8 mb-12"
        >
          <div className="text-center">
            <div className="text-4xl font-brand font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              {facultyCount}
            </div>
            <div className="text-purple-300/50 text-sm uppercase tracking-wider">Faculty</div>
          </div>
          <div className="w-px h-16 bg-purple-400/20" />
          <div className="text-center">
            <div className="text-4xl font-brand font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              {studentCount}
            </div>
            <div className="text-purple-300/50 text-sm uppercase tracking-wider">Students</div>
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-12">
          {[
            { key: 'all', label: 'All Coordinators', icon: <Users className="w-4 h-4" /> },
            { key: 'faculty', label: 'Faculty', icon: <GraduationCap className="w-4 h-4" /> },
            { key: 'student', label: 'Students', icon: <Star className="w-4 h-4" /> },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key as typeof filter)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                filter === key
                  ? 'bg-violet-500/20 border-violet-400/50 text-violet-300'
                  : 'bg-white/5 border-purple-400/15 text-purple-300/50 hover:border-purple-400/30'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Coordinators Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredCoordinators.map((coordinator, index) => (
            <CoordinatorCard key={coordinator.id} coordinator={coordinator} index={index} />
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-purple-400/15">
            <h3 className="text-2xl font-brand font-bold text-purple-100 mb-2">Have Questions?</h3>
            <p className="text-purple-200/50 mb-6">Reach out to our team for any queries about ABHYUDAY'26</p>
            <a 
              href="mailto:abhyuday@aitm.edu"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-purple-500/25"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Coordinators;
