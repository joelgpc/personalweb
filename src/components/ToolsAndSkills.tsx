import { FaChartLine, FaLightbulb, FaHandshake } from 'react-icons/fa';
import { BiBuildingHouse } from 'react-icons/bi';
import { MdBusinessCenter, MdAnalytics } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SkillBar from './SkillBar';

interface Tool {
  name: string;
  icon: JSX.Element;
  description: string;
  color: string;
}

interface SkillData {
  name: string;
  level: number;
}

const ToolsAndSkills: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const tools: Tool[] = [
    {
      name: "Marketing Analytics",
      icon: <FaChartLine className="w-8 h-8" />,
      description: "Data-driven strategies",
      color: "text-blue-400"
    },
    {
      name: "Real Estate",
      icon: <BiBuildingHouse className="w-8 h-8" />,
      description: "Property management",
      color: "text-green-400"
    },
    {
      name: "Business Development",
      icon: <MdBusinessCenter className="w-8 h-8" />,
      description: "Growth strategies",
      color: "text-purple-400"
    },
    {
      name: "Innovation",
      icon: <FaLightbulb className="w-8 h-8" />,
      description: "Creative solutions",
      color: "text-yellow-400"
    },
    {
      name: "Customer Relations",
      icon: <FaHandshake className="w-8 h-8" />,
      description: "Client success",
      color: "text-red-400"
    },
    {
      name: "Business Analytics",
      icon: <MdAnalytics className="w-8 h-8" />,
      description: "Data analysis",
      color: "text-indigo-400"
    }
  ];

  const skills: SkillData[] = [
    { name: "Marketing Project Management", level: 90 },
    { name: "Leadership", level: 85 },
    { name: "Sales Strategy Development", level: 95 },
    { name: "Digital Marketing", level: 88 },
    { name: "Business Development", level: 92 },
    { name: "Customer Relations", level: 90 }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="container mx-auto px-4 py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Tools & Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                variants={itemVariants}
                className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`${tool.color} mb-3`}>{tool.icon}</div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Skills</h2>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div key={skill.name} variants={itemVariants}>
                <SkillBar name={skill.name} percentage={skill.level} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolsAndSkills;
