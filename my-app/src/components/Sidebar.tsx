// import { FC, useState } from "react";
// import "../styles/Sidebar.css";

// interface ChecklistItem {
//   key: string;
//   label: string;
//   isActive: boolean;
//   count: number;
// }

// interface ChecklistSidebarProps {
//   checklistItems: ChecklistItem[];
//   toggleChecklist: (key: string) => void;
// }

// const ChecklistSidebar: FC<ChecklistSidebarProps> = ({ checklistItems, toggleChecklist }) => {
//   const [selectedKey, setSelectedKey] = useState<string | null>(null);

//   const handleSelect = (key: string) => {
//     setSelectedKey(key);
//     toggleChecklist(key);
//   };

//   return (
//     <aside className="checklist-sidebar">
//       {checklistItems.map((item) => {
//         const isActive = selectedKey === item.key || item.isActive;

//         return (
//           <div
//             key={item.key}
//             className={`checklist-item ${isActive ? "active" : ""}`}
//             onClick={() => handleSelect(item.key)}
//             role="button"
//             tabIndex={0}
//             onKeyDown={() => handleSelect(item.key)}
//           >
//             {/* ✅ Circle with checkmark */}
//             <div className={`circle ${isActive ? "filled" : ""}`}>
//               {isActive && (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 24 24"
//                   width="14"
//                   height="14"
//                   fill="none"
//                   stroke="#65ed97ff"
//                   strokeWidth="3"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <polyline points="20 6 9 17 4 12" />
//                 </svg>
//               )}
//             </div>
//             {/* ✅ Label */}
//             <span className="label">{item.label}</span>

//             {/* ✅ Right-side button */}
//             <button
//               type="button"
//               className={`menu ${isActive ? "active-btn" : ""}`}
//               aria-label={`menu-${item.key}`}
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleSelect(item.key); 
//               }}
//             >
//               <span className="count">{item.count}</span>
//             </button>
//           </div>
//         );
//       })}
//     </aside>
//   );
// };
// export default ChecklistSidebar;
 

import { useState } from "react"
import type {FC} from "react"
// import Sidebar from "./Sidebar"; 
import "../styles/Sidebar.css";

// types.ts
export interface ChecklistItem {
  key: string;
  label: string;
  isActive: boolean;
  count: number;
}

interface ChecklistSidebarProps {
  checklistItems: ChecklistItem[];
  toggleChecklist: (key: string) => void;
}

const ChecklistSidebar: FC<ChecklistSidebarProps> = ({ checklistItems, toggleChecklist }) => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleSelect = (key: string) => {
    setSelectedKey(key);
    toggleChecklist(key);
  };

  return (
    <aside className="checklist-sidebar">
      {checklistItems.map((item) => {
        const isActive = selectedKey === item.key;

        return (
          <div
            key={item.key}
            data-testid={`sidebar-step-${item.key}`}
            className={`checklist-item ${isActive ? "active" : ""}`}
            onClick={() => handleSelect(item.key)}
            role="button"
            tabIndex={0}
            onKeyDown={() => handleSelect(item.key)}
          >
            {/* ✅ Circle with checkmark */}
            <div className={`circle ${isActive ? "filled" : ""}`}>
              {isActive && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="#65ed97ff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>

            {/* ✅ Label */}
            <span className="label">{item.label}</span>

            {/* ✅ Right-side button that turns active when the card is selected */}
            <button
              type="button"
              className={`menu ${isActive ? "active-btn" : ""}`}
              aria-label={`menu-${item.key}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(item.key);
              }}
            >
              <span className="count">{item.count}</span>
            </button>
          </div>
        );
      })}
    </aside>
  );
};

export default ChecklistSidebar;

