"use client";

import { cn } from "@/modules/shared/utils/cn";

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
    <div className="border-stroke/30 flex items-center gap-6 border-b">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const tabClasses = cn(
          "font-semibold uppercase flex-1 p-4 text-sm text-center cursor-pointer border-b-2 transition-colors",
          isActive
            ? "text-primary border-primary"
            : "text-body border-transparent"
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
