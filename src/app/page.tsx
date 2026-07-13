"use client";

import Link from 'next/link';
import { ArrowRight, MapPin, CheckCircle, ShieldCheck, Droplets, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import VideoGallery from '@/components/VideoGallery';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative w-full h-[600px] flex items-center justify-center bg-mk-primary-dark"
        style={{ backgroundImage: "url('/hero-bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div 
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md"
            variants={fadeInUp}
          >
            Premium Land Developments for Agriculture & Living
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-sm"
            variants={fadeInUp}
          >
            MK Group specializes in verified, high-quality land conversions for agricultural, farming, and residential communities. The perfect legacy asset and long-term investment for forward-thinking professionals.
          </motion.p>
          <motion.div 
            className="flex justify-center space-x-4"
            variants={fadeInUp}
          >
            <Link 
              href="/listings" 
              className="bg-mk-gold hover:bg-yellow-500 text-mk-primary-dark font-bold py-3 px-8 rounded-full transition-all hover:scale-105 hover:shadow-lg inline-flex items-center"
            >
              View Listings <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-mk-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="lg:grid lg:grid-cols-2 lg:gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="mb-10 lg:mb-0" variants={fadeInUp}>
              <h2 className="text-4xl font-extrabold text-mk-primary-dark mb-4 tracking-tight">About MK Group</h2>
              <h3 className="text-2xl text-mk-brown mb-6 font-semibold">Your Trusted Partner in Land Investment</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                With years of expertise in land acquisition across Karnataka, MK Group ensures that every parcel of land we offer is thoroughly vetted, converted, and ready for your specific needs.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <ShieldCheck className="h-6 w-6 text-mk-gold mt-1 flex-shrink-0" />
                  <span className="ml-4 text-gray-700 leading-relaxed"><strong>100% Clear Titles:</strong> Every property undergoes rigorous legal verification and due diligence.</span>
                </li>
                <li className="flex items-start bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <MapPin className="h-6 w-6 text-mk-gold mt-1 flex-shrink-0" />
                  <span className="ml-4 text-gray-700 leading-relaxed"><strong>Prime Locations:</strong> Strategically chosen plots in Karnataka with excellent long-term growth potential.</span>
                </li>
              </ul>
            </motion.div>
            <motion.div 
              className="bg-white h-96 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl border border-gray-200"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img src="/hero-bg.jpg" alt="Agricultural landscape" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-extrabold text-mk-primary-dark tracking-tight">Our Development Standards</h2>
            <p className="mt-4 text-xl text-gray-600">Every project is equipped with essential infrastructure to ensure immediate usability.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[
              { icon: Zap, title: 'Electricity Access', desc: 'Reliable power connectivity established to all development boundaries.' },
              { icon: MapPin, title: 'Road Connectivity', desc: 'Well-planned internal roads connecting to major highways and towns.' },
              { icon: Droplets, title: 'High Groundwater Potential', desc: 'Thoroughly verified groundwater sources and planned irrigation infrastructure.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                className="bg-mk-bg p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div className="mx-auto h-16 w-16 bg-mk-primary-light text-white rounded-2xl rotate-3 hover:rotate-6 transition-transform flex items-center justify-center mb-6 shadow-md">
                  <feature.icon className="w-8 h-8 -rotate-3 hover:-rotate-6 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* YouTube Video Gallery */}
      <VideoGallery />
    </div>
  );
}
