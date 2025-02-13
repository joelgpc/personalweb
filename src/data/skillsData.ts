export interface SkillItem {
  key: string;
  level: number;
}

export interface Category {
  key: string;
  title: string;
  icon: string;
  skills: SkillItem[];
}

export const categories: Category[] = [
  {
    key: 'salesMarketing',
    title: 'skills.categories.salesMarketing',
    icon: '💼',
    skills: [
      { key: 'leadGeneration', level: 90 },
      { key: 'growthStrategies', level: 85 },
      { key: 'digitalCampaigns', level: 88 }
    ]
  },
  {
    key: 'aiAutomation',
    title: 'skills.categories.aiAutomation',
    icon: '🤖',
    skills: [
      { key: 'chatbotDevelopment', level: 92 },
      { key: 'aiProcessOptimization', level: 87 },
      { key: 'workflowAutomation', level: 85 }
    ]
  },
  {
    key: 'businessAnalysis',
    title: 'skills.categories.businessAnalysis',
    icon: '📊',
    skills: [
      { key: 'requirementGathering', level: 88 },
      { key: 'systemMapping', level: 90 },
      { key: 'solutionDesign', level: 85 }
    ]
  },
  {
    key: 'dataReporting',
    title: 'skills.categories.dataReporting',
    icon: '📈',
    skills: [
      { key: 'biTools', level: 88 },
      { key: 'advancedReporting', level: 90 },
      { key: 'dashboardAutomation', level: 85 }
    ]
  }
];