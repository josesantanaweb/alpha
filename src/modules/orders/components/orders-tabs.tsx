import type { ReactElement } from "react";
import type { LucideIcon } from "lucide-react";

export interface OrdersTab {
  key: string;
  label: string;
  icon: LucideIcon;
}

interface OrdersTabsProps {
  tabs: OrdersTab[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const OrdersTabs = ({
  tabs,
  activeTab,
  onTabChange,
}: OrdersTabsProps): ReactElement => {
  return (
    <div className="border-stroke scrollbar-hide flex items-center gap-1 overflow-x-auto border-b">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`flex shrink-0 items-center border-b-2 gap-1.5 px-3 py-2.5 text-sm whitespace-nowrap transition-colors cursor-pointer ${
              isActive
                ? "border-white text-white"
                : "border-transparent text-body hover:text-white"
            }`}
          >
            <Icon size={16} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};