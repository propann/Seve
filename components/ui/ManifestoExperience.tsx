"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Howl } from "howler";
import { X } from "lucide-react";

// --- 3D PARTICLE TREE ---
function ParticleTree(props: any) {
  const ref = useRef<any>(null);
  // 5001 est divisible par 3 (X, Y, Z pour chaque point)
  const [sphere] = useState(() => {
    const data = random.inSphere(new Float32Array(5001), { radius: 1.5 });
    // Vérification anti-NaN : on s'assure que toutes les valeurs sont des nombres
    for (let i = 0; i < data.length; i++) {
      if (isNaN(data[i])) data[i] = 0;
    }
    return data;
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#2ECC71"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// --- AUDIO ENGINE ---
const ambientSound = new Howl({
  src: ['https://assets.mixkit.co/sfx/preview/mixkit-light-wind-im-trees-1154.mp3'],
  loop: true,
  volume: 0.2,
});

// --- SUB-COMPONENT FOR SCROLL CONTENT ---
// This ensures useScroll is called only when the container is mounted
const ManifestoContent = ({ onClose }: { onClose: () => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    container: scrollRef 
  });
  
  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const scaleCTA = useTransform(scrollYProgress, [0.85, 1], [0.8, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative h-full w-full">
      <div ref={scrollRef} className="relative z-10 h-full overflow-y-auto custom-scrollbar snap-y snap-mandatory">
        {/* SECTION 1 : RACINES */}
        <div className="h-screen flex items-center justify-center p-10 snap-start">
          <motion.div style={{ opacity: opacity1 }} className="max-w-4xl text-center space-y-6">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mix-blend-difference font-serif">
              L'OBSCURITÉ <br/> <span className="text-seve font-mono text-4xl md:text-6xl italic">ORIGINELLE</span>
            </h2>
            <p className="text-xl md:text-2xl font-mono text-white/60 leading-relaxed max-w-2xl mx-auto">
              "Nous ne capturons pas la lumière, nous l'apprivoisons. Dans le silence du capteur, une racine naît."
            </p>
          </motion.div>
        </div>

        {/* SECTION 2 : TRONC */}
        <div className="h-screen flex items-center justify-center p-10 snap-start">
          <motion.div style={{ opacity: opacity2 }} className="max-w-4xl text-center space-y-6">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mix-blend-difference font-serif">
              LE CONTINUUM <br/> <span className="text-seve font-mono text-4xl md:text-6xl italic">HYBRIDE</span>
            </h2>
            <p className="text-xl md:text-2xl font-mono text-white/60 leading-relaxed max-w-2xl mx-auto">
              "Entre le grain d'argent et le bit d'IA, il n'y a pas de fossé. Seulement une sève commune qui irrigue l'histoire."
            </p>
          </motion.div>
        </div>

        {/* SECTION 3 : CANOPÉE & CTA */}
        <div className="h-screen flex items-center justify-center p-10 snap-start">
          <motion.div style={{ opacity: opacity3 }} className="max-w-4xl text-center space-y-12">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mix-blend-difference font-serif">
              DEVENEZ <br/> <span className="text-seve font-mono text-4xl md:text-6xl italic">ARCHITECTE</span>
            </h2>
            <p className="text-xl md:text-2xl font-mono text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
              "De votre regard naîtra une forêt. Le Mycélium attend votre empreinte."
            </p>
            
            <motion.button
              style={{ scale: scaleCTA }}
              onClick={() => {
                onClose();
                window.location.href = "/auth/sign-up";
              }}
              className="px-16 py-8 bg-seve text-black font-black text-2xl rounded-full shadow-[0_0_50px_#2ECC71] hover:scale-110 hover:shadow-[0_0_80px_#2ECC71] transition-all animate-pulse"
            >
              PLANTER MA GRAINE
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* PROGRESS INDICATOR */}
      <motion.div 
        className="absolute bottom-0 left-0 h-2 bg-seve z-20"
        style={{ width: progressWidth }}
      />
    </div>
  );
};

interface ManifestoExperienceProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManifestoExperience: React.FC<ManifestoExperienceProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      ambientSound.play();
    } else {
      ambientSound.stop();
    }
    return () => { ambientSound.stop(); };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black text-white overflow-hidden font-serif"
        >
          {/* 3D BACKGROUND */}
          <div className="absolute inset-0 z-0 opacity-40">
            <Canvas camera={{ position: [0, 0, 1] }}>
              <ParticleTree />
            </Canvas>
          </div>

          {/* CLOSE BUTTON */}
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 z-[210] text-white/50 hover:text-seve transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <ManifestoContent onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
