import searchIcon from "./assets/circum_search.png";
import dots from "./assets/3dots.png";
import { folders, files } from "./types";

const FileManager = () => {
  return (
    <section className="screenSection w-full">
      {/* header */}
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-xl">
          Files <span>(50)</span>
        </h1>

        <button className="bg-[#095256] text-xs text-white px-3 py-1.5 rounded-md hover:scale-110 transition ease-in-out duration-150">
          + New File
        </button>
      </div>

      {/* filter group */}
      <div className="flex flex-row justify-between items-center mt-5">
        <div className="flex flex-row items-center justify-between w-full">
          <select>
            <option value="shared">shared files</option>
            <option value="updated">updated files</option>
            <option value="added">added files</option>
          </select>

          <div className="tableSearchGrp bg-white w-[224px]">
            <img src={searchIcon} alt="search icon" className="h-5" />
            <input
              type="text"
              placeholder="Search for a file"
              className="outline-0 text-xs placeholder:text-xs"
            />
          </div>
        </div>
      </div>

      {/* folder group */}
      <div className="mt-5">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-base">Folders</h1>

          <p className="text-[#095256] underline text-xs">See all</p>
        </div>

        <div className="grid grid-cols-6 gap-3">
          {folders.map((element, index) => (
            <div
              className="bg-white rounded p-2 flex flex-col justify-between"
              key={index}
            >
              <div className="flex flex-row justify-between items-center">
                <input type="checkbox" />
                <img src={dots} alt="dots" />
              </div>

              <div>
                <img
                  src={element.thumbnail}
                  alt="icon thumbnail"
                  className="mx-auto"
                />
                <p className="text-xs text-center my-2">{element.name}</p>
              </div>

              <div className="flex flex-row justify-between items-center">
                <p className="text-[8px]">{element.size}</p>
                <p className="text-[8px]">{element.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* file group */}
      <div className="mt-14">
        <div className="flex flex-row items-center justify-between mb-4">
          <h1 className="text-base">Recent Files</h1>

          <p className="text-[#095256] underline text-xs">See all</p>
        </div>

        <div className="grid grid-cols-6 gap-3">
          {files.map((element, index) => (
            <div
              className="bg-white rounded p-2 
              flex flex-col justify-between"
              key={index}
            >
              <div className="flex flex-row justify-between items-center">
                <input type="checkbox" />
                <img src={dots} alt="dots" />
              </div>

              <div>
                <img
                  src={element.thumbnail}
                  alt="icon thumbnail"
                  className="mx-auto"
                />
                <p className="text-xs text-center my-2">{element.name}</p>
              </div>

              <div className="flex flex-row justify-between items-center">
                <p className="text-[8px]">{element.size}</p>
                <p className="text-[8px]">{element.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FileManager;
