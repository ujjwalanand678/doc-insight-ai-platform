const ATSChecker = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">ATS Resume Checker</h2>
      <p className="text-slate-500 mb-6">
        Upload your resume and paste a job description to get an ATS score.
      </p>
      {/* TODO: Resume upload + JD textarea -> POST /api/ats/check */}
    </div>
  );
};

export default ATSChecker;