export default function Modal() {
  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-solid border-gray-400 border rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none">
          <form>
            {/* headers */}
            <div className="flex items-start justify-between p-5 rounded-t">
              <h1 className="text-3xl text-white font-bold">Create a Post</h1>
              <button className="p-1 ml-auto bg-transparent border-0 text-white float-right text-3xl leading-none font-semibold outline-none">
                <span className="bg-transparent h-6 w-6 text-2xl block outline-none">
                  x
                </span>
              </button>
            </div>
            {/* body */}
            <div className="relative p-6 pt-0 flex-auto">
              <p className="my-4 text-white text-lg leading-relaxed">
                This is a test. This is a test. This is a test. This is a test.
                This is a test. This is a test. This is a test. This is a test.
              </p>
            </div>
            <div className="flex flex-row-reverse border-t border-solid border-gray-400 py-4">
              <button className="bg-blue-500 py-1 px-4 text-lg text-white rounded-md mr-4">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
