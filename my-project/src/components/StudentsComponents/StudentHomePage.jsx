// // import { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { useNavigate, useParams, useLocation } from "react-router-dom";
// // import { 
// //   Code, 
// //   Server, 
// //   Cloud, 
// //   Brain, 
// //   Database, 
// //   CheckCircle2,
// //   ArrowRight,
// //   ChevronLeft
// // } from "lucide-react";

// // const StudentHomePage = () => {
// //   const navigate = useNavigate();
// //   const { id } = useParams();
// //   const location = useLocation();
// //   const queryParams = new URLSearchParams(location.search);
// //   const studentId = queryParams.get("studentId");

// //   const [selectedDomain, setSelectedDomain] = useState(null);
// //   const [selectedSkills, setSelectedSkills] = useState([]);

// //   // Domain categories with their tech stacks
// //   const domains = [
// //     {
// //       id: "frontend",
// //       name: "Frontend",
// //       icon: Code,
// //       color: "from-emerald-400 to-lime-500",
// //       skills: [
// //         { id: "react", name: "React.js", category: "framework" },
// //         { id: "angular", name: "Angular", category: "framework" },
// //         { id: "vue", name: "Vue.js", category: "framework" },
// //         { id: "nextjs", name: "Next.js", category: "framework" },
// //         { id: "javascript", name: "JavaScript", category: "language" },
// //         { id: "typescript", name: "TypeScript", category: "language" },
// //         { id: "html", name: "HTML5", category: "language" },
// //         { id: "css", name: "CSS3", category: "language" },
// //         { id: "tailwind", name: "Tailwind CSS", category: "styling" },
// //         { id: "sass", name: "SASS/SCSS", category: "styling" },
// //         { id: "redux", name: "Redux", category: "state-management" },
// //         { id: "webpack", name: "Webpack", category: "tools" }
// //       ]
// //     },
// //     {
// //       id: "backend",
// //       name: "Backend",
// //       icon: Server,
// //       color: "from-lime-400 to-green-500",
// //       skills: [
// //         { id: "nodejs", name: "Node.js", category: "runtime" },
// //         { id: "express", name: "Express.js", category: "framework" },
// //         { id: "nestjs", name: "NestJS", category: "framework" },
// //         { id: "python", name: "Python", category: "language" },
// //         { id: "django", name: "Django", category: "framework" },
// //         { id: "flask", name: "Flask", category: "framework" },
// //         { id: "java", name: "Java", category: "language" },
// //         { id: "springboot", name: "Spring Boot", category: "framework" },
// //         { id: "go", name: "Go", category: "language" },
// //         { id: "ruby", name: "Ruby on Rails", category: "framework" },
// //         { id: "php", name: "PHP", category: "language" },
// //         { id: "laravel", name: "Laravel", category: "framework" }
// //       ]
// //     },
// //     {
// //       id: "devops",
// //       name: "DevOps",
// //       icon: Cloud,
// //       color: "from-green-400 to-teal-500",
// //       skills: [
// //         { id: "docker", name: "Docker", category: "containerization" },
// //         { id: "kubernetes", name: "Kubernetes", category: "orchestration" },
// //         { id: "jenkins", name: "Jenkins", category: "ci-cd" },
// //         { id: "gitlab", name: "GitLab CI", category: "ci-cd" },
// //         { id: "github-actions", name: "GitHub Actions", category: "ci-cd" },
// //         { id: "aws", name: "AWS", category: "cloud" },
// //         { id: "azure", name: "Azure", category: "cloud" },
// //         { id: "gcp", name: "Google Cloud", category: "cloud" },
// //         { id: "terraform", name: "Terraform", category: "iac" },
// //         { id: "ansible", name: "Ansible", category: "iac" },
// //         { id: "prometheus", name: "Prometheus", category: "monitoring" },
// //         { id: "grafana", name: "Grafana", category: "monitoring" }
// //       ]
// //     },
// //     {
// //       id: "ml",
// //       name: "Machine Learning",
// //       icon: Brain,
// //       color: "from-teal-400 to-cyan-500",
// //       skills: [
// //         { id: "python-ml", name: "Python", category: "language" },
// //         { id: "tensorflow", name: "TensorFlow", category: "framework" },
// //         { id: "pytorch", name: "PyTorch", category: "framework" },
// //         { id: "keras", name: "Keras", category: "framework" },
// //         { id: "scikit", name: "Scikit-learn", category: "library" },
// //         { id: "pandas", name: "Pandas", category: "library" },
// //         { id: "numpy", name: "NumPy", category: "library" },
// //         { id: "opencv", name: "OpenCV", category: "computer-vision" },
// //         { id: "nlp", name: "NLP/NLTK", category: "nlp" },
// //         { id: "huggingface", name: "Hugging Face", category: "nlp" },
// //         { id: "jupyter", name: "Jupyter", category: "tools" },
// //         { id: "spark", name: "Apache Spark", category: "big-data" }
// //       ]
// //     },
// //     {
// //       id: "data-engineering",
// //       name: "Data Engineering",
// //       icon: Database,
// //       color: "from-cyan-400 to-blue-500",
// //       skills: [
// //         { id: "sql", name: "SQL", category: "language" },
// //         { id: "postgresql", name: "PostgreSQL", category: "database" },
// //         { id: "mysql", name: "MySQL", category: "database" },
// //         { id: "mongodb", name: "MongoDB", category: "database" },
// //         { id: "redis", name: "Redis", category: "cache" },
// //         { id: "elasticsearch", name: "Elasticsearch", category: "search" },
// //         { id: "kafka", name: "Apache Kafka", category: "streaming" },
// //         { id: "airflow", name: "Apache Airflow", category: "orchestration" },
// //         { id: "spark-de", name: "Apache Spark", category: "processing" },
// //         { id: "hadoop", name: "Hadoop", category: "big-data" },
// //         { id: "snowflake", name: "Snowflake", category: "warehouse" },
// //         { id: "databricks", name: "Databricks", category: "platform" }
// //       ]
// //     }
// //   ];

// //   const handleDomainSelect = (domain) => {
// //     setSelectedDomain(domain);
// //     setSelectedSkills([]);
// //   };

// //   const handleSkillToggle = (skillId) => {
// //     setSelectedSkills(prev => 
// //       prev.includes(skillId) 
// //         ? prev.filter(id => id !== skillId)
// //         : [...prev, skillId]
// //     );
// //   };

// //   const handleStartInterview = () => {
// //     if (selectedSkills.length === 0) {
// //       alert("Please select at least one skill to continue");
// //       return;
// //     }

// //     // Navigate to interview page with selected skills
// //     const skillsParam = selectedSkills.join(',');
// //     navigate(`/interview/${id}?studentId=${studentId}&skills=${skillsParam}&domain=${selectedDomain.id}`);
// //   };

// //   const handleBack = () => {
// //     setSelectedDomain(null);
// //     setSelectedSkills([]);
// //   };

// //   // Group skills by category
// //   const groupSkillsByCategory = (skills) => {
// //     const grouped = {};
// //     skills.forEach(skill => {
// //       if (!grouped[skill.category]) {
// //         grouped[skill.category] = [];
// //       }
// //       grouped[skill.category].push(skill);
// //     });
// //     return grouped;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-lime-50/40">
// //       {/* Header */}
// //       <motion.header 
// //         initial={{ y: -20, opacity: 0 }}
// //         animate={{ y: 0, opacity: 1 }}
// //         className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm"
// //       >
// //         <div className="max-w-7xl mx-auto px-6 py-4">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-lime-500 flex items-center justify-center">
// //                 <Brain className="w-6 h-6 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-xl font-bold text-gray-900">AI Interview Platform</h1>
// //                 <p className="text-xs text-gray-600">Select your expertise</p>
// //               </div>
// //             </div>
// //             {selectedDomain && (
// //               <motion.button
// //                 initial={{ opacity: 0, x: 20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 onClick={handleBack}
// //                 className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
// //               >
// //                 <ChevronLeft className="w-4 h-4" />
// //                 Back to Domains
// //               </motion.button>
// //             )}
// //           </div>
// //         </div>
// //       </motion.header>

// //       <div className="max-w-7xl mx-auto px-6 py-12">
// //         <AnimatePresence mode="wait">
// //           {!selectedDomain ? (
// //             // Domain Selection View
// //             <motion.div
// //               key="domains"
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: -20 }}
// //               transition={{ duration: 0.3 }}
// //             >
// //               {/* Title Section */}
// //               <div className="text-center mb-12">
// //                 <motion.h2 
// //                   initial={{ opacity: 0, y: -10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: 0.1 }}
// //                   className="text-4xl font-bold text-gray-900 mb-3"
// //                 >
// //                   Choose Your Domain
// //                 </motion.h2>
// //                 <motion.p 
// //                   initial={{ opacity: 0, y: -10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: 0.2 }}
// //                   className="text-gray-600 text-lg"
// //                 >
// //                   Select the area you'd like to be interviewed in
// //                 </motion.p>
// //               </div>

// //               {/* Domain Cards Grid */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
// //                 {domains.map((domain, index) => {
// //                   const Icon = domain.icon;
// //                   return (
// //                     <motion.button
// //                       key={domain.id}
// //                       initial={{ opacity: 0, y: 20 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       transition={{ delay: index * 0.1 }}
// //                       onClick={() => handleDomainSelect(domain)}
// //                       whileHover={{ y: -8, scale: 1.02 }}
// //                       whileTap={{ scale: 0.98 }}
// //                       className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-lime-300"
// //                     >
// //                       {/* Gradient Background on Hover */}
// //                       <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                      
// //                       {/* Icon */}
// //                       <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
// //                         <Icon className="w-8 h-8 text-white" />
// //                       </div>

// //                       {/* Title */}
// //                       <h3 className="text-xl font-bold text-gray-900 mb-2">
// //                         {domain.name}
// //                       </h3>

// //                       {/* Skill Count */}
// //                       <p className="text-sm text-gray-600">
// //                         {domain.skills.length} skills available
// //                       </p>

// //                       {/* Arrow Icon */}
// //                       <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-lime-500 flex items-center justify-center transition-all duration-300">
// //                         <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white" />
// //                       </div>
// //                     </motion.button>
// //                   );
// //                 })}
// //               </div>
// //             </motion.div>
// //           ) : (
// //             // Skills Selection View
// //             <motion.div
// //               key="skills"
// //               initial={{ opacity: 0, x: 20 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               exit={{ opacity: 0, x: -20 }}
// //               transition={{ duration: 0.3 }}
// //               className="space-y-8"
// //             >
// //               {/* Header */}
// //               <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
// //                 <div className="flex items-center gap-4 mb-4">
// //                   <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedDomain.color} flex items-center justify-center`}>
// //                     <selectedDomain.icon className="w-7 h-7 text-white" />
// //                   </div>
// //                   <div>
// //                     <h2 className="text-3xl font-bold text-gray-900">{selectedDomain.name}</h2>
// //                     <p className="text-gray-600">Select the technologies you're proficient in</p>
// //                   </div>
// //                 </div>

// //                 {/* Selected Count */}
// //                 {selectedSkills.length > 0 && (
// //                   <motion.div
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-lime-50 border border-lime-200 rounded-lg"
// //                   >
// //                     <CheckCircle2 className="w-5 h-5 text-lime-600" />
// //                     <span className="text-sm font-semibold text-gray-700">
// //                       {selectedSkills.length} {selectedSkills.length === 1 ? 'skill' : 'skills'} selected
// //                     </span>
// //                   </motion.div>
// //                 )}
// //               </div>

// //               {/* Skills Grid by Category */}
// //               <div className="space-y-6">
// //                 {Object.entries(groupSkillsByCategory(selectedDomain.skills)).map(([category, skills]) => (
// //                   <motion.div
// //                     key={category}
// //                     initial={{ opacity: 0, y: 20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
// //                   >
// //                     <h3 className="text-lg font-bold text-gray-900 mb-4 capitalize">
// //                       {category.replace(/-/g, ' ')}
// //                     </h3>
// //                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
// //                       {skills.map((skill) => {
// //                         const isSelected = selectedSkills.includes(skill.id);
// //                         return (
// //                           <motion.button
// //                             key={skill.id}
// //                             onClick={() => handleSkillToggle(skill.id)}
// //                             whileHover={{ scale: 1.03 }}
// //                             whileTap={{ scale: 0.97 }}
// //                             className={`relative px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
// //                               isSelected
// //                                 ? 'bg-gradient-to-br from-emerald-400 to-lime-500 text-white shadow-lg shadow-lime-200'
// //                                 : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-lime-300'
// //                             }`}
// //                           >
// //                             <span className="flex items-center justify-center gap-2">
// //                               {isSelected && <CheckCircle2 className="w-4 h-4" />}
// //                               {skill.name}
// //                             </span>
// //                           </motion.button>
// //                         );
// //                       })}
// //                     </div>
// //                   </motion.div>
// //                 ))}
// //               </div>

// //               {/* Start Interview Button - Fixed at Bottom Right */}
// //               <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 className="fixed bottom-8 right-8 z-40"
// //               >
// //                 <motion.button
// //                   onClick={handleStartInterview}
// //                   disabled={selectedSkills.length === 0}
// //                   whileHover={{ scale: selectedSkills.length > 0 ? 1.05 : 1 }}
// //                   whileTap={{ scale: selectedSkills.length > 0 ? 0.95 : 1 }}
// //                   className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 ${
// //                     selectedSkills.length > 0
// //                       ? 'bg-gradient-to-r from-emerald-500 to-lime-500 text-white hover:shadow-lime-300 hover:from-emerald-600 hover:to-lime-600'
// //                       : 'bg-gray-300 text-gray-500 cursor-not-allowed'
// //                   }`}
// //                 >
// //                   <span>Start Interview</span>
// //                   <ArrowRight className={`w-6 h-6 ${selectedSkills.length > 0 ? 'group-hover:translate-x-1' : ''} transition-transform`} />
// //                 </motion.button>
// //               </motion.div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StudentHomePage;



// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import axios from "axios";
// import { 
//   Code, 
//   Server, 
//   Cloud, 
//   Brain, 
//   Database, 
//   CheckCircle2,
//   ArrowRight,
//   ChevronLeft,
//   Smartphone,
//   Shield,
//   Gamepad2,
//   LineChart,
//   Palette,
//   Network,
//   Bot,
//   Blocks
// } from "lucide-react";

// const StudentHomePage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
// //   const studentId = queryParams.get("studentId");
//   const {studentId} = useParams();
//   console.log("Student ID in Home Page:", studentId);
  
//   const [selectedDomain, setSelectedDomain] = useState(null);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Domain categories with their tech stacks
//   const domains = [
//     {
//       id: "frontend",
//       name: "Frontend",
//       icon: Code,
//       color: "from-emerald-400 to-lime-500",
//       skills: [
//         { id: "react", name: "React.js", category: "framework" },
//         { id: "angular", name: "Angular", category: "framework" },
//         { id: "vue", name: "Vue.js", category: "framework" },
//         { id: "nextjs", name: "Next.js", category: "framework" },
//         { id: "svelte", name: "Svelte", category: "framework" },
//         { id: "javascript", name: "JavaScript", category: "language" },
//         { id: "typescript", name: "TypeScript", category: "language" },
//         { id: "html", name: "HTML5", category: "language" },
//         { id: "css", name: "CSS3", category: "language" },
//         { id: "tailwind", name: "Tailwind CSS", category: "styling" },
//         { id: "sass", name: "SASS/SCSS", category: "styling" },
//         { id: "bootstrap", name: "Bootstrap", category: "styling" },
//         { id: "material-ui", name: "Material-UI", category: "styling" },
//         { id: "redux", name: "Redux", category: "state-management" },
//         { id: "mobx", name: "MobX", category: "state-management" },
//         { id: "zustand", name: "Zustand", category: "state-management" },
//         { id: "webpack", name: "Webpack", category: "tools" },
//         { id: "vite", name: "Vite", category: "tools" },
//         { id: "jest", name: "Jest", category: "testing" },
//         { id: "cypress", name: "Cypress", category: "testing" }
//       ]
//     },
//     {
//       id: "backend",
//       name: "Backend",
//       icon: Server,
//       color: "from-lime-400 to-green-500",
//       skills: [
//         { id: "nodejs", name: "Node.js", category: "runtime" },
//         { id: "express", name: "Express.js", category: "framework" },
//         { id: "nestjs", name: "NestJS", category: "framework" },
//         { id: "fastify", name: "Fastify", category: "framework" },
//         { id: "python", name: "Python", category: "language" },
//         { id: "django", name: "Django", category: "framework" },
//         { id: "flask", name: "Flask", category: "framework" },
//         { id: "fastapi", name: "FastAPI", category: "framework" },
//         { id: "java", name: "Java", category: "language" },
//         { id: "springboot", name: "Spring Boot", category: "framework" },
//         { id: "go", name: "Go", category: "language" },
//         { id: "gin", name: "Gin", category: "framework" },
//         { id: "ruby", name: "Ruby on Rails", category: "framework" },
//         { id: "php", name: "PHP", category: "language" },
//         { id: "laravel", name: "Laravel", category: "framework" },
//         { id: "csharp", name: "C#", category: "language" },
//         { id: "dotnet", name: ".NET Core", category: "framework" },
//         { id: "graphql", name: "GraphQL", category: "api" },
//         { id: "rest", name: "REST API", category: "api" },
//         { id: "grpc", name: "gRPC", category: "api" }
//       ]
//     },
//     {
//       id: "mobile",
//       name: "Mobile Development",
//       icon: Smartphone,
//       color: "from-pink-400 to-rose-500",
//       skills: [
//         { id: "react-native", name: "React Native", category: "framework" },
//         { id: "flutter", name: "Flutter", category: "framework" },
//         { id: "swift", name: "Swift", category: "language" },
//         { id: "swiftui", name: "SwiftUI", category: "framework" },
//         { id: "kotlin", name: "Kotlin", category: "language" },
//         { id: "java-android", name: "Java (Android)", category: "language" },
//         { id: "jetpack-compose", name: "Jetpack Compose", category: "framework" },
//         { id: "dart", name: "Dart", category: "language" },
//         { id: "ionic", name: "Ionic", category: "framework" },
//         { id: "xamarin", name: "Xamarin", category: "framework" },
//         { id: "cordova", name: "Apache Cordova", category: "framework" },
//         { id: "firebase", name: "Firebase", category: "backend-service" },
//         { id: "realm", name: "Realm", category: "database" },
//         { id: "sqlite", name: "SQLite", category: "database" },
//         { id: "push-notifications", name: "Push Notifications", category: "feature" },
//         { id: "in-app-purchase", name: "In-App Purchases", category: "feature" }
//       ]
//     },
//     {
//       id: "devops",
//       name: "DevOps",
//       icon: Cloud,
//       color: "from-green-400 to-teal-500",
//       skills: [
//         { id: "docker", name: "Docker", category: "containerization" },
//         { id: "kubernetes", name: "Kubernetes", category: "orchestration" },
//         { id: "helm", name: "Helm", category: "orchestration" },
//         { id: "jenkins", name: "Jenkins", category: "ci-cd" },
//         { id: "gitlab", name: "GitLab CI", category: "ci-cd" },
//         { id: "github-actions", name: "GitHub Actions", category: "ci-cd" },
//         { id: "circleci", name: "CircleCI", category: "ci-cd" },
//         { id: "travis", name: "Travis CI", category: "ci-cd" },
//         { id: "aws", name: "AWS", category: "cloud" },
//         { id: "azure", name: "Azure", category: "cloud" },
//         { id: "gcp", name: "Google Cloud", category: "cloud" },
//         { id: "terraform", name: "Terraform", category: "iac" },
//         { id: "ansible", name: "Ansible", category: "iac" },
//         { id: "cloudformation", name: "CloudFormation", category: "iac" },
//         { id: "prometheus", name: "Prometheus", category: "monitoring" },
//         { id: "grafana", name: "Grafana", category: "monitoring" },
//         { id: "elk", name: "ELK Stack", category: "logging" },
//         { id: "nginx", name: "Nginx", category: "web-server" },
//         { id: "linux", name: "Linux", category: "os" },
//         { id: "bash", name: "Bash Scripting", category: "scripting" }
//       ]
//     },
//     {
//       id: "ml",
//       name: "Machine Learning",
//       icon: Brain,
//       color: "from-teal-400 to-cyan-500",
//       skills: [
//         { id: "python-ml", name: "Python", category: "language" },
//         { id: "r", name: "R", category: "language" },
//         { id: "tensorflow", name: "TensorFlow", category: "framework" },
//         { id: "pytorch", name: "PyTorch", category: "framework" },
//         { id: "keras", name: "Keras", category: "framework" },
//         { id: "scikit", name: "Scikit-learn", category: "library" },
//         { id: "pandas", name: "Pandas", category: "library" },
//         { id: "numpy", name: "NumPy", category: "library" },
//         { id: "matplotlib", name: "Matplotlib", category: "visualization" },
//         { id: "seaborn", name: "Seaborn", category: "visualization" },
//         { id: "opencv", name: "OpenCV", category: "computer-vision" },
//         { id: "yolo", name: "YOLO", category: "computer-vision" },
//         { id: "nlp", name: "NLP/NLTK", category: "nlp" },
//         { id: "spacy", name: "spaCy", category: "nlp" },
//         { id: "huggingface", name: "Hugging Face", category: "nlp" },
//         { id: "transformers", name: "Transformers", category: "nlp" },
//         { id: "jupyter", name: "Jupyter", category: "tools" },
//         { id: "mlflow", name: "MLflow", category: "mlops" },
//         { id: "kubeflow", name: "Kubeflow", category: "mlops" },
//         { id: "spark-ml", name: "Apache Spark MLlib", category: "big-data" }
//       ]
//     },
//     {
//       id: "data-engineering",
//       name: "Data Engineering",
//       icon: Database,
//       color: "from-cyan-400 to-blue-500",
//       skills: [
//         { id: "sql", name: "SQL", category: "language" },
//         { id: "python-de", name: "Python", category: "language" },
//         { id: "scala", name: "Scala", category: "language" },
//         { id: "postgresql", name: "PostgreSQL", category: "database" },
//         { id: "mysql", name: "MySQL", category: "database" },
//         { id: "mongodb", name: "MongoDB", category: "database" },
//         { id: "cassandra", name: "Cassandra", category: "database" },
//         { id: "dynamodb", name: "DynamoDB", category: "database" },
//         { id: "redis", name: "Redis", category: "cache" },
//         { id: "memcached", name: "Memcached", category: "cache" },
//         { id: "elasticsearch", name: "Elasticsearch", category: "search" },
//         { id: "kafka", name: "Apache Kafka", category: "streaming" },
//         { id: "flink", name: "Apache Flink", category: "streaming" },
//         { id: "airflow", name: "Apache Airflow", category: "orchestration" },
//         { id: "luigi", name: "Luigi", category: "orchestration" },
//         { id: "spark-de", name: "Apache Spark", category: "processing" },
//         { id: "hadoop", name: "Hadoop", category: "big-data" },
//         { id: "hive", name: "Apache Hive", category: "big-data" },
//         { id: "snowflake", name: "Snowflake", category: "warehouse" },
//         { id: "redshift", name: "Redshift", category: "warehouse" },
//         { id: "bigquery", name: "BigQuery", category: "warehouse" },
//         { id: "databricks", name: "Databricks", category: "platform" }
//       ]
//     },
//     {
//       id: "cybersecurity",
//       name: "Cybersecurity",
//       icon: Shield,
//       color: "from-red-400 to-orange-500",
//       skills: [
//         { id: "penetration-testing", name: "Penetration Testing", category: "offensive" },
//         { id: "ethical-hacking", name: "Ethical Hacking", category: "offensive" },
//         { id: "metasploit", name: "Metasploit", category: "tools" },
//         { id: "burp-suite", name: "Burp Suite", category: "tools" },
//         { id: "wireshark", name: "Wireshark", category: "tools" },
//         { id: "nmap", name: "Nmap", category: "tools" },
//         { id: "kali-linux", name: "Kali Linux", category: "os" },
//         { id: "owasp", name: "OWASP Top 10", category: "knowledge" },
//         { id: "cryptography", name: "Cryptography", category: "knowledge" },
//         { id: "network-security", name: "Network Security", category: "defensive" },
//         { id: "firewall", name: "Firewall Configuration", category: "defensive" },
//         { id: "ids-ips", name: "IDS/IPS", category: "defensive" },
//         { id: "siem", name: "SIEM", category: "monitoring" },
//         { id: "splunk", name: "Splunk", category: "monitoring" },
//         { id: "incident-response", name: "Incident Response", category: "defensive" },
//         { id: "forensics", name: "Digital Forensics", category: "investigation" },
//         { id: "malware-analysis", name: "Malware Analysis", category: "investigation" },
//         { id: "security-compliance", name: "Security Compliance", category: "governance" }
//       ]
//     },
//     {
//       id: "game-dev",
//       name: "Game Development",
//       icon: Gamepad2,
//       color: "from-purple-400 to-pink-500",
//       skills: [
//         { id: "unity", name: "Unity", category: "engine" },
//         { id: "unreal", name: "Unreal Engine", category: "engine" },
//         { id: "godot", name: "Godot", category: "engine" },
//         { id: "csharp-game", name: "C#", category: "language" },
//         { id: "cpp", name: "C++", category: "language" },
//         { id: "gdscript", name: "GDScript", category: "language" },
//         { id: "blueprints", name: "Blueprints", category: "visual-scripting" },
//         { id: "3d-modeling", name: "3D Modeling", category: "art" },
//         { id: "blender", name: "Blender", category: "tools" },
//         { id: "maya", name: "Maya", category: "tools" },
//         { id: "substance", name: "Substance Painter", category: "tools" },
//         { id: "photoshop", name: "Photoshop", category: "tools" },
//         { id: "game-physics", name: "Game Physics", category: "programming" },
//         { id: "ai-programming", name: "AI Programming", category: "programming" },
//         { id: "multiplayer", name: "Multiplayer Networking", category: "programming" },
//         { id: "shader", name: "Shader Programming", category: "graphics" },
//         { id: "opengl", name: "OpenGL", category: "graphics" },
//         { id: "directx", name: "DirectX", category: "graphics" }
//       ]
//     },
//     {
//       id: "data-science",
//       name: "Data Science",
//       icon: LineChart,
//       color: "from-blue-400 to-indigo-500",
//       skills: [
//         { id: "python-ds", name: "Python", category: "language" },
//         { id: "r-ds", name: "R", category: "language" },
//         { id: "statistics", name: "Statistics", category: "mathematics" },
//         { id: "probability", name: "Probability", category: "mathematics" },
//         { id: "linear-algebra", name: "Linear Algebra", category: "mathematics" },
//         { id: "pandas-ds", name: "Pandas", category: "library" },
//         { id: "numpy-ds", name: "NumPy", category: "library" },
//         { id: "scipy", name: "SciPy", category: "library" },
//         { id: "matplotlib-ds", name: "Matplotlib", category: "visualization" },
//         { id: "seaborn-ds", name: "Seaborn", category: "visualization" },
//         { id: "plotly", name: "Plotly", category: "visualization" },
//         { id: "tableau", name: "Tableau", category: "bi-tools" },
//         { id: "power-bi", name: "Power BI", category: "bi-tools" },
//         { id: "excel", name: "Advanced Excel", category: "tools" },
//         { id: "hypothesis-testing", name: "Hypothesis Testing", category: "analysis" },
//         { id: "regression", name: "Regression Analysis", category: "analysis" },
//         { id: "time-series", name: "Time Series Analysis", category: "analysis" },
//         { id: "ab-testing", name: "A/B Testing", category: "experimentation" }
//       ]
//     },
//     {
//       id: "uiux",
//       name: "UI/UX Design",
//       icon: Palette,
//       color: "from-indigo-400 to-purple-500",
//       skills: [
//         { id: "figma", name: "Figma", category: "tools" },
//         { id: "sketch", name: "Sketch", category: "tools" },
//         { id: "adobe-xd", name: "Adobe XD", category: "tools" },
//         { id: "photoshop-ui", name: "Photoshop", category: "tools" },
//         { id: "illustrator", name: "Illustrator", category: "tools" },
//         { id: "invision", name: "InVision", category: "prototyping" },
//         { id: "framer", name: "Framer", category: "prototyping" },
//         { id: "protopie", name: "ProtoPie", category: "prototyping" },
//         { id: "user-research", name: "User Research", category: "research" },
//         { id: "usability-testing", name: "Usability Testing", category: "research" },
//         { id: "wireframing", name: "Wireframing", category: "design" },
//         { id: "prototyping", name: "Prototyping", category: "design" },
//         { id: "visual-design", name: "Visual Design", category: "design" },
//         { id: "interaction-design", name: "Interaction Design", category: "design" },
//         { id: "design-systems", name: "Design Systems", category: "design" },
//         { id: "accessibility", name: "Accessibility", category: "standards" },
//         { id: "responsive-design", name: "Responsive Design", category: "standards" },
//         { id: "design-thinking", name: "Design Thinking", category: "methodology" }
//       ]
//     },
//     {
//       id: "blockchain",
//       name: "Blockchain",
//       icon: Blocks,
//       color: "from-violet-400 to-purple-500",
//       skills: [
//         { id: "solidity", name: "Solidity", category: "language" },
//         { id: "rust-blockchain", name: "Rust", category: "language" },
//         { id: "ethereum", name: "Ethereum", category: "platform" },
//         { id: "hyperledger", name: "Hyperledger", category: "platform" },
//         { id: "polkadot", name: "Polkadot", category: "platform" },
//         { id: "smart-contracts", name: "Smart Contracts", category: "development" },
//         { id: "web3js", name: "Web3.js", category: "library" },
//         { id: "ethersjs", name: "Ethers.js", category: "library" },
//         { id: "hardhat", name: "Hardhat", category: "tools" },
//         { id: "truffle", name: "Truffle", category: "tools" },
//         { id: "metamask", name: "MetaMask", category: "wallet" },
//         { id: "ipfs", name: "IPFS", category: "storage" },
//         { id: "defi", name: "DeFi Protocols", category: "domain" },
//         { id: "nft", name: "NFT Development", category: "domain" },
//         { id: "dao", name: "DAO Architecture", category: "domain" },
//         { id: "consensus", name: "Consensus Mechanisms", category: "knowledge" },
//         { id: "cryptography-bc", name: "Cryptography", category: "knowledge" }
//       ]
//     },
//     {
//       id: "ai-automation",
//       name: "AI & Automation",
//       icon: Bot,
//       color: "from-amber-400 to-orange-500",
//       skills: [
//         { id: "chatgpt", name: "ChatGPT API", category: "llm" },
//         { id: "openai", name: "OpenAI API", category: "llm" },
//         { id: "claude", name: "Claude API", category: "llm" },
//         { id: "langchain", name: "LangChain", category: "framework" },
//         { id: "llamaindex", name: "LlamaIndex", category: "framework" },
//         { id: "prompt-engineering", name: "Prompt Engineering", category: "skill" },
//         { id: "rpa", name: "RPA", category: "automation" },
//         { id: "uipath", name: "UiPath", category: "tools" },
//         { id: "automation-anywhere", name: "Automation Anywhere", category: "tools" },
//         { id: "selenium", name: "Selenium", category: "testing" },
//         { id: "puppeteer", name: "Puppeteer", category: "automation" },
//         { id: "playwright", name: "Playwright", category: "automation" },
//         { id: "vector-db", name: "Vector Databases", category: "database" },
//         { id: "pinecone", name: "Pinecone", category: "database" },
//         { id: "rag", name: "RAG Architecture", category: "architecture" },
//         { id: "fine-tuning", name: "Model Fine-tuning", category: "training" },
//         { id: "agent-frameworks", name: "Agent Frameworks", category: "framework" }
//       ]
//     },
//     {
//       id: "networking",
//       name: "Networking",
//       icon: Network,
//       color: "from-sky-400 to-blue-500",
//       skills: [
//         { id: "tcp-ip", name: "TCP/IP", category: "protocols" },
//         { id: "http-https", name: "HTTP/HTTPS", category: "protocols" },
//         { id: "dns", name: "DNS", category: "protocols" },
//         { id: "dhcp", name: "DHCP", category: "protocols" },
//         { id: "routing", name: "Routing", category: "core" },
//         { id: "switching", name: "Switching", category: "core" },
//         { id: "vlan", name: "VLAN", category: "core" },
//         { id: "vpn", name: "VPN", category: "security" },
//         { id: "cisco", name: "Cisco", category: "vendor" },
//         { id: "juniper", name: "Juniper", category: "vendor" },
//         { id: "load-balancing", name: "Load Balancing", category: "infrastructure" },
//         { id: "cdn", name: "CDN", category: "infrastructure" },
//         { id: "network-monitoring", name: "Network Monitoring", category: "management" },
//         { id: "packet-analysis", name: "Packet Analysis", category: "troubleshooting" },
//         { id: "bgp", name: "BGP", category: "advanced" },
//         { id: "ospf", name: "OSPF", category: "advanced" },
//         { id: "mpls", name: "MPLS", category: "advanced" }
//       ]
//     }
//   ];
  

//   const handleDomainSelect = (domain) => {
//     setSelectedDomain(domain);
//     setSelectedSkills([]);
//   };

//   const handleSkillToggle = (skillId) => {
//     setSelectedSkills(prev => 
//       prev.includes(skillId) 
//         ? prev.filter(id => id !== skillId)
//         : [...prev, skillId]
//     );
//   };

// const handleStartInterview = async () => {
//   if (selectedSkills.length === 0) {
//     alert("Please select at least one skill to continue");
//     return;
//   }

//   setLoading(true);
//   try {
//     const skillsParam = selectedSkills.join(","); // ✅ FIX

//     console.log("Student ID being sent:", studentId);
//     console.log("Skills being sent:", skillsParam);

//      const response = await axios.patch(
//       "http://localhost:8080/jobs/update-skills",
//       {
//         studentId: studentId,
//         skills: skillsParam
//       }
//     );
    
//     console.log("Response from saving skills:", response.data);

//     if (response.data.success) {
//       alert("Skills saved successfully");
//       navigate(`/StudentInterviewPage/${studentId}`);
//     } else {
//       alert(response.data.message || "Failed to save skills");
//     }
//   } catch (error) {
//     alert(
//       error.response?.data?.message ||
//       "Error saving skills"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   const handleBack = () => {
//     setSelectedDomain(null);
//     setSelectedSkills([]);
//   };

//   // Group skills by category
//   const groupSkillsByCategory = (skills) => {
//     const grouped = {};
//     skills.forEach(skill => {
//       if (!grouped[skill.category]) {
//         grouped[skill.category] = [];
//       }
//       grouped[skill.category].push(skill);
//     });
//     return grouped;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-lime-50/40">
//       {/* Header */}
//       <motion.header 
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm"
//       >
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-lime-500 flex items-center justify-center">
//                 <Brain className="w-6 h-6 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">AI Interview Platform</h1>
//                 <p className="text-xs text-gray-600">Select your expertise</p>
//               </div>
//             </div>
//             {selectedDomain && (
//               <motion.button
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 onClick={handleBack}
//                 className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//                 Back to Domains
//               </motion.button>
//             )}
//           </div>
//         </div>
//       </motion.header>

//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <AnimatePresence mode="wait">
//           {!selectedDomain ? (
//             // Domain Selection View
//             <motion.div
//               key="domains"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               {/* Title Section */}
//               <div className="text-center mb-12">
//                 <motion.h2 
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.1 }}
//                   className="text-4xl font-bold text-gray-900 mb-3"
//                 >
//                   Choose Your Domain
//                 </motion.h2>
//                 <motion.p 
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.2 }}
//                   className="text-gray-600 text-lg"
//                 >
//                   Select the area you'd like to be interviewed in
//                 </motion.p>
//               </div>

//               {/* Domain Cards Grid */}
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
//                 {domains.map((domain, index) => {
//                   const Icon = domain.icon;
//                   return (
//                     <motion.button
//                       key={domain.id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       onClick={() => handleDomainSelect(domain)}
//                       whileHover={{ y: -8, scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       className="group relative bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-lime-300"
//                     >
//                       {/* Gradient Background on Hover */}
//                       <div className={`absolute inset-0 bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                      
//                       {/* Icon */}
//                       <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
//                         <Icon className="w-8 h-8 text-white" />
//                       </div>

//                       {/* Title */}
//                       <h3 className="text-xl font-bold text-gray-900 mb-2">
//                         {domain.name}
//                       </h3>

//                       {/* Skill Count */}
//                       <p className="text-sm text-gray-600">
//                         {domain.skills.length} skills available
//                       </p>

//                       {/* Arrow Icon */}
//                       <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-emerald-400 group-hover:to-lime-500 flex items-center justify-center transition-all duration-300">
//                         <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white" />
//                       </div>
//                     </motion.button>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           ) : (
//             // Skills Selection View
//             <motion.div
//               key="skills"
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.3 }}
//               className="space-y-8"
//             >
//               {/* Header */}
//               <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
//                 <div className="flex items-center gap-4 mb-4">
//                   <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${selectedDomain.color} flex items-center justify-center`}>
//                     <selectedDomain.icon className="w-7 h-7 text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-3xl font-bold text-gray-900">{selectedDomain.name}</h2>
//                     <p className="text-gray-600">Select the technologies you're proficient in</p>
//                   </div>
//                 </div>

//                 {/* Selected Count */}
//                 {selectedSkills.length > 0 && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-lime-50 border border-lime-200 rounded-lg"
//                   >
//                     <CheckCircle2 className="w-5 h-5 text-lime-600" />
//                     <span className="text-sm font-semibold text-gray-700">
//                       {selectedSkills.length} {selectedSkills.length === 1 ? 'skill' : 'skills'} selected
//                     </span>
//                   </motion.div>
//                 )}
//               </div>

//               {/* Skills Grid by Category */}
//               <div className="space-y-6">
//                 {Object.entries(groupSkillsByCategory(selectedDomain.skills)).map(([category, skills]) => (
//                   <motion.div
//                     key={category}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
//                   >
//                     <h3 className="text-lg font-bold text-gray-900 mb-4 capitalize">
//                       {category.replace(/-/g, ' ')}
//                     </h3>
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                       {skills.map((skill) => {
//                         const isSelected = selectedSkills.includes(skill.id);
//                         return (
//                           <motion.button
//                             key={skill.id}
//                             onClick={() => handleSkillToggle(skill.id)}
//                             whileHover={{ scale: 1.03 }}
//                             whileTap={{ scale: 0.97 }}
//                             className={`relative px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
//                               isSelected
//                                 ? 'bg-gradient-to-br from-emerald-400 to-lime-500 text-white shadow-lg shadow-lime-200'
//                                 : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-gray-200 hover:border-lime-300'
//                             }`}
//                           >
//                             <span className="flex items-center justify-center gap-2">
//                               {isSelected && <CheckCircle2 className="w-4 h-4" />}
//                               {skill.name}
//                             </span>
//                           </motion.button>
//                         );
//                       })}
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Start Interview Button - Fixed at Bottom Right */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="fixed bottom-8 right-8 z-40"
//               >
//                 <motion.button
//                   onClick={handleStartInterview}
//                   disabled={selectedSkills.length === 0}
//                   whileHover={{ scale: selectedSkills.length > 0 ? 1.05 : 1 }}
//                   whileTap={{ scale: selectedSkills.length > 0 ? 0.95 : 1 }}
//                   className={`group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 ${
//                     selectedSkills.length > 0
//                       ? 'bg-gradient-to-r from-emerald-500 to-lime-500 text-white hover:shadow-lime-300 hover:from-emerald-600 hover:to-lime-600'
//                       : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                   }`}
//                 >
//                   <span>Start Interview</span>
//                   <ArrowRight className={`w-6 h-6 ${selectedSkills.length > 0 ? 'group-hover:translate-x-1' : ''} transition-transform`} />
//                 </motion.button>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default StudentHomePage;




import { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { 
  Code, 
  Server, 
  Cloud, 
  Brain, 
  Database, 
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  Smartphone,
  Shield,
  Gamepad2,
  LineChart,
  Palette,
  Network,
  Bot,
  Blocks
} from "lucide-react";


const levels = ["Beginner", "Intermediate", "Expert"];

export default function StudentHomePage() {
  const navigate = useNavigate();
  const { studentId } = useParams();

  const [selectedDomain, setSelectedDomain] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillLevels, setSkillLevels] = useState({});
  const [loading, setLoading] = useState(false);
 const api = axios.create({
    baseURL: "http://localhost:8080/students",
    withCredentials: true,
  });

   /* ✅ AUTH CHECK + LOGOUT HANDLERS */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/check-auth");
        if (!res.data.success) {
          navigate("/StudentSignin");
        }
      } catch {
        navigate("/StudentSignin");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      localStorage.removeItem("studentId");
      navigate("/StudentSignin");
    } catch {
      alert("Logout failed");
    }
  };


  const domains = [
    {
      id: "frontend",
      name: "Frontend",
      icon: Code,
      color: "from-emerald-400 to-lime-500",
      skills: [
        { id: "react", name: "React.js", category: "framework" },
        { id: "angular", name: "Angular", category: "framework" },
        { id: "vue", name: "Vue.js", category: "framework" },
        { id: "nextjs", name: "Next.js", category: "framework" },
        { id: "svelte", name: "Svelte", category: "framework" },
        { id: "javascript", name: "JavaScript", category: "language" },
        { id: "typescript", name: "TypeScript", category: "language" },
        { id: "html", name: "HTML5", category: "language" },
        { id: "css", name: "CSS3", category: "language" },
        { id: "tailwind", name: "Tailwind CSS", category: "styling" },
        { id: "sass", name: "SASS/SCSS", category: "styling" },
        { id: "bootstrap", name: "Bootstrap", category: "styling" },
        { id: "material-ui", name: "Material-UI", category: "styling" },
        { id: "redux", name: "Redux", category: "state-management" },
        { id: "mobx", name: "MobX", category: "state-management" },
        { id: "zustand", name: "Zustand", category: "state-management" },
        { id: "webpack", name: "Webpack", category: "tools" },
        { id: "vite", name: "Vite", category: "tools" },
        { id: "jest", name: "Jest", category: "testing" },
        { id: "cypress", name: "Cypress", category: "testing" }
      ]
    },
    {
      id: "backend",
      name: "Backend",
      icon: Server,
      color: "from-lime-400 to-green-500",
      skills: [
        { id: "nodejs", name: "Node.js", category: "runtime" },
        { id: "express", name: "Express.js", category: "framework" },
        { id: "nestjs", name: "NestJS", category: "framework" },
        { id: "fastify", name: "Fastify", category: "framework" },
        { id: "python", name: "Python", category: "language" },
        { id: "django", name: "Django", category: "framework" },
        { id: "flask", name: "Flask", category: "framework" },
        { id: "fastapi", name: "FastAPI", category: "framework" },
        { id: "java", name: "Java", category: "language" },
        { id: "springboot", name: "Spring Boot", category: "framework" },
        { id: "go", name: "Go", category: "language" },
        { id: "gin", name: "Gin", category: "framework" },
        { id: "ruby", name: "Ruby on Rails", category: "framework" },
        { id: "php", name: "PHP", category: "language" },
        { id: "laravel", name: "Laravel", category: "framework" },
        { id: "csharp", name: "C#", category: "language" },
        { id: "dotnet", name: ".NET Core", category: "framework" },
        { id: "graphql", name: "GraphQL", category: "api" },
        { id: "rest", name: "REST API", category: "api" },
        { id: "grpc", name: "gRPC", category: "api" }
      ]
    },
    {
      id: "mobile",
      name: "Mobile Development",
      icon: Smartphone,
      color: "from-pink-400 to-rose-500",
      skills: [
        { id: "react-native", name: "React Native", category: "framework" },
        { id: "flutter", name: "Flutter", category: "framework" },
        { id: "swift", name: "Swift", category: "language" },
        { id: "swiftui", name: "SwiftUI", category: "framework" },
        { id: "kotlin", name: "Kotlin", category: "language" },
        { id: "java-android", name: "Java (Android)", category: "language" },
        { id: "jetpack-compose", name: "Jetpack Compose", category: "framework" },
        { id: "dart", name: "Dart", category: "language" },
        { id: "ionic", name: "Ionic", category: "framework" },
        { id: "xamarin", name: "Xamarin", category: "framework" },
        { id: "cordova", name: "Apache Cordova", category: "framework" },
        { id: "firebase", name: "Firebase", category: "backend-service" },
        { id: "realm", name: "Realm", category: "database" },
        { id: "sqlite", name: "SQLite", category: "database" },
        { id: "push-notifications", name: "Push Notifications", category: "feature" },
        { id: "in-app-purchase", name: "In-App Purchases", category: "feature" }
      ]
    },
    {
      id: "devops",
      name: "DevOps",
      icon: Cloud,
      color: "from-green-400 to-teal-500",
      skills: [
        { id: "docker", name: "Docker", category: "containerization" },
        { id: "kubernetes", name: "Kubernetes", category: "orchestration" },
        { id: "helm", name: "Helm", category: "orchestration" },
        { id: "jenkins", name: "Jenkins", category: "ci-cd" },
        { id: "gitlab", name: "GitLab CI", category: "ci-cd" },
        { id: "github-actions", name: "GitHub Actions", category: "ci-cd" },
        { id: "circleci", name: "CircleCI", category: "ci-cd" },
        { id: "travis", name: "Travis CI", category: "ci-cd" },
        { id: "aws", name: "AWS", category: "cloud" },
        { id: "azure", name: "Azure", category: "cloud" },
        { id: "gcp", name: "Google Cloud", category: "cloud" },
        { id: "terraform", name: "Terraform", category: "iac" },
        { id: "ansible", name: "Ansible", category: "iac" },
        { id: "cloudformation", name: "CloudFormation", category: "iac" },
        { id: "prometheus", name: "Prometheus", category: "monitoring" },
        { id: "grafana", name: "Grafana", category: "monitoring" },
        { id: "elk", name: "ELK Stack", category: "logging" },
        { id: "nginx", name: "Nginx", category: "web-server" },
        { id: "linux", name: "Linux", category: "os" },
        { id: "bash", name: "Bash Scripting", category: "scripting" }
      ]
    },
    {
      id: "ml",
      name: "Machine Learning",
      icon: Brain,
      color: "from-teal-400 to-cyan-500",
      skills: [
        { id: "python-ml", name: "Python", category: "language" },
        { id: "r", name: "R", category: "language" },
        { id: "tensorflow", name: "TensorFlow", category: "framework" },
        { id: "pytorch", name: "PyTorch", category: "framework" },
        { id: "keras", name: "Keras", category: "framework" },
        { id: "scikit", name: "Scikit-learn", category: "library" },
        { id: "pandas", name: "Pandas", category: "library" },
        { id: "numpy", name: "NumPy", category: "library" },
        { id: "matplotlib", name: "Matplotlib", category: "visualization" },
        { id: "seaborn", name: "Seaborn", category: "visualization" },
        { id: "opencv", name: "OpenCV", category: "computer-vision" },
        { id: "yolo", name: "YOLO", category: "computer-vision" },
        { id: "nlp", name: "NLP/NLTK", category: "nlp" },
        { id: "spacy", name: "spaCy", category: "nlp" },
        { id: "huggingface", name: "Hugging Face", category: "nlp" },
        { id: "transformers", name: "Transformers", category: "nlp" },
        { id: "jupyter", name: "Jupyter", category: "tools" },
        { id: "mlflow", name: "MLflow", category: "mlops" },
        { id: "kubeflow", name: "Kubeflow", category: "mlops" },
        { id: "spark-ml", name: "Apache Spark MLlib", category: "big-data" }
      ]
    },
    {
      id: "data-engineering",
      name: "Data Engineering",
      icon: Database,
      color: "from-cyan-400 to-blue-500",
      skills: [
        { id: "sql", name: "SQL", category: "language" },
        { id: "python-de", name: "Python", category: "language" },
        { id: "scala", name: "Scala", category: "language" },
        { id: "postgresql", name: "PostgreSQL", category: "database" },
        { id: "mysql", name: "MySQL", category: "database" },
        { id: "mongodb", name: "MongoDB", category: "database" },
        { id: "cassandra", name: "Cassandra", category: "database" },
        { id: "dynamodb", name: "DynamoDB", category: "database" },
        { id: "redis", name: "Redis", category: "cache" },
        { id: "memcached", name: "Memcached", category: "cache" },
        { id: "elasticsearch", name: "Elasticsearch", category: "search" },
        { id: "kafka", name: "Apache Kafka", category: "streaming" },
        { id: "flink", name: "Apache Flink", category: "streaming" },
        { id: "airflow", name: "Apache Airflow", category: "orchestration" },
        { id: "luigi", name: "Luigi", category: "orchestration" },
        { id: "spark-de", name: "Apache Spark", category: "processing" },
        { id: "hadoop", name: "Hadoop", category: "big-data" },
        { id: "hive", name: "Apache Hive", category: "big-data" },
        { id: "snowflake", name: "Snowflake", category: "warehouse" },
        { id: "redshift", name: "Redshift", category: "warehouse" },
        { id: "bigquery", name: "BigQuery", category: "warehouse" },
        { id: "databricks", name: "Databricks", category: "platform" }
      ]
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      icon: Shield,
      color: "from-red-400 to-orange-500",
      skills: [
        { id: "penetration-testing", name: "Penetration Testing", category: "offensive" },
        { id: "ethical-hacking", name: "Ethical Hacking", category: "offensive" },
        { id: "metasploit", name: "Metasploit", category: "tools" },
        { id: "burp-suite", name: "Burp Suite", category: "tools" },
        { id: "wireshark", name: "Wireshark", category: "tools" },
        { id: "nmap", name: "Nmap", category: "tools" },
        { id: "kali-linux", name: "Kali Linux", category: "os" },
        { id: "owasp", name: "OWASP Top 10", category: "knowledge" },
        { id: "cryptography", name: "Cryptography", category: "knowledge" },
        { id: "network-security", name: "Network Security", category: "defensive" },
        { id: "firewall", name: "Firewall Configuration", category: "defensive" },
        { id: "ids-ips", name: "IDS/IPS", category: "defensive" },
        { id: "siem", name: "SIEM", category: "monitoring" },
        { id: "splunk", name: "Splunk", category: "monitoring" },
        { id: "incident-response", name: "Incident Response", category: "defensive" },
        { id: "forensics", name: "Digital Forensics", category: "investigation" },
        { id: "malware-analysis", name: "Malware Analysis", category: "investigation" },
        { id: "security-compliance", name: "Security Compliance", category: "governance" }
      ]
    },
    {
      id: "game-dev",
      name: "Game Development",
      icon: Gamepad2,
      color: "from-purple-400 to-pink-500",
      skills: [
        { id: "unity", name: "Unity", category: "engine" },
        { id: "unreal", name: "Unreal Engine", category: "engine" },
        { id: "godot", name: "Godot", category: "engine" },
        { id: "csharp-game", name: "C#", category: "language" },
        { id: "cpp", name: "C++", category: "language" },
        { id: "gdscript", name: "GDScript", category: "language" },
        { id: "blueprints", name: "Blueprints", category: "visual-scripting" },
        { id: "3d-modeling", name: "3D Modeling", category: "art" },
        { id: "blender", name: "Blender", category: "tools" },
        { id: "maya", name: "Maya", category: "tools" },
        { id: "substance", name: "Substance Painter", category: "tools" },
        { id: "photoshop", name: "Photoshop", category: "tools" },
        { id: "game-physics", name: "Game Physics", category: "programming" },
        { id: "ai-programming", name: "AI Programming", category: "programming" },
        { id: "multiplayer", name: "Multiplayer Networking", category: "programming" },
        { id: "shader", name: "Shader Programming", category: "graphics" },
        { id: "opengl", name: "OpenGL", category: "graphics" },
        { id: "directx", name: "DirectX", category: "graphics" }
      ]
    },
    {
      id: "data-science",
      name: "Data Science",
      icon: LineChart,
      color: "from-blue-400 to-indigo-500",
      skills: [
        { id: "python-ds", name: "Python", category: "language" },
        { id: "r-ds", name: "R", category: "language" },
        { id: "statistics", name: "Statistics", category: "mathematics" },
        { id: "probability", name: "Probability", category: "mathematics" },
        { id: "linear-algebra", name: "Linear Algebra", category: "mathematics" },
        { id: "pandas-ds", name: "Pandas", category: "library" },
        { id: "numpy-ds", name: "NumPy", category: "library" },
        { id: "scipy", name: "SciPy", category: "library" },
        { id: "matplotlib-ds", name: "Matplotlib", category: "visualization" },
        { id: "seaborn-ds", name: "Seaborn", category: "visualization" },
        { id: "plotly", name: "Plotly", category: "visualization" },
        { id: "tableau", name: "Tableau", category: "bi-tools" },
        { id: "power-bi", name: "Power BI", category: "bi-tools" },
        { id: "excel", name: "Advanced Excel", category: "tools" },
        { id: "hypothesis-testing", name: "Hypothesis Testing", category: "analysis" },
        { id: "regression", name: "Regression Analysis", category: "analysis" },
        { id: "time-series", name: "Time Series Analysis", category: "analysis" },
        { id: "ab-testing", name: "A/B Testing", category: "experimentation" }
      ]
    },
    {
      id: "uiux",
      name: "UI/UX Design",
      icon: Palette,
      color: "from-indigo-400 to-purple-500",
      skills: [
        { id: "figma", name: "Figma", category: "tools" },
        { id: "sketch", name: "Sketch", category: "tools" },
        { id: "adobe-xd", name: "Adobe XD", category: "tools" },
        { id: "photoshop-ui", name: "Photoshop", category: "tools" },
        { id: "illustrator", name: "Illustrator", category: "tools" },
        { id: "invision", name: "InVision", category: "prototyping" },
        { id: "framer", name: "Framer", category: "prototyping" },
        { id: "protopie", name: "ProtoPie", category: "prototyping" },
        { id: "user-research", name: "User Research", category: "research" },
        { id: "usability-testing", name: "Usability Testing", category: "research" },
        { id: "wireframing", name: "Wireframing", category: "design" },
        { id: "prototyping", name: "Prototyping", category: "design" },
        { id: "visual-design", name: "Visual Design", category: "design" },
        { id: "interaction-design", name: "Interaction Design", category: "design" },
        { id: "design-systems", name: "Design Systems", category: "design" },
        { id: "accessibility", name: "Accessibility", category: "standards" },
        { id: "responsive-design", name: "Responsive Design", category: "standards" },
        { id: "design-thinking", name: "Design Thinking", category: "methodology" }
      ]
    },
    {
      id: "blockchain",
      name: "Blockchain",
      icon: Blocks,
      color: "from-violet-400 to-purple-500",
      skills: [
        { id: "solidity", name: "Solidity", category: "language" },
        { id: "rust-blockchain", name: "Rust", category: "language" },
        { id: "ethereum", name: "Ethereum", category: "platform" },
        { id: "hyperledger", name: "Hyperledger", category: "platform" },
        { id: "polkadot", name: "Polkadot", category: "platform" },
        { id: "smart-contracts", name: "Smart Contracts", category: "development" },
        { id: "web3js", name: "Web3.js", category: "library" },
        { id: "ethersjs", name: "Ethers.js", category: "library" },
        { id: "hardhat", name: "Hardhat", category: "tools" },
        { id: "truffle", name: "Truffle", category: "tools" },
        { id: "metamask", name: "MetaMask", category: "wallet" },
        { id: "ipfs", name: "IPFS", category: "storage" },
        { id: "defi", name: "DeFi Protocols", category: "domain" },
        { id: "nft", name: "NFT Development", category: "domain" },
        { id: "dao", name: "DAO Architecture", category: "domain" },
        { id: "consensus", name: "Consensus Mechanisms", category: "knowledge" },
        { id: "cryptography-bc", name: "Cryptography", category: "knowledge" }
      ]
    },
    {
      id: "ai-automation",
      name: "AI & Automation",
      icon: Bot,
      color: "from-amber-400 to-orange-500",
      skills: [
        { id: "chatgpt", name: "ChatGPT API", category: "llm" },
        { id: "openai", name: "OpenAI API", category: "llm" },
        { id: "claude", name: "Claude API", category: "llm" },
        { id: "langchain", name: "LangChain", category: "framework" },
        { id: "llamaindex", name: "LlamaIndex", category: "framework" },
        { id: "prompt-engineering", name: "Prompt Engineering", category: "skill" },
        { id: "rpa", name: "RPA", category: "automation" },
        { id: "uipath", name: "UiPath", category: "tools" },
        { id: "automation-anywhere", name: "Automation Anywhere", category: "tools" },
        { id: "selenium", name: "Selenium", category: "testing" },
        { id: "puppeteer", name: "Puppeteer", category: "automation" },
        { id: "playwright", name: "Playwright", category: "automation" },
        { id: "vector-db", name: "Vector Databases", category: "database" },
        { id: "pinecone", name: "Pinecone", category: "database" },
        { id: "rag", name: "RAG Architecture", category: "architecture" },
        { id: "fine-tuning", name: "Model Fine-tuning", category: "training" },
        { id: "agent-frameworks", name: "Agent Frameworks", category: "framework" }
      ]
    },
    {
      id: "networking",
      name: "Networking",
      icon: Network,
      color: "from-sky-400 to-blue-500",
      skills: [
        { id: "tcp-ip", name: "TCP/IP", category: "protocols" },
        { id: "http-https", name: "HTTP/HTTPS", category: "protocols" },
        { id: "dns", name: "DNS", category: "protocols" },
        { id: "dhcp", name: "DHCP", category: "protocols" },
        { id: "routing", name: "Routing", category: "core" },
        { id: "switching", name: "Switching", category: "core" },
        { id: "vlan", name: "VLAN", category: "core" },
        { id: "vpn", name: "VPN", category: "security" },
        { id: "cisco", name: "Cisco", category: "vendor" },
        { id: "juniper", name: "Juniper", category: "vendor" },
        { id: "load-balancing", name: "Load Balancing", category: "infrastructure" },
        { id: "cdn", name: "CDN", category: "infrastructure" },
        { id: "network-monitoring", name: "Network Monitoring", category: "management" },
        { id: "packet-analysis", name: "Packet Analysis", category: "troubleshooting" },
        { id: "bgp", name: "BGP", category: "advanced" },
        { id: "ospf", name: "OSPF", category: "advanced" },
        { id: "mpls", name: "MPLS", category: "advanced" }
      ]
    }
  ];

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    setSelectedSkills([]);
    setSkillLevels({});
  };

  const handleBack = () => {
    setSelectedDomain(null);
  };

  const toggleSkill = (skillId) => {

    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  const setSkillLevel = (skillId, level) => {
    setSkillLevels((prev) => ({ ...prev, [skillId]: level }));
  };

  const handleStartInterview = async () => {
    if (selectedSkills.length === 0) {
      alert("Please select at least one skill.");
      return;
    }
    setLoading(true);
    try {
      const formattedSkills = selectedSkills.map((s) => ({
        skill: s,
        level: skillLevels[s] || "Beginner",
      }));
    console.log("Formatted Skills:", formattedSkills);
    console.log("Student ID:", studentId);
      await axios.patch("http://localhost:8080/students/update-skills", {
        studentId,
        skills: formattedSkills,
      });
    
      alert("Skills saved successfully!");
      navigate(`/StudentInterviewPage/${studentId}`);
    } catch (err) {
      alert("Error saving skills");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 flex flex-col">
      {/* <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-md sticky top-0 z-50 flex items-center justify-between p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-lime-500 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">AI Interview Platform</h1>
            <p className="text-xs text-gray-600">Select your expertise</p>
          </div>
        </div>
        {selectedDomain && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 hover:text-gray-900"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
      </motion.header> */}
      {/* === HEADER (added logout button but UI same) === */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-md sticky top-0 z-50 flex items-center justify-between p-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-lime-500 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">AI Interview Platform</h1>
            <p className="text-xs text-gray-600">Select your expertise</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {selectedDomain && (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-700 hover:text-gray-900"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          )}
          {/* ✅ Logout Button */}
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm font-semibold text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </motion.header>


      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <AnimatePresence mode="wait">
          {!selectedDomain ? (
            <motion.div
              key="domains"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {domains.map((domain) => (
                <motion.button
                  key={domain.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleDomainSelect(domain)}
                  className="w-full bg-white rounded-xl shadow p-5 flex items-center justify-between border border-gray-100 hover:shadow-lg active:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-lime-500 flex items-center justify-center">
                      <domain.icon className="wsystemprompt-6 h-6 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 text-left">{domain.name}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-500" />
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="skills"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  {selectedDomain.name}
                </h2>
                <p className="text-sm text-gray-600">
                  Select the technologies you know best:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedDomain.skills.map((skill) => {
                  const selected = selectedSkills.includes(skill.id);
                  return (
                    <motion.div
                      key={skill.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                        selected
                          ? "border-emerald-400 bg-emerald-50"
                          : "border-gray-200 bg-gray-50 hover:border-emerald-300"
                      }`}
                      onClick={() => toggleSkill(skill.id)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800 text-sm">
                          {skill.name}
                        </span>
                        {selected && (
                          <CheckCircle2 className="text-emerald-500 w-5 h-5" />
                        )}
                      </div>

                      {selected && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 flex gap-2 flex-wrap"
                        >
                          {levels.map((lvl) => (
                            <button
                              key={lvl}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSkillLevel(skill.id, lvl);
                              }}
                              className={`px-3 py-1 text-xs rounded-full font-medium border transition-all duration-200 ${
                                skillLevels[skill.id] === lvl
                                  ? "bg-gradient-to-r from-emerald-400 to-lime-500 text-white border-transparent"
                                  : "border-gray-300 text-gray-700 hover:border-emerald-400"
                              }`}
                            >
                              {lvl}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {selectedDomain && (
        <div className="sticky bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200">
          <motion.button
            whileHover={{ scale: selectedSkills.length > 0 ? 1.05 : 1 }}
            whileTap={{ scale: selectedSkills.length > 0 ? 0.95 : 1 }}
            disabled={selectedSkills.length === 0 || loading}
            onClick={handleStartInterview}
            className={`w-full py-4 rounded-2xl text-lg font-bold shadow-md transition-all duration-300 ${
              selectedSkills.length > 0
                ? "bg-gradient-to-r from-emerald-500 to-lime-500 text-white hover:from-emerald-600 hover:to-lime-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {loading ? "Saving..." : "Start Interview"}
          </motion.button>
        </div>
      )}
    </div>
  );
}

