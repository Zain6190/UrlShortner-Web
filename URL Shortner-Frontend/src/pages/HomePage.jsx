import Url_form from "../component/Url_form";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
          URL Shortener
        </h1>
       <Url_form />

      </div>
    </div>
  );
};

export default HomePage;
