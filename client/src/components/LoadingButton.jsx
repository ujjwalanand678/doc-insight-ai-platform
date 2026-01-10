const LoadingButton = ({ loading, children, loadingText, ...props }) => {
  return (
    <button
      disabled={loading}
      className="relative flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50"
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {loading ? loadingText : children}
    </button>
  );
};

export default LoadingButton;
