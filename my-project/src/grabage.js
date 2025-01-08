<div className="p-6 bg-gray-100">
      <h2 className="text-lg font-semibold mb-4">Preview Interview Questions</h2>
      <p className="text-sm text-gray-500 mb-6">
        Edit the AI-generated questions or enter your own here.
      </p>
      <div className="space-y-4 bg-white p-4 rounded shadow">
        {questions.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 items-center border border-gray-300 rounded p-4"
          >
            {/* Position */}
            <div className="col-span-1 text-center">{item.position}</div>
            {/* Category Dropdown */}
            <select
              value={item.category}
              onChange={(e) =>
                setQuestions((prev) =>
                  prev.map((q) =>
                    q.id === item.id ? { ...q, category: e.target.value } : q
                  )
                )
              }
              className="col-span-2 border border-gray-300 rounded px-2 py-1"
            >
              <option value="Culture">Culture</option>
              <option value="Technical">Technical</option>
              <option value="Leadership">Leadership</option>
              <option value="SoftSkills">SoftSkills</option>
              <option value="XFactor">XFactor</option>
            </select>
            {/* Question Input */}
            <input
              type="text"
              value={item.question}
              onChange={(e) =>
                setQuestions((prev) =>
                  prev.map((q) =>
                    q.id === item.id ? { ...q, question: e.target.value } : q
                  )
                )
              }
              className="col-span-8 border border-gray-300 rounded px-4 py-2 w-full"
            />
            {/* Delete Button */}
            <button
              onClick={() =>
                setQuestions((prev) => prev.filter((q) => q.id !== item.id))
              }
              className="col-span-1 text-red-500 hover:text-red-700"
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    </div>