"use client";

import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function VideoGallery() {
  const videoIds = [
    "H5MPjuO63Rw", 
    "Oi399f5ZqJQ"
  ];

  if (videoIds.length === 0) return null;

  return (
    <section className="py-20 bg-mk-bg border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full text-red-600">
              <Youtube className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-mk-primary-dark tracking-tight">Featured Projects</h2>
          <p className="mt-4 text-xl text-gray-600">Watch our latest site developments and property walkthroughs on YouTube.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videoIds.map((id, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 aspect-video relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              whileHover={{ y: -5, shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              {id.includes("YOUR_VIDEO_ID") ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
                  <Youtube className="w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-500 font-medium">Add your YouTube Video ID here in<br/> <code className="text-sm bg-gray-200 px-2 py-1 rounded">src/components/VideoGallery.tsx</code></p>
                </div>
              ) : (
                <iframe
                  className="w-full h-full absolute top-0 left-0"
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`YouTube video player ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <a 
            href="https://www.youtube.com/@mkagriprojects" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center font-bold text-red-600 hover:text-red-700 transition-colors"
          >
            Visit @mkagriprojects on YouTube <span className="ml-2 text-xl">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
