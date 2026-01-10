import { useState } from 'react';
import api from '../lib/api';
import LoadingButton from './LoadingButton';
import toast from 'react-hot-toast';


const FileUpload = ({ onUploadSuccess }) => {
const [file, setFile] = useState(null);
const [loading, setLoading] = useState(false);


const handleSubmit = async (e) => {
e.preventDefault();
if (!file) return alert('Select a file');
setLoading(true);


try {
const formData = new FormData();
formData.append('file', file);
const res = await api.post('/api/documents/upload', formData);
onUploadSuccess(res.data);
toast.success('Document analyzed successfully');
} catch {
toast.error('Upload failed');
} finally {
setLoading(false);
}
};


return (
<form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-xl border">
<input type="file" accept=".pdf,.txt" onChange={(e) => setFile(e.target.files[0])} />
<div className="mt-4">
<LoadingButton loading={loading} loadingText="Analyzing document...">
Analyze Document
</LoadingButton>
</div>
</form>
);
};


export default FileUpload;