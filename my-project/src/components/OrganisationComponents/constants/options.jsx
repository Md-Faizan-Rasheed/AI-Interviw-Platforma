
// export const AI_PROMPT = `
// {acutal_data}

// the above data come from hr of a company I want you to create questions on 
// 1.culture , 
// 2.soft skills , 
// 3.technical questions ,
// 4.x factor question
// by seeing the job profile given give two to three question from above point each  and give the response in proper json formate
// `;


export const AI_PROMPT = `
You are given the following data related to a job profile from the HR department:

{actual_data}

Your task is to carefully analyze the given job profile and generate a set of interview questions that align with it. 
The questions should be divided into the following categories:
1. Culture-related questions
2. Soft skills questions
3. Technical questions
4. X-factor (unique/personal insight) questions

Instructions:
- Create 2 to 3 well-thought-out questions for each category based on the given job profile and its requirements.
- Ensure the questions are specific, relevant, and tailored to the role described in the input data.
- Keep the tone professional and conversational, suitable for an interview context.
- Format the output as a clean, valid JSON object with the following structure:

{
  "Culture": [],
  "Technical":[],
  "Leadership":[],
  "SoftSkills":[],
  "XFactor": []
}
`;


export const AI_PROMPTSEC = `

{role}
for company
{comapany_name}

Act as an HR of company you want ot hire for above role make a dummy job description accurately
key subheading :-
Responsibilities:
Qualifications:
Benefits:
Requirements:

give response in json formate
`


export const generationConfig = {
  temperature: 1,
  top_p: 0.95,
  max_tokens: 8192,
};

