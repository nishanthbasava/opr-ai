import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [orgName, setOrgName] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5001/api/posts/generate", {
        prompt,
        orgName,
      });
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-4xl font-bold">oPR.AI</h1>
        <p className="mt-2 text-gray-600">
          Turn event prompts into Canva-ready Instagram post concepts.
        </p>

        <div className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow">
          <input
            type="text"
            placeholder="Organization name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
          />

          <textarea
            placeholder='Example: make a post marketing our study social next Wednesday from 6-8 PM in FGH 300'
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="min-h-40 w-full rounded-xl border px-4 py-3"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="rounded-xl bg-black px-5 py-3 text-white"
          >
            {loading ? "Generating..." : "Generate Post"}
          </button>
        </div>

        {result && (
          <div className="mt-8 rounded-2xl bg-white p-6 shadow">
            <h2 className="text-2xl font-semibold">{result.headline}</h2>
            <p className="mt-2 text-gray-700">{result.subheadline}</p>
            <p className="mt-4 font-medium">{result.cta}</p>

            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-500">Caption</p>
              <p className="mt-1">{result.caption}</p>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-500">Style</p>
              <p className="mt-1">{result.designStyle}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {result.hashtags.map((tag) => (
                <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;