import { motion, AnimatePresence } from 'framer-motion';
import { gardenConfig } from '../../../configs/garden.config';

interface PlantProps {
  growthStage: number;
}

const fadeIn = {
  initial: { opacity: 0, scale: 0.5 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.5 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

function Seed() {
  return (
    <motion.g {...fadeIn}>
      {/* Soil mound */}
      <ellipse cx={0} cy={0} rx={18} ry={6} fill="#8D6E63" />
      {/* Seed */}
      <ellipse cx={0} cy={-2} rx={4} ry={3} fill="#5D4037" />
    </motion.g>
  );
}

function Sprout() {
  return (
    <motion.g {...fadeIn}>
      {/* Soil mound */}
      <ellipse cx={0} cy={0} rx={18} ry={6} fill="#8D6E63" />
      {/* Tiny stem */}
      <motion.line
        x1={0} y1={0} x2={0} y2={-20}
        stroke="#66BB6A"
        strokeWidth={2.5}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8 }}
      />
      {/* Two small leaves */}
      <motion.ellipse
        cx={-6} cy={-18} rx={5} ry={3}
        fill="#81C784"
        transform="rotate(-30 -6 -18)"
        {...fadeIn}
      />
      <motion.ellipse
        cx={6} cy={-18} rx={5} ry={3}
        fill="#81C784"
        transform="rotate(30 6 -18)"
        {...fadeIn}
      />
    </motion.g>
  );
}

function SmallPlant() {
  return (
    <motion.g {...fadeIn}>
      {/* Soil mound */}
      <ellipse cx={0} cy={0} rx={20} ry={7} fill="#8D6E63" />
      {/* Stem */}
      <line x1={0} y1={0} x2={0} y2={-45} stroke="#43A047" strokeWidth={3} />
      {/* 4 leaves */}
      <ellipse cx={-8} cy={-15} rx={8} ry={4} fill="#66BB6A" transform="rotate(-35 -8 -15)" />
      <ellipse cx={8} cy={-20} rx={8} ry={4} fill="#66BB6A" transform="rotate(35 8 -20)" />
      <ellipse cx={-7} cy={-30} rx={7} ry={3.5} fill="#81C784" transform="rotate(-30 -7 -30)" />
      <ellipse cx={7} cy={-35} rx={7} ry={3.5} fill="#81C784" transform="rotate(30 7 -35)" />
    </motion.g>
  );
}

function MediumPlant() {
  return (
    <motion.g {...fadeIn}>
      {/* Soil mound */}
      <ellipse cx={0} cy={0} rx={22} ry={8} fill="#8D6E63" />
      {/* Thicker stem */}
      <line x1={0} y1={0} x2={0} y2={-70} stroke="#388E3C" strokeWidth={4} />
      {/* Multiple leaves */}
      <ellipse cx={-10} cy={-12} rx={10} ry={5} fill="#66BB6A" transform="rotate(-40 -10 -12)" />
      <ellipse cx={10} cy={-20} rx={10} ry={5} fill="#66BB6A" transform="rotate(40 10 -20)" />
      <ellipse cx={-9} cy={-35} rx={9} ry={4.5} fill="#81C784" transform="rotate(-35 -9 -35)" />
      <ellipse cx={9} cy={-45} rx={9} ry={4.5} fill="#81C784" transform="rotate(35 9 -45)" />
      <ellipse cx={-8} cy={-55} rx={8} ry={4} fill="#A5D6A7" transform="rotate(-30 -8 -55)" />
      <ellipse cx={8} cy={-60} rx={8} ry={4} fill="#A5D6A7" transform="rotate(30 8 -60)" />
    </motion.g>
  );
}

function BuddingPlant() {
  return (
    <motion.g {...fadeIn}>
      {/* Soil mound */}
      <ellipse cx={0} cy={0} rx={22} ry={8} fill="#8D6E63" />
      {/* Tall stem */}
      <line x1={0} y1={0} x2={0} y2={-90} stroke="#2E7D32" strokeWidth={4.5} />
      {/* Leaves */}
      <ellipse cx={-12} cy={-10} rx={11} ry={5} fill="#66BB6A" transform="rotate(-40 -12 -10)" />
      <ellipse cx={12} cy={-18} rx={11} ry={5} fill="#66BB6A" transform="rotate(40 12 -18)" />
      <ellipse cx={-10} cy={-32} rx={10} ry={4.5} fill="#81C784" transform="rotate(-35 -10 -32)" />
      <ellipse cx={10} cy={-44} rx={10} ry={4.5} fill="#81C784" transform="rotate(35 10 -44)" />
      <ellipse cx={-9} cy={-56} rx={9} ry={4} fill="#A5D6A7" transform="rotate(-30 -9 -56)" />
      <ellipse cx={9} cy={-66} rx={9} ry={4} fill="#A5D6A7" transform="rotate(30 9 -66)" />
      <ellipse cx={-7} cy={-76} rx={7} ry={3.5} fill="#C8E6C9" transform="rotate(-25 -7 -76)" />
      {/* Closed bud */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <ellipse cx={0} cy={-95} rx={6} ry={10} fill="#81C784" />
        <ellipse cx={-3} cy={-95} rx={4} ry={9} fill="#66BB6A" />
        <ellipse cx={3} cy={-95} rx={4} ry={9} fill="#A5D6A7" />
      </motion.g>
    </motion.g>
  );
}

function FullBloom() {
  return (
    <motion.g {...fadeIn}>
      {/* Soil mound */}
      <ellipse cx={0} cy={0} rx={24} ry={8} fill="#8D6E63" />
      {/* Tall stem */}
      <line x1={0} y1={0} x2={0} y2={-100} stroke="#2E7D32" strokeWidth={5} />
      {/* Many leaves */}
      <ellipse cx={-13} cy={-8} rx={12} ry={5} fill="#66BB6A" transform="rotate(-40 -13 -8)" />
      <ellipse cx={13} cy={-16} rx={12} ry={5} fill="#66BB6A" transform="rotate(40 13 -16)" />
      <ellipse cx={-11} cy={-30} rx={11} ry={5} fill="#81C784" transform="rotate(-35 -11 -30)" />
      <ellipse cx={11} cy={-42} rx={11} ry={5} fill="#81C784" transform="rotate(35 11 -42)" />
      <ellipse cx={-10} cy={-54} rx={10} ry={4.5} fill="#A5D6A7" transform="rotate(-30 -10 -54)" />
      <ellipse cx={10} cy={-64} rx={10} ry={4.5} fill="#A5D6A7" transform="rotate(30 10 -64)" />
      <ellipse cx={-8} cy={-76} rx={8} ry={4} fill="#C8E6C9" transform="rotate(-25 -8 -76)" />
      <ellipse cx={8} cy={-84} rx={8} ry={4} fill="#C8E6C9" transform="rotate(25 8 -84)" />
      {/* Open flower with colorful petals */}
      <motion.g
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
      >
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const px = Math.cos(angle) * 14;
          const py = -108 + Math.sin(angle) * 14;
          const colors = ['#E91E63', '#F06292', '#EC407A', '#F48FB1', '#E91E63', '#F06292', '#EC407A', '#F48FB1'];
          return (
            <ellipse
              key={i}
              cx={px}
              cy={py}
              rx={8}
              ry={5}
              fill={colors[i]}
              transform={`rotate(${i * 45} ${px} ${py})`}
            />
          );
        })}
        {/* Flower center */}
        <circle cx={0} cy={-108} r={6} fill="#FDD835" />
        <circle cx={0} cy={-108} r={3.5} fill="#F9A825" />
      </motion.g>
    </motion.g>
  );
}

const stages = [Seed, Sprout, SmallPlant, MediumPlant, BuddingPlant, FullBloom];

export function Plant({ growthStage }: PlantProps) {
  const { plant } = gardenConfig;
  const clampedStage = Math.max(0, Math.min(5, growthStage));
  const StageComponent = stages[clampedStage];

  return (
    <g transform={`translate(${plant.x}, ${plant.y})`}>
      <AnimatePresence mode="wait">
        <StageComponent key={clampedStage} />
      </AnimatePresence>
    </g>
  );
}
