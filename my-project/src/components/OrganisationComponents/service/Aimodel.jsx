import { chatSession, chatSessionSecond } from "./ai";

export async function generateInterviewQuestions(jobData) {
  const prompt = `
${JSON.stringify(jobData, null, 2)}

the above data come from hr of a company
I want you to create questions on culture, soft skills, technical questions, x factor question
by seeing the job profile given
give two to three question from each
and give the response in proper json format
`;

  const response = await chatSession(prompt);
  return JSON.parse(response);
}

export async function generateJobDescription() {
  const prompt = `
Frontend Intern

Act as an HR of company you want to hire for above role
make a job description accurately

key subheading :-
Responsibilities:
Qualifications:
Benefits:
Requirements:

give response in json format
`;

  const response = await chatSessionSecond(prompt);
  return JSON.parse(response);
}
