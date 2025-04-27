// "use client";

// import { ActionContext } from "@/context/ActionContext";
// import { UserDetailContext } from "@/context/UserDetailContext";
// import { useContext, useEffect, useState } from "react";

// function App() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   // const { userDetail, setUserDetail } = useContext(UserDetailContext);

//   // Handle scroll effect

//   const { action, setAction } = useContext(ActionContext);
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="">
//       {/* Header */}
//       <header
//         className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out w-[95%] max-w-7xl mx-auto rounded-xl ${
//           isScrolled
//             ? "bg-slate-900/95 py-3 shadow-lg"
//             : "bg-gradient-to-r from-slate-900/80 to-slate-800/80 py-4"
//         } backdrop-blur-md shadow-lg shadow-slate-900/20 border border-white/10`}
//       >
//         <nav className="flex justify-between items-center px-6 lg:px-8">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral-500 to-magenta-500 flex items-center justify-center">
//               <span className="text-white font-bold text-xl">G</span>
//             </div>
//             <span className="text-2xl font-bold bg-gradient-to-r from-coral-400 to-magenta-400 bg-clip-text text-transparent">
//               Grok
//             </span>
//           </div>

//           {/* Nav Links - Desktop */}
//           <div className="hidden md:flex items-center space-x-8">
//             <ul className="flex gap-8">
//               {["Home", "About", "Services", "Contact"].map((item) => (
//                 <li key={item}>
//                   <a
//                     href="#"
//                     className="text-gray-200 hover:text-coral-400 transition-colors duration-300 text-sm font-medium tracking-wide"
//                   >
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//             {/* {!userDetail.name &&  */}
//             <button className="bg-gradient-to-r from-coral-500 to-magenta-500 px-5 py-2 rounded-full text-white font-medium text-sm hover:shadow-lg hover:shadow-coral-500/20 transition-all duration-300">
//               Get Started
//             </button>

//             <button>Export</button>

//             {/* } */}
//           </div>

//           {/* Mobile menu button */}
//           <button className="md:hidden text-white">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </button>
//         </nav>
//       </header>
//     </div>
//   );
// }

// export default App;