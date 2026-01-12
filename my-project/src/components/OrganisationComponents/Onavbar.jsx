// import { useState } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
// import {
//   PenSquare,
//   LayoutDashboard,
//   Briefcase,
//   Clock,
//   FolderOpen,
//   Grid3x3,
//   Gift,
//   Users,
//   Plug,
//   ChevronLeft,
//   ChevronRight,
//   Menu,
//   X,
//   Zap
// } from "lucide-react";

// const Onavbar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   const menuItems = [
//     {
//       title: "Main",
//       items: [
//         { name: "Post a Job", icon: PenSquare, path: "/Jobpost" },
//         { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
//         { name: "All Jobs", icon: Briefcase, path: "/alljobs" },
//         { name: "Recent Interviews", icon: Clock, path: "/interviews" }
//       ]
//     },
//     {
//       title: "Job Details",
//       items: [
//         { name: "Categories", icon: FolderOpen, path: "/categories" },
//         { name: "Subcategories", icon: Grid3x3, path: "/subcategories" },
//         { name: "Benefits", icon: Gift, path: "/benefits" }
//       ]
//     },
//     {
//       title: "Organization",
//       items: [
//         { name: "Users", icon: Users, path: "/users" },
//         { name: "Integrations", icon: Plug, path: "/integrations" }
//       ]
//     }
//   ];

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <button
//         onClick={() => setIsMobileOpen(!isMobileOpen)}
//         className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
//       >
//         {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//       </button>

//       {/* Mobile Overlay */}
//       {isMobileOpen && (
//         <div
//           className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
//           onClick={() => setIsMobileOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`${
//           isOpen ? "lg:w-72" : "lg:w-20"
//         } ${
//           isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         } fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white flex flex-col transition-all duration-300 ease-in-out z-40 shadow-2xl`}
//       >
//         {/* Header */}
//         <div className="p-5 border-b border-white/10">
//           <div className="flex items-center justify-between">
//             <div
//               className={`${
//                 isOpen ? "opacity-100" : "opacity-0 lg:opacity-0"
//               } transition-opacity duration-300 flex items-center gap-2`}
//             >
//               <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
//                 <Zap className="w-6 h-6 text-white" />
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-bold text-xl bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
//                   Kerplunk
//                 </span>
//                 <span className="text-xs text-gray-400">AI Interview Platform</span>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="hidden lg:flex p-2 hover:bg-white/10 rounded-lg transition-colors"
//             >
//               {isOpen ? (
//                 <ChevronLeft className="w-5 h-5" />
//               ) : (
//                 <ChevronRight className="w-5 h-5 bg-red-300" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
//           {menuItems.map((section, sectionIdx) => (
//             <div key={sectionIdx} className="mb-6">
//               {/* Section Title */}
//               <div
//                 className={`${
//                   isOpen ? "opacity-100 mb-3" : "opacity-0 lg:opacity-0 mb-2"
//                 } transition-opacity duration-300 px-3`}
//               >
//                 <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
//                   {section.title}
//                 </h3>
//               </div>

//               {/* Section Items */}
//               <ul className="space-y-1">
//                 {section.items.map((item, itemIdx) => {
//                   const Icon = item.icon;
//                   const active = isActive(item.path);

//                   return (
//                     <li key={itemIdx}>
//                       <Link
//                         to={item.path}
//                         onClick={() => setIsMobileOpen(false)}
//                         className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
//                           active
//                             ? "bg-gradient-to-r from-lime-500/20 to-green-500/20 text-lime-400 shadow-lg shadow-lime-500/10"
//                             : "text-gray-300 hover:bg-white/10 hover:text-white"
//                         }`}
//                       >
//                         {/* Active Indicator */}
//                         {active && (
//                           <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-lime-400 to-green-500 rounded-r-full" />
//                         )}

//                         {/* Icon */}
//                         <div
//                           className={`flex-shrink-0 ${
//                             active
//                               ? "text-lime-400"
//                               : "text-gray-400 group-hover:text-white"
//                           } transition-colors`}
//                         >
//                           <Icon className="w-5 h-5" />
//                         </div>

//                         {/* Text */}
//                         <span
//                           className={`${
//                             isOpen ? "opacity-100" : "opacity-0 lg:opacity-0"
//                           } transition-opacity duration-300 font-medium text-sm whitespace-nowrap`}
//                         >
//                           {item.name}
//                         </span>

//                         {/* Hover Effect */}
//                         {!active && (
//                           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
//                         )}

//                         {/* Tooltip for collapsed state */}
//                         {!isOpen && (
//                           <div className="hidden lg:block absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-xl z-50">
//                             {item.name}
//                             <div className="absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
//                           </div>
//                         )}
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <div className="p-4 border-t border-white/10">
//           <div
//             className={`${
//               isOpen ? "opacity-100" : "opacity-0 lg:opacity-0"
//             } transition-opacity duration-300`}
//           >
//             <div className="bg-gradient-to-r from-lime-500/10 to-green-500/10 border border-lime-500/20 rounded-xl p-4">
//               <div className="flex items-center gap-3 mb-2">
//                 <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-green-500 rounded-lg flex items-center justify-center">
//                   <Zap className="w-4 h-4 text-white" />
//                 </div>
//                 <div>
//                   <h4 className="text-sm font-semibold text-white">Upgrade to Pro</h4>
//                   <p className="text-xs text-gray-400">Unlock all features</p>
//                 </div>
//               </div>
//               <button className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-lime-500 to-green-500 text-white text-sm font-semibold rounded-lg hover:from-lime-600 hover:to-green-600 transition-all shadow-lg hover:shadow-xl">
//                 Upgrade Now
//               </button>
//             </div>
//           </div>

//           {/* Collapsed state footer */}
//           {!isOpen && (
//             <div className="hidden lg:flex justify-center">
//               <button className="p-2 bg-gradient-to-br from-lime-500 to-green-500 rounded-lg hover:shadow-lg transition-all">
//                 <Zap className="w-5 h-5 text-white" />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Custom Scrollbar Styles */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(132, 204, 22, 0.3);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(132, 204, 22, 0.5);
//         }
//       `}</style>
//     </>
//   );
// };

// export default Onavbar;


import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  PenSquare,
  LayoutDashboard,
  Briefcase,
  Clock,
  FolderOpen,
  Grid3x3,
  Gift,
  Users,
  Plug,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Zap
} from "lucide-react";

const Onavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      title: "Main",
      items: [
        { name: "Post a Job", icon: PenSquare, path: "/Jobpost" },
        { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { name: "All Jobs", icon: Briefcase, path: "/alljobs" },
        { name: "Recent Interviews", icon: Clock, path: "/RecentInterviews" }
      ]
    },
    {
      title: "Job Details",
      items: [
        { name: "Categories", icon: FolderOpen, path: "/categories" },
        { name: "Subcategories", icon: Grid3x3, path: "/subcategories" },
        { name: "Benefits", icon: Gift, path: "/benefits" }
      ]
    },
    {
      title: "Organization",
      items: [
        { name: "Users", icon: Users, path: "/users" },
        { name: "Integrations", icon: Plug, path: "/integrations" }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "lg:w-72" : "lg:w-20"
        } ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } fixed lg:sticky top-0 left-0 h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white flex flex-col transition-all duration-300 ease-in-out z-40 shadow-2xl`}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div
              className={`${
                isOpen ? "opacity-100" : "opacity-0 lg:opacity-0"
              } transition-opacity duration-300 flex items-center gap-2`}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-lime-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
                  Cerplunk
                </span>
                <span className="text-xs text-gray-400">AI Interview Platform</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`hidden lg:flex p-2 hover:bg-white/10 rounded-lg transition-colors ${
                !isOpen ? "absolute -right-3 top-5 bg-gradient-to-br from-indigo-600 to-purple-700 shadow-lg" : ""
              }`}
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5"/>
              ) : (
                <ChevronRight className="w-5 h-5"/>
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
          {menuItems.map((section, sectionIdx) => (
            <div key={sectionIdx} className="mb-6">
              {/* Section Title */}
              <div
                className={`${
                  isOpen ? "opacity-100 mb-3" : "opacity-0 lg:opacity-0 mb-2"
                } transition-opacity duration-300 px-3`}
              >
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {section.title}
                </h3>
              </div>

              {/* Section Items */}
              <ul className="space-y-1">
                {section.items.map((item, itemIdx) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <li key={itemIdx}>
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                          active
                            ? "bg-gradient-to-r from-lime-500/20 to-green-500/20 text-lime-400 shadow-lg shadow-lime-500/10"
                            : "text-gray-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {/* Active Indicator */}
                        {active && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-lime-400 to-green-500 rounded-r-full" />
                        )}

                        {/* Icon */}
                        <div
                          className={`flex-shrink-0 ${
                            active
                              ? "text-lime-400"
                              : "text-gray-400 group-hover:text-white"
                          } transition-colors`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Text */}
                        <span
                          className={`${
                            isOpen ? "opacity-100" : "opacity-0 lg:opacity-0"
                          } transition-opacity duration-300 font-medium text-sm whitespace-nowrap`}
                        >
                          {item.name}
                        </span>

                        {/* Hover Effect */}
                        {!active && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                        )}

                        {/* Tooltip for collapsed state */}
                        {!isOpen && (
                          <div className="hidden lg:block absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-xl z-50">
                            {item.name}
                            <div className="absolute top-1/2 right-full -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                          </div>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div
            className={`${
              isOpen ? "opacity-100" : "opacity-0 lg:opacity-0"
            } transition-opacity duration-300`}
          >
            <div className="bg-gradient-to-r from-lime-500/10 to-green-500/10 border border-lime-500/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-green-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Upgrade to Pro</h4>
                  <p className="text-xs text-gray-400">Unlock all features</p>
                </div>
              </div>
              <button className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-lime-500 to-green-500 text-white text-sm font-semibold rounded-lg hover:from-lime-600 hover:to-green-600 transition-all shadow-lg hover:shadow-xl">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Collapsed state footer */}
          {!isOpen && (
            <div className="hidden lg:flex justify-center">
              <button className="p-2 bg-gradient-to-br from-lime-500 to-green-500 rounded-lg hover:shadow-lg transition-all">
                <Zap className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(132, 204, 22, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(132, 204, 22, 0.5);
        }
      `}</style>
    </>
  );
};

export default Onavbar;