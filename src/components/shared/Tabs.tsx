'use client';
import { cn } from '@/lib';

interface Tab {
  key: string;
  label: string;
}
interface TabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs?: Tab[];
}

export const Tabs = ({ activeTab, onTabChange, tabs = [] }: TabsProps) => {
  return (
    <div className="flex items-center border-b border-stroke/30 gap-6">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const tabClasses = cn(
          'font-semibold uppercase flex-1 p-4 text-sm text-center cursor-pointer border-b-2 transition-colors',
          isActive ? 'text-primary border-primary' : 'text-body border-transparent',
        );
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={tabClasses}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
