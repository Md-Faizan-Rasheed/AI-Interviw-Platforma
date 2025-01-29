const InterviewPage = ({ match }) => {
    const [jobDescription, setJobDescription] = useState('');
  
    useEffect(() => {
      const fetchJobDescription = async () => {
        const response = await fetch(`/get-job-description/${match.params.id}`);
        const data = await response.json();
        setJobDescription(data.jobDescription);
      };
  
      fetchJobDescription();
    }, [match.params.id]);
  
    return (
      <div>
        <h1>Job Description</h1>
        <p>{jobDescription}</p>
        <button onClick={startInterview}>Start Interview</button>
      </div>
    );
  };
  