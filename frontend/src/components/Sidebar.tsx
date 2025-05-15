import React from 'react';
import { FiPlus } from 'react-icons/fi';

interface SidebarProps {
  onNewChat: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNewChat }) => {
  const helpfulSources = [
    {
      title: "National Suicide Prevention Lifeline",
      description: "24/7 support for people in suicidal crisis or emotional distress",
      url: "https://988lifeline.org/",
      icon: "🆘"
    },
    {
      title: "SAMHSA's National Helpline",
      description: "Treatment referral and information service for individuals facing mental health or substance use disorders",
      url: "https://www.samhsa.gov/find-help/national-helpline",
      icon: "📞"
    },
    {
      title: "Crisis Text Line",
      description: "Text HOME to 741741 to connect with a Crisis Counselor",
      url: "https://www.crisistextline.org/",
      icon: "💬"
    }
  ];

  const affirmations = [
    "You are stronger than you think. 💪",
    "You are worthy of love and respect. ❤️",
    "Your feelings are valid and important. 🌟"
  ];

  return (
    <div className="w-64 bg-white border-r border-calmGray h-full flex flex-col overflow-y-auto">
      {/* New Chat Button */}
      <div className="p-4 pt-14 lg:pt-4">
        <button
          onClick={onNewChat}
          className="w-full bg-accent text-white px-4 py-3 rounded-xl font-semibold hover:bg-calmPurple transition flex items-center justify-center gap-2"
        >
          <FiPlus size={20} />
          New Chat
        </button>
      </div>
      {/* Helpful Sources Section */}
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold text-calmPurple mb-3">Helpful Resources</h2>
        <div className="space-y-3">
          {helpfulSources.map((source, index) => (
            <a
              key={index}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-calmGray/50 rounded-xl hover:bg-calmGray transition group"
            >
              <div className="flex items-start gap-2">
                <span className="text-2xl">{source.icon}</span>
                <div>
                  <h3 className="font-medium text-sm group-hover:text-accent transition">{source.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{source.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* Affirmations Section */}
      <div className="px-4 py-2 mt-4">
        <h2 className="text-lg font-semibold text-calmPurple mb-3">Daily Affirmations</h2>
        <div className="space-y-3">
          {affirmations.map((affirmation, index) => (
            <div
              key={index}
              className="p-3 bg-gradient-to-br from-calmBlue/30 to-calmPurple/30 rounded-xl text-sm font-medium"
            >
              {affirmation}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 